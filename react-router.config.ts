import type { Config } from '@react-router/dev/config';
import { members } from './app/content/members';

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
