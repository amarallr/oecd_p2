// SPDX-License-Identifier: Apache-2.0
import {calculateIllustration, example} from './demo.js';
const $ = selector => document.querySelector(selector);
const all = selector => [...document.querySelectorAll(selector)];
const number = new Intl.NumberFormat('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
const percent = new Intl.NumberFormat('pt-BR', {style:'percent', minimumFractionDigits:2, maximumFractionDigits:2});
document.documentElement.classList.add('js');
const menuButton = $('.menu-toggle');
const menu = $('#menu');
const mobile = matchMedia('(max-width: 900px)');
menuButton.hidden = false;
function menuState(open) { menu.hidden = mobile.matches && !open; menuButton.setAttribute('aria-expanded', String(open)); }
menuState(false);
menuButton.addEventListener('click', () => menuState(menuButton.getAttribute('aria-expanded') !== 'true'));
all('#menu a').forEach(a => a.addEventListener('click', () => menuState(false)));
document.addEventListener('keydown', event => { if(event.key === 'Escape' && mobile.matches && !menu.hidden) {menuState(false); menuButton.focus();} });
mobile.addEventListener('change', () => menuState(false));

$('.module-list').hidden = false;
function moduleSelect(id) {
  all('[data-module]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.module === id)));
  all('[data-module-panel]').forEach(panel => {panel.hidden = panel.dataset.modulePanel !== id;});
}
all('[data-module]').forEach(button => button.addEventListener('click', () => moduleSelect(button.dataset.module)));
moduleSelect('dados');

let step = 0;
$('#step-buttons').hidden = false;
$('.step-controls').hidden = false;
function stepSelect(index) {
  step = Math.max(0, Math.min(6, index));
  all('[data-step]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.step) === step)));
  all('[data-step-panel]').forEach(panel => {panel.hidden = Number(panel.dataset.stepPanel) !== step;});
  $('#previous-step').disabled = step === 0;
  $('#next-step').disabled = step === 6;
  $('#step-progress').textContent = `Etapa ${step + 1} de 7`;
}
all('[data-step]').forEach(button => button.addEventListener('click', () => stepSelect(Number(button.dataset.step))));
$('#previous-step').addEventListener('click', () => stepSelect(step - 1));
$('#next-step').addEventListener('click', () => stepSelect(step + 1));
stepSelect(0);

let announceTimer;
function announce(message) { clearTimeout(announceTimer); announceTimer = setTimeout(() => {$('#demo-announcement').textContent = message;}, 250); }
function render(shouldAnnounce = true) {
  const input = Object.fromEntries(Object.keys(example).map(key => [key, $(`#${key}`).value]));
  const state = calculateIllustration(input);
  Object.keys(example).forEach(key => {
    const error = state.errors?.[key] || '';
    $(`#${key}`).setAttribute('aria-invalid', String(Boolean(error)));
    $(`#${key}-error`).textContent = error;
  });
  if (!state.valid) {
    for (const id of ['tax-result', 'etr-result', 'rate-result', 'excess-result']) $(`#${id}`).textContent = '—';
    $('#result-description').textContent = 'Resultado indisponível. Corrija as entradas indicadas.';
    $('#comparison').hidden = true;
    $('#trace-inputs').textContent = 'Entradas inválidas: nenhuma base atual ou resultado calculado.';
    $('#trace-formula').textContent = 'Cálculo suspenso até corrigir os dados.';
    $('#trace-output').textContent = 'Saída indisponível; ausência de resultado não equivale a imposto zero.';
    if (shouldAnnounce) announce(Object.values(state.errors).join(' '));
    return;
  }
  $('#tax-result').textContent = number.format(state.result);
  $('#etr-result').textContent = percent.format(state.etr);
  $('#rate-result').textContent = percent.format(state.rate);
  $('#excess-result').textContent = number.format(state.excess);
  $('#result-description').textContent = state.result === 0 ? 'Zero calculado dentro desta hipótese didática.' : 'Percentual complementar × lucro excedente';
  $('#comparison').hidden = false;
  $('#without-exclusion').textContent = `${number.format(state.withoutExclusion)} XUM`;
  $('#trace-inputs').textContent = `Entradas atuais: renda ${number.format(state.income)}; tributos ${number.format(state.taxes)}; exclusão ${number.format(state.exclusion)} XUM. Bases recebidas diretamente.`;
  $('#trace-formula').textContent = `ETR = ${number.format(state.taxes)} ÷ ${number.format(state.income)} = ${percent.format(state.etr)}; percentual = ${percent.format(state.rate)}; excedente = ${number.format(state.excess)}. Resultado: ${percent.format(state.rate)} × ${number.format(state.excess)} = ${number.format(state.result)} XUM. Percentuais exibidos arredondados; cálculo usa os valores anteriores à formatação.`;
  $('#trace-output').textContent = `Saída hipotética: ${number.format(state.result)} XUM, antes de alocação. Não atribuído a entidade, IIR ou UTPR.`;
  if (shouldAnnounce) announce(`Resultado hipotético: ${number.format(state.result)} XUM. ETR ${percent.format(state.etr)}, percentual ${percent.format(state.rate)}, excedente ${number.format(state.excess)}.`);
}
$('#demo-fields').disabled = false;
$('#demo-form').addEventListener('input', () => render());
$('#demo-form').addEventListener('submit', event => {event.preventDefault(); render(); const invalid = $('#demo-form [aria-invalid="true"]'); if(invalid) invalid.focus();});
$('#reset-example').addEventListener('click', () => {Object.entries(example).forEach(([key,value]) => {$(`#${key}`).value = value;}); render(false); announce('Exemplo restaurado: renda 100, tributos 10, exclusão 20. Resultado hipotético: 4,00 XUM.');});
render(false);
fetch('assets/data/project.json').then(response => {if(!response.ok) throw new Error('Metadados indisponíveis'); return response.json();}).then(project => all('[data-page-version]').forEach(node => {node.textContent = project.page_version;})).catch(() => { /* HTML conserva versão e conteúdo essencial. */ });
document.body.dataset.ready = 'true';
