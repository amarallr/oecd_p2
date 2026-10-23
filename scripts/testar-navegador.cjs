// SPDX-License-Identifier: Apache-2.0
// Usa Chromium já iniciado em perfil de QA isolado; não instala nem inicia subprocessos.
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const target = process.env.P2_TEST_URL || 'http://127.0.0.1:8000/oecd_p2/';
const port = Number(process.env.P2_CDP_PORT || 9224);
const output = path.resolve(__dirname, '..', 'docs/evidencias');
fs.mkdirSync(output, {recursive:true});
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
class Connection {
  constructor(socket) {
    this.socket=socket; this.buffer=Buffer.alloc(0); this.sequence=0; this.pending=new Map(); this.fragments=[]; this.errors=[]; this.badResponses=[];
    socket.on('data', chunk => this.receive(chunk));
  }
  receive(chunk) {
    this.buffer=Buffer.concat([this.buffer,chunk]);
    while(this.buffer.length >= 2) {
      const buffer=this.buffer, opcode=buffer[0]&15;
      let length=buffer[1]&127, offset=2;
      if(length===126){if(buffer.length<4)return;length=buffer.readUInt16BE(2);offset=4;}
      if(length===127){if(buffer.length<10)return;length=Number(buffer.readBigUInt64BE(2));offset=10;}
      if(buffer.length<offset+length)return;
      const message=buffer.subarray(offset,offset+length);this.buffer=buffer.subarray(offset+length);
      if(opcode===9){this.frame(message,10);continue;}
      if(opcode!==1&&opcode!==0)continue;
      this.fragments.push(message);
      if(!(buffer[0]&128))continue;
      const data=JSON.parse(Buffer.concat(this.fragments).toString('utf8'));this.fragments=[];
      if(data.id){const request=this.pending.get(data.id);if(request){clearTimeout(request.timer);this.pending.delete(data.id);data.error?request.reject(Error(JSON.stringify(data.error))):request.resolve(data.result);}}
      else if(data.method==='Runtime.exceptionThrown')this.errors.push(data.params.exceptionDetails.text);
      else if(data.method==='Network.responseReceived'&&data.params.response.status>=400)this.badResponses.push({url:data.params.response.url,status:data.params.response.status});
      else if(data.method==='Runtime.consoleAPICalled'&&data.params.type==='error')this.errors.push(data.params.args.map(a=>a.value||a.description).join(' '));
    }
  }
  frame(message, opcode=1) {
    const body=Buffer.from(message),mask=crypto.randomBytes(4);let header;
    if(body.length<126){header=Buffer.alloc(2);header[1]=128|body.length;}
    else if(body.length<65536){header=Buffer.alloc(4);header[1]=254;header.writeUInt16BE(body.length,2);}
    else {header=Buffer.alloc(10);header[1]=255;header.writeBigUInt64BE(BigInt(body.length),2);}
    header[0]=128|opcode;const encoded=Buffer.from(body);for(let i=0;i<encoded.length;i++)encoded[i]^=mask[i%4];this.socket.write(Buffer.concat([header,mask,encoded]));
  }
  call(method,params={}) {
    return new Promise((resolve,reject)=>{const id=++this.sequence;const timer=setTimeout(()=>{this.pending.delete(id);reject(Error(`CDP timeout ${method}`));},15000);this.pending.set(id,{resolve,reject,timer});this.frame(JSON.stringify({id,method,params}));});
  }
  static open(url) {
    return new Promise((resolve,reject)=>{const req=http.request(url.replace(/^ws:/,'http:'),{headers:{Connection:'Upgrade',Upgrade:'websocket','Sec-WebSocket-Version':'13','Sec-WebSocket-Key':crypto.randomBytes(16).toString('base64')}});req.once('upgrade',(_,socket,head)=>{const c=new Connection(socket);if(head.length)c.receive(head);resolve(c);});req.once('error',reject);req.end();});
  }
}
let cdp;
const checks=[];
const check=(name,details={})=>checks.push({name,status:'passed',...details});
async function evaluate(expression){const response=await cdp.call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(response.exceptionDetails)throw Error(response.exceptionDetails.exception?.description||response.exceptionDetails.text);return response.result.value;}
async function until(expression){for(let i=0;i<60;i++){if(await evaluate(expression))return;await pause(100);}throw Error('Condição não satisfeita: '+expression);}
async function click(selector){await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);}
async function viewport(width,height){await cdp.call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});await pause(80);}
async function screenshot(file){const shot=await cdp.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(output,file),Buffer.from(shot.data,'base64'));}
async function key(key,code=key){await cdp.call('Input.dispatchKeyEvent',{type:'keyDown',key,code});await cdp.call('Input.dispatchKeyEvent',{type:'keyUp',key,code});}
async function load(){await cdp.call('Page.navigate',{url:target});await until(`document.body?.dataset.ready === 'true'`);await pause(100);}
(async()=>{
 try {
  const tabs=await(await fetch(`http://127.0.0.1:${port}/json`)).json();const tab=tabs.find(t=>t.type==='page');assert.ok(tab,'Chrome de QA indisponível');
  cdp=await Connection.open(tab.webSocketDebuggerUrl);
  await cdp.call('Page.enable');await cdp.call('Runtime.enable');await cdp.call('Network.enable');await cdp.call('Network.setCacheDisabled',{cacheDisabled:true});
  await viewport(1440,1000);await load();
  assert.equal(await evaluate(`document.querySelector('#tax-result').textContent`),'4,00');
  assert.equal(await evaluate(`document.querySelector('#etr-result').textContent`),'10,00%');check('W04 resultado 4 e intermediários');
  await screenshot('desktop.png');
  for(const id of ['dados','regras','nucleo','pacotes','memoria','testes','interfaces']){await click(`[data-module="${id}"]`);assert.equal(await evaluate(`document.querySelectorAll('[data-module-panel]:not([hidden])').length`),1);assert.equal(await evaluate(`document.querySelector('[data-module-panel="${id}"]').hidden`),false);}
  check('W02 sete módulos e conteúdo por seleção');
  await evaluate(`document.querySelector('[data-module="nucleo"]').focus()`);await key('Enter');assert.equal(await evaluate(`document.querySelector('[data-module="nucleo"]').getAttribute('aria-pressed')`),'true');check('W02 módulo ativado por Enter real no navegador');
  for(let i=0;i<7;i++){await click(`[data-step="${i}"]`);assert.equal(await evaluate(`document.querySelector('#step-progress').textContent`),`Etapa ${i+1} de 7`);assert.equal(await evaluate(`document.querySelectorAll('[data-step-panel]:not([hidden])').length`),1);}
  assert.equal(await evaluate(`document.querySelector('#next-step').disabled`),true);await click('#previous-step');assert.equal(await evaluate(`document.querySelector('#step-progress').textContent`),'Etapa 6 de 7');await click('[data-step="0"]');assert.equal(await evaluate(`document.querySelector('#previous-step').disabled`),true);check('W03 seleção, voltar, avançar e limites');
  const scenarios=[['100','10','0','5,00'],['100','15','20','0,00'],['100','20','20','0,00'],['100','10','120','0,00'],['100','0','20','12,00'],['1,25','0,10','0,25','0,07'],['0','10','20','—'],['-1','10','20','—'],['100','-1','20','—'],['100','10','-1','—'],['','10','20','—'],['100','texto','20','—'],['Infinity','10','20','—'],['100','10','1.000,00','—']];
  for(const [income,taxes,exclusion,expected]of scenarios){await evaluate(`(()=>{const values=${JSON.stringify({income,taxes,exclusion})};for(const [key,value]of Object.entries(values))document.getElementById(key).value=value;document.getElementById('income').dispatchEvent(new Event('input',{bubbles:true}));})()`);assert.equal(await evaluate(`document.querySelector('#tax-result').textContent`),expected);if(expected==='—'){assert.ok(await evaluate(`document.querySelectorAll('input[aria-invalid="true"]').length>0`));assert.equal(await evaluate(`document.querySelector('#comparison').hidden`),true);}}
  await click('#reset-example');await pause(300);assert.equal(await evaluate(`document.querySelector('#tax-result').textContent`),'4,00');assert.equal(await evaluate(`document.querySelectorAll('input[aria-invalid="true"]').length`),0);assert.ok(await evaluate(`document.querySelector('#demo-announcement').textContent.includes('restaurado')`));check('W04/W05 entradas válidas, inválidas, reset, erro associado e anúncio');
  assert.ok(await evaluate(`['income','taxes','exclusion'].every(id=>{const input=document.getElementById(id);return document.querySelector('label[for="'+id+'"]')&&input.getAttribute('aria-describedby').includes(id+'-error');})()`));
  for(const [width,height]of [[360,800],[768,1024],[1440,1000]]){
   await viewport(width,height);await pause(100);
   const overflow=await evaluate(`document.documentElement.scrollWidth-document.documentElement.clientWidth`);assert.ok(overflow<=1,`Overflow ${width}: ${overflow}`);
   await evaluate(`document.getElementById('exemplo').scrollIntoView()`);await pause(100);assert.ok(await evaluate(`document.querySelector('#demo-results').getBoundingClientRect().right<=innerWidth+1`));
   check('W06 layout sem rolagem horizontal',{width,height});
   if(width===360){await evaluate('scrollTo(0,0)');await screenshot('mobile.png');await click('.menu-toggle');assert.equal(await evaluate(`document.getElementById('menu').hidden`),false);await key('Escape');assert.equal(await evaluate(`document.getElementById('menu').hidden`),true);assert.equal(await evaluate(`document.activeElement.className`),'menu-toggle');check('W01 menu mobile e Escape com retorno de foco');}
  }
  await viewport(1440,1000);await evaluate(`document.getElementById('exemplo').scrollIntoView()`);await pause(100);await screenshot('demonstracao.png');
  await cdp.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});assert.equal(await evaluate(`getComputedStyle(document.documentElement).scrollBehavior`),'auto');check('W12 movimento reduzido');
  await evaluate(`document.documentElement.style.zoom='2'`);await viewport(768,1024);assert.ok(await evaluate(`document.documentElement.scrollWidth<=document.documentElement.clientWidth+1`));check('W06 zoom 200% sem overflow');await evaluate(`document.documentElement.style.zoom=''`);await viewport(1440,1000);
  await evaluate('scrollTo(0,0);document.activeElement.blur()');await key('Tab');assert.ok(await evaluate(`document.activeElement.matches('a,button,input,summary')`));assert.ok(await evaluate(`parseFloat(getComputedStyle(document.activeElement).outlineWidth)>=3`));
  for(let i=0;i<16;i++){await key('Tab');assert.ok(await evaluate(`document.activeElement.getBoundingClientRect().width>0`));}check('W07 Tab real, foco visível e elementos acessíveis');
  const contrast=await evaluate(`(()=>{const rgb=s=>(s.match(/[\\d.]+/g)||[]).slice(0,3).map(Number);const lum=c=>c.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);const failures=[];for(const e of document.querySelectorAll('p,a,button,label,dt,dd,summary,span,output,h1,h2,h3,li,input,small,strong')){if(!e.getBoundingClientRect().width||!e.textContent.trim()||e.closest('[hidden]')||e.matches(':disabled'))continue;const style=getComputedStyle(e);let b=e,bg;while(b){bg=getComputedStyle(b).backgroundColor;if(bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent')break;b=b.parentElement;}const l1=lum(rgb(style.color)),l2=lum(rgb(bg||'rgb(250,249,244)'));const ratio=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);const large=parseFloat(style.fontSize)>=24||(parseFloat(style.fontSize)>=18.66&&Number(style.fontWeight)>=700);if(ratio<(large?3:4.5)-.05)failures.push({text:e.textContent.trim().slice(0,45),ratio,color:style.color,bg});}return failures;})()`);
  assert.deepEqual(contrast,[],'Contraste de texto insuficiente: '+JSON.stringify(contrast));check('W07 contraste automático dos textos visíveis');
  const anchors=await evaluate(`[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)`);assert.deepEqual(anchors,[]);check('W09 âncoras e recursos locais no subdiretório');
  assert.deepEqual(cdp.errors,[]);assert.deepEqual(cdp.badResponses,[]);check('W10 sem exceções JavaScript, erros de console ou HTTP');
  await cdp.call('Emulation.setScriptExecutionDisabled',{value:true});await cdp.call('Page.navigate',{url:target});await pause(700);
  assert.equal(await evaluate(`document.querySelector('#tax-result').textContent`),'4,00');assert.equal(await evaluate(`[...document.querySelectorAll('[data-module-panel]')].filter(e=>e.getBoundingClientRect().width>0).length`),7);assert.equal(await evaluate(`[...document.querySelectorAll('[data-step-panel]')].filter(e=>e.getBoundingClientRect().width>0).length`),7);assert.equal(await evaluate(`document.querySelector('#demo-fields').disabled`),true);check('W08 conteúdo essencial e exemplo manual sem JavaScript');
  await cdp.call('Emulation.setScriptExecutionDisabled',{value:false});await load();assert.ok(await evaluate(`document.getElementById('trace-output').textContent.includes('antes de alocação')&&document.getElementById('memoria').textContent.includes('ordinary_synthetic_v1')&&document.querySelector('.demo-warning').textContent.includes('QDMTT')`));check('W11 memória, perfil, hipóteses e limitações disponíveis');
  const report={date:'2026-10-23',target,browser:await cdp.call('Browser.getVersion'),checks,console_errors:cdp.errors,http_errors:cdp.badResponses,screen_reader_human_review:false,normative_validation:false};
  fs.writeFileSync(path.join(output,'navegador.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({checks:checks.length,status:'passed',screenshots:['desktop.png','mobile.png','demonstracao.png'],limitations:['Sem revisão humana por leitor de tela','Sem validação normativa']},null,2));
 }catch(error){fs.writeFileSync(path.join(output,'navegador-falha.json'),JSON.stringify({error:error.message,checks},null,2)+'\n');console.error(error);process.exitCode=1;}
 finally{if(cdp)cdp.socket.destroy();}
})();
