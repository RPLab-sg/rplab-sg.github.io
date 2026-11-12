/**
 * Checks the JSON content that Pages CMS edits (members, news, outputs) before it is built.
 * Run by `npm run check`, so a malformed entry fails CI instead of reaching the live site.
 * The schemas live in `app/content/schema.ts`, shared with the site's loader.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { contentSchemas, parseEntry } from '../app/content/schema.ts';

interface Checked {
  slug: string;
  photo?: { src: string };
  image?: { src: string };
  cover?: { src: string };
}

let failed = false;

for (const [name, schema] of Object.entries(contentSchemas)) {
  const dir = `app/content/${name}`;
  const seen = new Set<string>();
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const where = `${dir}/${file}`;
    const fail = (message: string) => {
      failed = true;
      console.error(`✗ ${where}\n  ${message.replaceAll('\n', '\n  ')}`);
    };
    let raw: unknown;
    try {
      raw = JSON.parse(readFileSync(where, 'utf8'));
    } catch (error) {
      fail(`JSON 형식 오류: ${(error as Error).message}`);
      continue;
    }
    const result = parseEntry<Checked>(schema, raw);
    if (!result.ok) {
      fail(result.message);
      continue;
    }
    const entry = result.data;
    if (seen.has(entry.slug)) fail(`주소 이름(slug) "${entry.slug}"이 다른 항목과 겹칩니다`);
    seen.add(entry.slug);
    const src = (entry.photo ?? entry.image ?? entry.cover)?.src;
    if (src && !existsSync(`public${src}`)) fail(`이미지 파일이 없습니다: public${src}`);
  }
}

if (failed) process.exit(1);
console.log('Content OK');
