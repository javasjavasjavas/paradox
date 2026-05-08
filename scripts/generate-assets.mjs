import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { deflateSync } from "node:zlib";

const outDir = join(process.cwd(), "public", "assets", "generated");
mkdirSync(outDir, { recursive: true });

let seed = 777037;
const random = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};

const crcTable = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

const crc32 = (buffer) => {
  let c = 0xffffffff;
  for (const byte of buffer) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

const chunk = (type, data) => {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, crc]);
};

const writePng = (fileName, width, height, paint) => {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x += 1) {
      const [r, g, b, a] = paint(x, y, width, height);
      const index = row + 1 + x * 4;
      raw[index] = r;
      raw[index + 1] = g;
      raw[index + 2] = b;
      raw[index + 3] = a;
    }
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  writeFileSync(
    join(outDir, fileName),
    Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      chunk("IHDR", header),
      chunk("IDAT", deflateSync(raw)),
      chunk("IEND", Buffer.alloc(0)),
    ]),
  );
};

const writeSvg = (fileName, svg) => {
  const target = join(outDir, fileName);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, svg.trim(), "utf8");
};

writePng("noise-texture.png", 256, 256, () => {
  const v = Math.floor(14 + random() * 72);
  const blue = Math.floor(v + random() * 18);
  const alpha = Math.floor(18 + random() * 52);
  return [v, Math.floor(v * 1.15), blue, alpha];
});

writePng("grunge-texture.png", 512, 512, (x, y, w, h) => {
  const cx = x / w - 0.5;
  const cy = y / h - 0.5;
  const vignette = Math.max(0, 1 - Math.sqrt(cx * cx + cy * cy) * 1.7);
  const line = Math.abs(Math.sin((x * 0.08 + y * 0.03) + Math.sin(y * 0.02) * 8));
  const scratch = line > 0.985 ? 125 : random() > 0.992 ? 90 : 0;
  const v = Math.floor(8 + vignette * 28 + scratch);
  return [v, v + Math.floor(random() * 8), v + 20, Math.floor(30 + vignette * 90)];
});

writeSvg(
  "grid-overlay.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
    <defs>
      <pattern id="minor" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M16 0H0V16" fill="none" stroke="#1d74c6" stroke-opacity=".14" stroke-width=".6"/>
      </pattern>
      <pattern id="major" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="url(#minor)"/>
        <path d="M80 0H0V80" fill="none" stroke="#70d8ff" stroke-opacity=".18" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="320" height="320" fill="url(#major)"/>
  </svg>`,
);

writeSvg(
  "holographic-card-glow.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
    <defs>
      <radialGradient id="core" cx="50%" cy="43%" r="64%">
        <stop offset="0" stop-color="#8be7ff" stop-opacity=".5"/>
        <stop offset=".33" stop-color="#2f86ff" stop-opacity=".22"/>
        <stop offset=".7" stop-color="#0a1f3b" stop-opacity=".05"/>
        <stop offset="1" stop-color="#000" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="sheen" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".0"/>
        <stop offset=".47" stop-color="#fff" stop-opacity=".5"/>
        <stop offset=".55" stop-color="#6fd8ff" stop-opacity=".22"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="900" height="1200" fill="url(#core)"/>
    <path d="M-80 980 980-40" stroke="url(#sheen)" stroke-width="130" opacity=".5"/>
  </svg>`,
);

writeSvg(
  "particle-sprite.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
    <defs>
      <radialGradient id="p" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset=".18" stop-color="#89e8ff" stop-opacity=".95"/>
        <stop offset=".5" stop-color="#2f86ff" stop-opacity=".42"/>
        <stop offset="1" stop-color="#2f86ff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="64" cy="64" r="62" fill="url(#p)"/>
  </svg>`,
);

writeSvg(
  "rarity-icons.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="120" viewBox="0 0 420 120">
    <symbol id="diamond" viewBox="0 0 40 40">
      <path d="M20 3 37 20 20 37 3 20Z" fill="none" stroke="#49a5ff" stroke-width="2"/>
      <path d="M20 11 29 20 20 29 11 20Z" fill="#2f86ff" fill-opacity=".28"/>
    </symbol>
    <symbol id="sigil" viewBox="0 0 80 80">
      <path d="M40 4 51 29 78 17 58 40 76 64 50 52 40 78 30 52 4 64 22 40 2 17 29 29Z" fill="none" stroke="#6fd8ff" stroke-width="2"/>
      <circle cx="40" cy="40" r="12" fill="#2f86ff" fill-opacity=".2" stroke="#2f86ff"/>
    </symbol>
    <use href="#diamond" x="20" y="40"/>
    <use href="#sigil" x="95" y="20"/>
    <text x="205" y="72" fill="#b7dcff" font-family="Consolas, monospace" font-size="48" font-weight="700">RA</text>
  </svg>`,
);

writeSvg(
  "ui-ornaments.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="360" viewBox="0 0 720 360">
    <g fill="none" stroke="#2f86ff" stroke-opacity=".55">
      <path d="M36 180H244M476 180h208M360 36v104M360 220v104"/>
      <circle cx="360" cy="180" r="118" stroke-opacity=".18"/>
      <circle cx="360" cy="180" r="164" stroke-opacity=".1"/>
      <path d="M360 98 386 156 449 129 402 180 445 236 384 207 360 268 336 207 275 236 318 180 271 129 334 156Z" stroke-opacity=".36"/>
    </g>
  </svg>`,
);

writeSvg(
  "favicon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="14" fill="#030506"/>
    <path d="M32 5 40 24 58 15 45 32 56 52 38 42 32 60 26 42 8 52 19 32 6 15 24 24Z" fill="none" stroke="#6fd8ff" stroke-width="3" stroke-linejoin="round"/>
    <path d="M32 15 36 29 48 24 40 34 45 46 34 39 32 52 30 39 19 46 24 34 16 24 28 29Z" fill="#2f86ff" fill-opacity=".22"/>
  </svg>`,
);

writeSvg(
  "vertical-identity-strip.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="620" viewBox="0 0 160 620">
    <rect x="10" y="10" width="140" height="600" rx="18" fill="#050607" stroke="#6c7177" stroke-width="2"/>
    <text x="82" y="74" writing-mode="tb" glyph-orientation-vertical="0" fill="#fff" font-family="system-ui, sans-serif" font-size="38" font-weight="800" letter-spacing="10">新世界秩序のセールスマン</text>
    <path d="M10 490H150" stroke="#7c8288" stroke-width="2"/>
    <text x="86" y="584" transform="rotate(-90 86 584)" fill="#fff" font-family="Consolas, monospace" font-size="26">HUMAN</text>
  </svg>`,
);

const cardBack = (name, hue, label) => writeSvg(
  name,
  `<svg xmlns="http://www.w3.org/2000/svg" width="540" height="790" viewBox="0 0 540 790">
    <defs>
      <radialGradient id="g" cx="50%" cy="36%" r="66%">
        <stop offset="0" stop-color="hsl(${hue} 100% 64%)" stop-opacity=".5"/>
        <stop offset=".45" stop-color="hsl(${hue} 100% 42%)" stop-opacity=".16"/>
        <stop offset="1" stop-color="#020508"/>
      </radialGradient>
      <pattern id="m" width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M28 0H0V28" stroke="#fff" stroke-opacity=".08" fill="none"/>
      </pattern>
    </defs>
    <rect x="16" y="16" width="508" height="758" rx="28" fill="#030507" stroke="hsl(${hue} 100% 62%)" stroke-width="4"/>
    <rect x="34" y="34" width="472" height="722" rx="18" fill="url(#g)"/>
    <rect x="34" y="34" width="472" height="722" rx="18" fill="url(#m)"/>
    <path d="M270 156 333 302 490 236 374 364 482 510 331 439 270 600 209 439 58 510 166 364 50 236 207 302Z" fill="none" stroke="hsl(${hue} 100% 64%)" stroke-opacity=".55" stroke-width="3"/>
    <text x="72" y="104" fill="#dceeff" font-family="Consolas, monospace" font-size="34" font-weight="800">NEO ORDER</text>
    <text x="72" y="682" fill="#9fcfff" font-family="Consolas, monospace" font-size="28">${label}</text>
  </svg>`,
);

cardBack("card-back-blue.svg", 210, "RA / 037");
cardBack("card-back-violet.svg", 270, "EX / 112");
cardBack("card-back-amber.svg", 38, "MY / 604");
cardBack("card-back-red.svg", 350, "CR / 515");

writeSvg(
  "placeholder-character.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="920" viewBox="0 0 720 920">
    <defs>
      <radialGradient id="bg" cx="50%" cy="42%" r="70%">
        <stop offset="0" stop-color="#0e8cff" stop-opacity=".55"/>
        <stop offset=".45" stop-color="#063a7a" stop-opacity=".35"/>
        <stop offset="1" stop-color="#020509"/>
      </radialGradient>
      <linearGradient id="coat" x1="0" x2="1">
        <stop offset="0" stop-color="#351023"/>
        <stop offset=".55" stop-color="#6d1638"/>
        <stop offset="1" stop-color="#170914"/>
      </linearGradient>
    </defs>
    <rect width="720" height="920" fill="url(#bg)"/>
    <g opacity=".25" stroke="#8ddfff">
      <path d="M70 142h580M90 246h540M80 628h560"/>
      <path d="M360 40v820"/>
    </g>
    <g transform="translate(166 90)">
      <ellipse cx="190" cy="730" rx="180" ry="24" fill="#000" opacity=".55"/>
      <path d="M142 286h94l42 292h-76l-15-162-18 162H93Z" fill="#06080b"/>
      <path d="M118 248c-30 62-42 118-35 169h71l11-132Z" fill="url(#coat)"/>
      <path d="M236 248c36 58 51 114 45 169h-73l-16-132Z" fill="url(#coat)"/>
      <path d="M114 224c12-74 60-103 138-84 35 35 43 99 22 180H92c-5-41 3-73 22-96Z" fill="url(#coat)" stroke="#90f4ff" stroke-opacity=".35" stroke-width="3"/>
      <circle cx="183" cy="96" r="52" fill="#eadbd2"/>
      <path d="M127 89c14-56 50-82 109-54 22 19 20 44 7 72-30-22-69-23-116-18Z" fill="#061013"/>
      <rect x="128" y="92" width="112" height="24" rx="8" fill="#d41226" stroke="#111"/>
      <path d="M148 92h70" stroke="#ff8790" stroke-width="4"/>
      <path d="M148 144c25 16 48 16 70 0" fill="none" stroke="#2b0a10" stroke-width="5"/>
      <path d="M132 319 76 458M248 319l65 135" stroke="#170b12" stroke-width="34" stroke-linecap="round"/>
      <path d="M118 578 82 735h78l34-157M223 578l26 157h78l-29-157" fill="#05070a"/>
      <path d="M86 735h86v40H56c2-24 12-37 30-40ZM246 735h88c27 7 40 20 40 40H248Z" fill="#020304"/>
    </g>
  </svg>`,
);

console.log(`Generated Neo Order assets in ${outDir}`);
