// SPDX-License-Identifier: Apache-2.0
// Visualização didática com Number; não é o futuro motor tributário decimal.
export const example = Object.freeze({ income: '100', taxes: '10', exclusion: '20' });
export const minimumRate = 0.15;
export function parseAmount(value, positive = false) {
  const text = String(value).trim();
  if (!text) return { error: 'Preencha este campo; vazio não equivale a zero.' };
  if (!/^-?\d{1,9}(?:[.,]\d{1,2})?$/.test(text)) return { error: 'Use até 9 algarismos inteiros e 2 decimais, sem separador de milhar.' };
  const amount = Number(text.replace(',', '.'));
  if (!Number.isFinite(amount)) return { error: 'Informe um número finito.' };
  if (positive && amount <= 0) return { error: 'Renda nula ou negativa não é coberta por este demonstrador.' };
  if (!positive && amount < 0) return { error: 'Valores negativos não são cobertos por este demonstrador.' };
  return { value: amount };
}
export function calculateIllustration({income, taxes, exclusion}) {
  const parsed = { income: parseAmount(income, true), taxes: parseAmount(taxes), exclusion: parseAmount(exclusion) };
  const errors = Object.fromEntries(Object.entries(parsed).filter(([,v]) => v.error).map(([k,v]) => [k,v.error]));
  if (Object.keys(errors).length) return { valid: false, errors, result: null };
  const i = parsed.income.value, t = parsed.taxes.value, s = parsed.exclusion.value;
  const etr = t / i;
  const rate = Math.max(0, minimumRate - etr);
  const excess = Math.max(0, i - s);
  return { valid: true, income: i, taxes: t, exclusion: s, etr, rate, excess, result: rate * excess, withoutExclusion: rate * i };
}
