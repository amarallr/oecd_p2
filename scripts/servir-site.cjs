// SPDX-License-Identifier: Apache-2.0
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..', 'site');
const port = Number(process.argv[2] || 8000);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Porta inválida: use 1024 a 65535.');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  let url;
  try { url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400); res.end(); return; }
  url = url.replace(/^\/oecd_p2(?=\/|$)/, '');
  if (!url || url === '/') url = '/index.html';
  const file = path.resolve(root, '.' + url);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile() || url.split('/').some(p => p.startsWith('.'))) { res.writeHead(404); res.end('Arquivo não encontrado'); return; }
  res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  if (req.method === 'HEAD') res.end(); else fs.createReadStream(file).pipe(res);
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`oecd_p2: http://127.0.0.1:${port}/oecd_p2/ — Ctrl+C para encerrar`));
process.on('SIGINT', () => server.close());
