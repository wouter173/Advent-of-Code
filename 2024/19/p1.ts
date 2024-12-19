const input = Deno.readTextFileSync("./input.txt").split("\n\n");
const towels = input[0].split("\n")[0].split(", ");
const combinations = input[1].split("\n");

function isPossible(combination: string) {
  if (combination.length == 0) return true;
  const possibilities = towels.filter((t) => combination.startsWith(t));

  if (possibilities.length == 0) return false;
  for (const possibility of possibilities) {
    if (isPossible(combination.slice(possibility.length))) return true;
  }

  return false;
}

const result = combinations.map(isPossible).filter(Boolean).length;
console.log(result);
