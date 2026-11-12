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
