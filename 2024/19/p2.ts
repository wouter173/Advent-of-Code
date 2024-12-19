const input = Deno.readTextFileSync("./input.txt").split("\n\n");
const towels = input[0].split("\n")[0].split(", ");
const combinations = input[1].split("\n");

const cache: Record<string, number> = {};

function isPossible(combination: string) {
  if (combination.length == 0) return 1;
  if (cache[combination]) {
    return cache[combination];
  }

  const possibilities = towels.filter((t) => combination.startsWith(t));
  if (possibilities.length == 0) return 0;

  let count = 0;
  for (const possibility of possibilities) {
    count += isPossible(combination.slice(possibility.length));
  }

  cache[combination] = count;
  return count;
}

const result = combinations.map(isPossible);
console.log(result.reduce((acc, cur) => acc + cur));
