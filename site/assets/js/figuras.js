// SPDX-License-Identifier: Apache-2.0
'use strict';
const language = document.querySelector('#language');
const page = document.querySelector('.handbook-page');
function setLanguage(value) {
  const english = value === 'en-US';
  page.dataset.language = value;
  document.documentElement.lang = english ? 'en-US' : 'pt-BR';
  document.title = english ? 'Pillar Two Figures | Open Pillar Two Framework' : 'Figuras do Pilar 2 | Open Pillar Two Framework';
  localStorage.setItem('handbook-language', value);
}
language.addEventListener('change', () => setLanguage(language.value));
const savedLanguage = localStorage.getItem('handbook-language');
if (savedLanguage === 'en-US') language.value = savedLanguage;
setLanguage(language.value);
