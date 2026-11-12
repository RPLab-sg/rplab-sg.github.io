/**
 * Pages CMS saves untouched optional fields as `null`, `""` or objects of empty strings.
 * `prune` drops those so an empty optional field reads as absent, the same as before the CMS.
 * Strings inside a partly filled object are kept (an empty `href` still means "not linked yet").
 * Shared by the app loader, `react-router.config.ts` and `scripts/validate-content.ts`.
 */
export function prune(value: unknown): unknown {
  if (value === null || value === undefined) return undefined;
  if (Array.isArray(value)) return value.map(prune).filter((item) => item !== undefined);
  if (typeof value !== 'object') return value;
  const entries = Object.entries(value)
    .map(([key, child]) => [key, prune(child)] as const)
    .filter(([, child]) => child !== undefined);
  const hasContent = entries.some(([, child]) => child !== '');
  return hasContent ? Object.fromEntries(entries) : undefined;
}
