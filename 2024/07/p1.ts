const input = await Deno.readTextFile("input.txt");

let sum = 0;

function generateSolutions(numbers: Array<number>) {
  let results = [numbers[0]];

  for (let i = 1; i < numbers.length; i++) {
    const newResults = results.map((r) => [numbers[i] + r, numbers[i] * r]).flat();
    results = newResults;
  }

  return results;
}

for (const line of input.split("\n")) {
  const [rawValue, rawNumbers] = line.split(": ");

  const value = parseInt(rawValue);
  const numbers = rawNumbers.split(" ").map((x) => parseInt(x));

  const solutions = generateSolutions(numbers);
  if (solutions.includes(value)) {
    sum += value;
  }
}

console.log(sum);
