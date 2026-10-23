// SPDX-License-Identifier: Apache-2.0
import {calculateIllustration, example} from './demo.js';

const slides = [...document.querySelectorAll('.slide')];
const chapter = document.getElementById('chapter');
const present = document.getElementById('present');
const controls = document.querySelector('.deck-controls');
const previous = document.getElementById('prev');
const next = document.getElementById('next');
let index = Math.max(0, slides.findIndex(slide => `#${slide.id}` === location.hash));
let presenting = false;

slides.forEach((slide, i) => chapter.add(new Option(`${String(i + 1).padStart(2, '0')} · ${slide.dataset.title}`, String(i))));
document.querySelector('.toolbar').hidden = false;

function update() {
  slides.forEach((slide, i) => { slide.hidden = presenting && i !== index; });
  chapter.value = String(index);
  previous.disabled = index === 0;
  next.disabled = index === slides.length - 1;
  document.getElementById('position').textContent = `${String(index + 1).padStart(2, '0')} / ${slides.length}`;
  document.getElementById('progress-fill').style.width = `${(index + 1) / slides.length * 100}%`;
}

function go(to, {focus = true, writeHash = true} = {}) {
  index = Math.max(0, Math.min(slides.length - 1, to));
  update();
  if (writeHash) history.replaceState(null, '', `#${slides[index].id}`);
  if (presenting) window.scrollTo({top: 0, behavior: 'instant'});
  else slides[index].scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  if (focus) {
    const title = slides[index].querySelector('h1,h2');
    title.tabIndex = -1;
    title.focus({preventScroll: true});
  }
}

function togglePresentation(enabled) {
  presenting = enabled;
  document.body.classList.toggle('presenting', enabled);
  present.setAttribute('aria-pressed', String(enabled));
  present.innerHTML = enabled ? 'Sair dos slides <span aria-hidden="true">↙</span>' : 'Apresentar <span aria-hidden="true">↗</span>';
  controls.hidden = !enabled;
  go(index);
}

present.addEventListener('click', () => togglePresentation(!presenting));
chapter.addEventListener('change', () => go(Number(chapter.value)));
previous.addEventListener('click', () => go(index - 1));
next.addEventListener('click', () => go(index + 1));
window.addEventListener('hashchange', () => {
  const target = slides.findIndex(slide => `#${slide.id}` === location.hash);
  if (target >= 0) go(target, {writeHash: false});
});
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const target = slides.findIndex(slide => `#${slide.id}` === link.getAttribute('href'));
  if (target >= 0) { event.preventDefault(); go(target); }
}));
document.addEventListener('keydown', event => {
  if (!presenting) return;
  if (event.key === 'Escape') { togglePresentation(false); present.focus(); return; }
  if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input,select,textarea,button,a,summary,[contenteditable]')) return;
  const targets = {ArrowRight:index + 1, PageDown:index + 1, ' ':event.shiftKey ? index - 1 : index + 1, ArrowLeft:index - 1, PageUp:index - 1, Home:0, End:slides.length - 1};
  if (event.key in targets) { event.preventDefault(); go(targets[event.key]); }
});

const observer = new IntersectionObserver(entries => {
  if (presenting) return;
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) { index = slides.indexOf(visible.target); update(); }
}, {rootMargin:'-84px 0px 0px 0px', threshold:[0.2,0.5,0.7]});
slides.forEach(slide => observer.observe(slide));
document.getElementById('print').addEventListener('click', () => window.print());
const fullscreen = document.getElementById('fullscreen');
if (!document.documentElement.requestFullscreen) fullscreen.hidden = true;
fullscreen.addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch { document.getElementById('position').textContent = 'Tela cheia indisponível'; }
});
document.addEventListener('fullscreenchange', () => { fullscreen.textContent = document.fullscreenElement ? 'Sair da tela cheia' : 'Tela cheia'; });

const layers = {
  dados:['Normalização e conciliação','Adaptadores traduzirão exportações de ERPs, SPED e CbC para contratos comuns, preservando a finalidade de cada fonte. Os dados canônicos manterão vínculos com contas, documentos, entidades e períodos.','Dados empresariais e fiscais autorizados.','Dados validados, conciliados e com proveniência.'],
  motor:['Motor GloBE','O núcleo planejado aplicará regras determinísticas aos dados preparados. A evolução começa por biblioteca e CLI local com perfil sintético, antes de suporte normativo e coordenação internacional.','Dados canônicos, contexto, regras e eleições versionadas.','Resultados, fórmulas intermediárias e limites de suporte.'],
  regras:['Regras versionadas','Fontes, interpretações e pacotes nacionais terão escopo temporal e revisão explícitos. A publicação internacional de uma regra não equivale à sua adoção doméstica.','Fontes primárias e interpretações revisadas.','Regras aplicáveis por perfil, período e jurisdição.'],
  gir:['GIR e memória de cálculo','A GloBE Information Return terá adaptador próprio para conteúdo e schema aplicáveis. A memória permitirá rastrear cada resultado. Validar XML não comprova aceitação da declaração ou correção do tributo.','Resultados, dados do grupo e evidências.','Memória exportável e arquivos declaratórios validados.'],
  risco:['Inteligência fiscal','Cruzamentos, grafos e leitura assistida de documentos apoiarão a investigação de inconsistências. Dados e resultados alimentarão indicadores revisáveis. IA não decide obrigação ou valor do imposto.','Dados conciliados, memória e documentos financeiros.','Indicadores de risco com evidências para revisão humana.'],
  paineis:['Painéis e revisão humana','A interface operacional futura reunirá mapas societários, ETR por jurisdição, inconsistências e vínculos documentais. A página explicativa atual demonstra conceitos e não executa essa fiscalização.','Resultados, indicadores e trilhas documentais.','Visões para seleção, investigação e revisão fundamentada.']
};
document.querySelectorAll('[data-layer]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-layer]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const [title, copy, input, output] = layers[button.dataset.layer];
  for (const [id, text] of Object.entries({'layer-title':title, 'layer-copy':copy, 'layer-in':input, 'layer-out':output})) document.getElementById(id).textContent = text;
}));

const form = document.getElementById('calc-form');
const amounts = new Intl.NumberFormat('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
const percents = new Intl.NumberFormat('pt-BR', {style:'percent', minimumFractionDigits:2, maximumFractionDigits:2});
let announcement;
function calculate(restored = false) {
  const values = Object.fromEntries(['income','taxes','exclusion'].map(key => [key, form.elements[key].value]));
  const result = calculateIllustration(values);
  for (const key of ['income','taxes','exclusion']) {
    form.elements[key].setAttribute('aria-invalid', String(Boolean(result.errors?.[key])));
    document.getElementById(`error-${key}`).textContent = result.errors?.[key] || '';
  }
  document.getElementById('calc-result').textContent = result.valid ? amounts.format(result.result) : '—';
  document.getElementById('calc-etr').textContent = result.valid ? percents.format(result.etr) : '—';
  document.getElementById('calc-rate').textContent = result.valid ? percents.format(result.rate) : '—';
  document.getElementById('calc-excess').textContent = result.valid ? amounts.format(result.excess) : '—';
  document.getElementById('calc-formula').textContent = result.valid ? `${percents.format(result.rate)} × ${amounts.format(result.excess)} = ${amounts.format(result.result)} XUM` : 'Revise os campos indicados. Cenário fora dos limites não produz resultado.';
  clearTimeout(announcement);
  announcement = setTimeout(() => { document.getElementById('calc-announcement').textContent = result.valid ? `${restored ? 'Exemplo restaurado. ' : ''}Complemento ilustrativo: ${amounts.format(result.result)} XUM.` : 'Revise os campos com erro. Resultado indisponível.'; }, 250);
}
form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('input', () => calculate());
form.addEventListener('reset', event => {
  event.preventDefault();
  for (const [key, value] of Object.entries(example)) form.elements[key].value = value;
  calculate(true);
});
document.getElementById('calc-fields').disabled = false;
calculate();
update();
document.body.dataset.ready = 'true';
