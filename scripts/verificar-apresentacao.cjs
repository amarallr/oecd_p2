// SPDX-License-Identifier: Apache-2.0
// Cenários de navegador da apresentação; reutiliza a conexão CDP do roteiro existente.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
module.exports = async function verify(cdp, target) {
  const output = path.resolve(__dirname, '..', 'tmp', 'apresentacao-qa');
  fs.mkdirSync(output, {recursive:true});
  const checks = [];
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  async function evaluate(expression) {
    const result = await cdp.call('Runtime.evaluate', {expression, returnByValue:true, awaitPromise:true});
    if (result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  }
  const click = selector => evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
  async function key(key) { await cdp.call('Input.dispatchKeyEvent', {type:'keyDown', key}); await cdp.call('Input.dispatchKeyEvent', {type:'keyUp', key}); }
  async function viewport(width,height) { await cdp.call('Emulation.setDeviceMetricsOverride', {width,height,deviceScaleFactor:1,mobile:false}); await pause(100); }
  async function screenshot(name) { const image=await cdp.call('Page.captureScreenshot', {format:'png',captureBeyondViewport:false}); fs.writeFileSync(path.join(output,name),Buffer.from(image.data,'base64')); }
  await viewport(1440,1000);
  await cdp.call('Page.navigate', {url:target});
  for(let i=0;i<60;i++){if(await evaluate(`document.body?.dataset.ready === 'true'`))break;await pause(100);}
  assert.equal(await evaluate(`document.body.dataset.ready`),'true');
  const slideCount = 11;
  assert.equal(await evaluate(`document.querySelectorAll('.slide').length`),slideCount);
  assert.equal(await evaluate(`document.querySelectorAll('.slide')[1].id`),'mapa-projeto');
  assert.equal(await evaluate(`document.querySelector('#calc-result').textContent`),'4,00');
  assert.deepEqual(await evaluate(`[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)`),[]);
  await screenshot('capa-desktop.png');checks.push('Onze temas, mapa na segunda posição, exemplo inicial, recursos e âncoras');
  await click('#present');
  assert.equal(await evaluate(`document.querySelectorAll('.slide:not([hidden])').length`),1);
  assert.equal(await evaluate(`document.querySelector('#prev').disabled`),true);
  await key('ArrowRight');assert.equal(await evaluate(`location.hash`),'#mapa-projeto');
  assert.equal(await evaluate(`document.querySelector('#position').textContent`),'02 / 11');
  await screenshot('mapa-projeto-desktop.png');
  await key('ArrowRight');assert.equal(await evaluate(`location.hash`),'#desafio');
  await key('End');assert.equal(await evaluate(`location.hash`),'#referencias');assert.equal(await evaluate(`document.querySelector('#next').disabled`),true);
  await key('Home');assert.equal(await evaluate(`location.hash`),'#visao');
  await click('a[href="#mapa-projeto"]');assert.equal(await evaluate(`location.hash`),'#mapa-projeto');
  checks.push('Modo slides, setas, Home/End, links internos e limites');
  await evaluate(`document.querySelector('#chapter').value=String([...document.querySelectorAll('.slide')].findIndex(s=>s.id==='arquitetura'));document.querySelector('#chapter').dispatchEvent(new Event('change'))`);
  for(const layer of ['motor','regras','gir','risco','paineis','dados']){
    await click(`[data-layer="${layer}"]`);
    assert.equal(await evaluate(`document.querySelectorAll('[data-layer][aria-pressed="true"]').length`),1);
    assert.ok(await evaluate(`document.querySelector('#layer-copy').textContent.length > 80`));
  }
  await screenshot('arquitetura-desktop.png');checks.push('Seleção dos seis módulos');
  await evaluate(`document.querySelector('#chapter').value=String([...document.querySelectorAll('.slide')].findIndex(s=>s.id==='calculo'));document.querySelector('#chapter').dispatchEvent(new Event('change'))`);
  for(const [income,taxes,exclusion,result] of [['100','10','0','5,00'],['100','15','20','0,00'],['100','10','120','0,00'],['1,25','0,10','0,25','0,07'],['0','10','20','—'],['100','-1','20','—'],['','10','20','—']]){
    await evaluate(`(()=>{for(const [key,value] of Object.entries(${JSON.stringify({income,taxes,exclusion})}))document.querySelector('#calc-form').elements[key].value=value;document.querySelector('#calc-form').dispatchEvent(new Event('input'));})()`);
    assert.equal(await evaluate(`document.querySelector('#calc-result').textContent`),result);
    if(result==='—')assert.ok(await evaluate(`document.querySelectorAll('#calc-form input[aria-invalid="true"]').length`));
  }
  await click('.reset');assert.equal(await evaluate(`document.querySelector('#calc-result').textContent`),'4,00');
  await evaluate(`document.querySelector('#calc-income').focus()`);await key('ArrowRight');assert.equal(await evaluate(`location.hash`),'#calculo');
  checks.push('Cálculos independentes, valores inválidos, reset e teclado nos campos');
  await screenshot('calculo-desktop.png');
  for(const [width,height] of [[360,800],[768,1024],[1440,900]]) {
    await viewport(width,height);
    for(let i=0;i<slideCount;i++){
      await evaluate(`document.querySelector('#chapter').value='${i}';document.querySelector('#chapter').dispatchEvent(new Event('change'))`);
      assert.ok(await evaluate(`document.documentElement.scrollWidth<=document.documentElement.clientWidth+1`),`Overflow no tema ${i+1}, largura ${width}`);
    }
    if(width===360){await evaluate(`document.querySelector('#chapter').value='1';document.querySelector('#chapter').dispatchEvent(new Event('change'))`);await screenshot('mapa-projeto-mobile.png');await evaluate(`document.querySelector('#chapter').value='0';document.querySelector('#chapter').dispatchEvent(new Event('change'))`);await screenshot('capa-mobile.png');}
  }
  checks.push('Onze temas sem overflow horizontal em 360, 768 e 1440 px');
  await key('Escape');assert.equal(await evaluate(`document.querySelectorAll('.slide:not([hidden])').length`),slideCount);
  await viewport(1440,1000);
  await cdp.call('Emulation.setEmulatedMedia', {features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  assert.equal(await evaluate(`getComputedStyle(document.documentElement).scrollBehavior`),'auto');
  await click('#present');await cdp.call('Emulation.setEmulatedMedia', {media:'print'});
  assert.equal(await evaluate(`[...document.querySelectorAll('.slide')].filter(s=>getComputedStyle(s).display!=='none').length`),slideCount);
  const pdf=await cdp.call('Page.printToPDF',{printBackground:true,landscape:true,preferCSSPageSize:true});
  const pdfBytes=Buffer.from(pdf.data,'base64');
  fs.writeFileSync(path.join(output,'apresentacao.pdf'),pdfBytes);
  assert.equal((pdfBytes.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length,slideCount,'PDF deve conter uma página por slide');
  await cdp.call('Emulation.setEmulatedMedia', {media:'screen'});
  checks.push('Escape, movimento reduzido e impressão de todos os temas em PDF');
  await cdp.call('Emulation.setScriptExecutionDisabled', {value:true});
  await cdp.call('Page.navigate', {url:target});await pause(400);
  assert.equal(await evaluate(`[...document.querySelectorAll('.slide')].filter(s=>s.getBoundingClientRect().width>0).length`),slideCount);
  assert.equal(await evaluate(`document.querySelector('#calc-fields').disabled`),true);
  assert.equal(await evaluate(`document.querySelector('#calc-result').textContent`),'4,00');
  await cdp.call('Emulation.setScriptExecutionDisabled', {value:false});
  checks.push('Conteúdo e exemplo manual acessíveis sem JavaScript');
  await viewport(1440,1000);
  const galleryTarget = new URL('figuras-pilar-dois.html', target).href;
  await cdp.call('Page.navigate', {url:galleryTarget});await pause(250);
  assert.equal(await evaluate(`document.querySelectorAll('.figure-grid figure').length`),9);
  await evaluate(`document.querySelector('#language').value='pt-BR';document.querySelector('#language').dispatchEvent(new Event('change'))`);
  assert.equal(await evaluate(`document.documentElement.lang`),'pt-BR');
  assert.notEqual(await evaluate(`getComputedStyle(document.querySelector('.figure-grid .pt')).display`),'none');
  await evaluate(`document.querySelector('#language').value='en-US';document.querySelector('#language').dispatchEvent(new Event('change'))`);
  assert.equal(await evaluate(`document.documentElement.lang`),'en-US');
  assert.notEqual(await evaluate(`getComputedStyle(document.querySelector('.figure-grid .en')).display`),'none');
  await viewport(360,800);
  assert.ok(await evaluate(`document.documentElement.scrollWidth<=document.documentElement.clientWidth+1`),'Galeria deve caber em celular');
  checks.push('Nove figuras, seletor PT-BR/English (US) e responsividade da galeria');
  assert.deepEqual(cdp.errors,[]);assert.deepEqual(cdp.badResponses,[]);
  const report={status:'passed',target,checks,console_errors:cdp.errors,http_errors:cdp.badResponses,artifacts:'tmp/apresentacao-qa',limitations:['Sem revisão humana por leitor de tela','Sem validação normativa']};
  fs.writeFileSync(path.join(output,'relatorio.json'),JSON.stringify(report,null,2)+'\n');
  return report;
};
