import seedrandom from 'seedrandom';

let seed = Math.random().toString();

export function arrayRandStable<T>(arr: T | T[]): T {
  if (Array.isArray(arr)) {
    const rng = seedrandom(arr.toString() + seed);
    const index = Math.floor(rng() * arr.length);
    return arr[index];
  }
  return arr;
}

export function arrayRand<T>(arr: T | T[]): T {
  if (Array.isArray(arr)) {
    const rng = seedrandom(Date.now().toString());
    const index = Math.floor(rng() * arr.length);
    return arr[index];
  }
  return arr;
}

export function resetSeed(): void {
  seed = Math.random().toString();
}
