let stones = Deno.readTextFileSync("./input.txt")
  .split(" ")
  .map((x) => parseInt(x)) as number[] | number[][];

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

const blinks = 25;
for (let i = 0; i < blinks; i++) {
  for (let j = 0; j < stones.length; j++) {
    stones.splice(j, 1, solve(stones[j] as number));
  }
  stones = stones.flat();
}

console.log(stones.length);
