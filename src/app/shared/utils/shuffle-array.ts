export function shuffleArray<T>(array: T[]): T[] {
  return array
    .map(t => ({ t, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ t }) => t);
}
