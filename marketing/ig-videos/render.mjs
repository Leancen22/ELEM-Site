// Renderiza elem-animacion.html cuadro por cuadro (Chrome headless + ffmpeg).
//   node render.mjs                   → elem-animacion-vertical.mp4 y elem-animacion-horizontal.mp4, con sonido
//   node render.mjs --stills 0.6,1.2  → PNG de esos segundos en el directorio temporal, para revisar
import { spawn, spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const i = process.argv.indexOf('--stills'), STILLS = i > 0 ? process.argv[i + 1].split(',').map(Number) : null;
const FPS = 30, tmp = process.env.TMP_OUT ?? mkdtempSync(join(tmpdir(), 'elem-anim-')), sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Sonido sintetizado: tres notas, una por barra, y un soplido en la entrada y en la salida. Como el sello de los videos de producto. */
const audio = (dur, c, file) => {
  const SR = 48000, N = Math.ceil(dur * SR), L = new Float32Array(N), R = new Float32Array(N), T = Math.PI * 2, f = (m) => 440 * 2 ** ((m - 69) / 12);
  const voz = (t0, len, pan, fn) => { const a = Math.floor(t0 * SR), gl = Math.cos((pan + 1) * Math.PI / 4), gr = Math.sin((pan + 1) * Math.PI / 4);
    for (let n = 0; n < len * SR && a + n < N; n++) { const v = fn(n / SR); L[a + n] += v * gl; R[a + n] += v * gr; } };
  [75, 80, 84].forEach((m, k) => { const t = c.sello + 0.08 + k * 0.13, pan = (k - 1) * 0.35, h = f(m), g = f(m + 12);
    voz(t, 2.2, pan, (x) => (Math.sin(T * h * x + 1.1 * Math.exp(-x / 0.25) * Math.sin(T * h * x)) + 0.1 * Math.exp(-x / 0.05) * Math.sin(T * h * 14 * x)) * Math.exp(-x / 0.55) * Math.min(1, x / 0.003) * 0.16);
    voz(t, 1.5, -pan, (x) => Math.sin(T * g * x + 0.9 * Math.exp(-x / 0.08) * Math.sin(T * g * 2 * x)) * Math.exp(-x / 0.5) * Math.min(1, x / 0.002) * 0.06); });
  let seed = 7; const noise = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2147483648 - 1; };
  [[c.entrada, 0.75], [c.barrido, 1]].forEach(([t0, vol]) => [-0.6, 0.6].forEach((pan, k) => { let a = 0, b = 0; const len = 0.85;
    voz(t0 + k * 0.03, len, pan, (x) => { const e = x / len, gq = Math.tan(Math.PI * (500 + 3800 * e * e) / SR), Q = 1 / 0.8, a1 = 1 / (1 + gq * (gq + Q)), a2 = gq * a1, a3 = gq * a2, v3 = noise() - b, v1 = a1 * a + a2 * v3, v2 = b + a2 * a + a3 * v3; a = 2 * v1 - a; b = 2 * v2 - b; return v1 * Math.sin(Math.PI * e) ** 1.4 * 0.3 * vol; }); }));
  const buf = Buffer.alloc(44 + N * 4); buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
  for (let n = 0; n < N; n++) { buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[n])) * 32767), 44 + n * 4); buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[n])) * 32767), 46 + n * 4); }
  writeFileSync(file, buf);
};

const render = async (nombre, hash, W, H) => {
  const chrome = spawn('google-chrome', ['--headless=new', '--remote-debugging-port=9336', `--window-size=${W},${H}`, `--user-data-dir=${join(tmp, `chrome-${nombre}`)}`, '--no-first-run', '--hide-scrollbars', '--force-color-profile=srgb', 'about:blank'], { stdio: 'ignore' });
  let targets; for (let n = 0; n < 50; n++) { try { targets = await (await fetch('http://127.0.0.1:9336/json')).json(); if (targets.length) break; } catch {} await sleep(200); }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener('open', r));
  let id = 0; const pend = new Map(); ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) pend.get(m.id)(m), pend.delete(m.id); });
  const send = (method, params = {}) => new Promise((r) => { const n = ++id; pend.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
  const run = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.result?.value;
  await send('Page.enable'); await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `file://${resolve('elem-animacion.html')}${hash}` });
  for (let n = 0; n < 100 && !(await run('window.__ready === true')); n++) await sleep(200);
  if (!(await run('document.fonts.check(\'500 100px "Hanken Grotesk"\')'))) throw new Error('No cargó Hanken Grotesk');
  const shot = async (t, format) => { await run(`__seek(${t})`); return Buffer.from((await send('Page.captureScreenshot', { format, ...(format === 'jpeg' && { quality: 96 }) })).result.data, 'base64'); };
  if (STILLS) { for (const t of STILLS) writeFileSync(join(tmp, `${nombre}-${t}.png`), await shot(t, 'png')); console.log(tmp); }
  else {
    const dur = await run('__duration'), cues = await run('__cues'), wav = join(tmp, 'a.wav'), frames = Math.round(dur * FPS); audio(dur, cues, wav);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', wav, '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-af', 'aecho=0.8:0.7:70|140:0.22|0.12,volume=10dB,alimiter=limit=0.9', '-c:a', 'aac', '-b:a', '192k', '-shortest', `elem-animacion-${nombre}.mp4`], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let f = 0; f < frames; f++) { const b = await shot(f / FPS, 'jpeg'); if (!ff.stdin.write(b)) await new Promise((r) => ff.stdin.once('drain', r)); }
    ff.stdin.end(); await new Promise((r) => ff.on('close', r)); console.log(`elem-animacion-${nombre}.mp4 (${frames} cuadros)`);
  }
  ws.close(); chrome.kill(); await sleep(500);
};
await render('vertical', '', 1080, 1920);
await render('horizontal', '#h', 1920, 1080);
process.exit(0);
