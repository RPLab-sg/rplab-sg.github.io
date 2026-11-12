import type { Config } from '@react-router/dev/config';
import { readdirSync, readFileSync } from 'node:fs';
import { memberSchema, parseEntry } from './app/content/schema';
import type { Member } from './app/content/types';

const membersDir = './app/content/members';
const members: Member[] = readdirSync(membersDir)
  .filter((file) => file.endsWith('.json'))
  .flatMap((file) => {
    const result = parseEntry<Member>(
      memberSchema,
      JSON.parse(readFileSync(`${membersDir}/${file}`, 'utf8')),
    );
    return result.ok ? [result.data] : [];
  });

const bothLocales = (path: string) => [path, `/en${path}`];

export default {
  ssr: false,
  async prerender({ getStaticPaths }) {
    const profilePaths = members
      .filter((m) => m.status === 'published' && m.detail)
      .flatMap((m) => bothLocales(`/people/${m.slug}`));
    return [...getStaticPaths(), ...profilePaths];
  },
} satisfies Config;
