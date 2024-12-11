const stones = Deno.readTextFileSync("./input.txt")
  .split(" ")
  .map((x) => parseInt(x));

function solve(stone: number) {
  if (stone === 0) return [1];
  if (stone.toString().length % 2 === 0) {
    const engraving = stone.toString();
    const firstHalf = parseInt(engraving.slice(0, engraving.length / 2));
    const secondHalf = parseInt(engraving.slice(engraving.length / 2));
    return [firstHalf, secondHalf];
  }
  return [stone * 2024];
}

function blinkStones(initialStones: number[], blinks: number): number {
  let stoneMap = new Map<number, number>();

  for (const stone of initialStones) {
    const count = stoneMap.get(stone) ?? 0;
    stoneMap.set(stone, count + 1);
  }

  for (let i = 0; i < blinks; i++) {
    const nextStoneMap = new Map<number, number>();

    for (const [stone, count] of stoneMap.entries()) {
      const newStones = solve(stone);

      for (const newStone of newStones) {
        const existingCount = nextStoneMap.get(newStone) ?? 0;
        nextStoneMap.set(newStone, existingCount + count);
      }
    }

    stoneMap = nextStoneMap;
  }

  return Number([...stoneMap.values()].reduce((a, b) => a + b, 0));
}

const result = blinkStones(stones, 75);
console.log(result);
