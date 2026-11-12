import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { contentSchemas, parseEntry } from '../app/content/schema.ts';

interface Checked {
  slug: string;
  school?: unknown;
  education?: unknown;
  photo?: { src: string };
  image?: { src: string };
  cover?: { src: string };
}

let failed = false;
const slugs: Record<string, Set<string>> = {};

for (const [name, schema] of Object.entries(contentSchemas)) {
  const dir = `app/content/${name}`;
  const seen = new Set<string>();
  slugs[name] = seen;
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
    if (seen.has(entry.slug)) fail(`영문 ID "${entry.slug}"가 다른 항목과 겹칩니다`);
    seen.add(entry.slug);
    if (typeof entry.school === 'string' && !slugs.schools?.has(entry.school))
      fail(`등록되지 않은 학교입니다: ${entry.school}`);
    if (typeof entry.education === 'string' && !slugs.departments?.has(entry.education))
      fail(`등록되지 않은 학과입니다: ${entry.education}`);
    const src = (entry.photo ?? entry.image ?? entry.cover)?.src;
    if (src && !existsSync(`public${src}`)) fail(`이미지 파일이 없습니다: public${src}`);
  }
}

if (failed) process.exit(1);
console.log('Content OK');
