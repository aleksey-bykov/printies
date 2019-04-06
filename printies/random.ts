// https://en.wikipedia.org/wiki/Linear_congruential_generator

const m = 1 << 24;
const a = 1140671485;
const c = 12820163;

function nextRandom(seed: number): number {
    return (a * seed + c) % m;
}

export function nextRandomOver(seed: number): () => number {
    return () => {
        seed = nextRandom(seed);
        return (seed % 1000000) / 1000000;
    };
}