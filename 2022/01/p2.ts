const inputs = await Deno.readTextFile("./input.txt");

const y = inputs
  .split("\n\n")
  .map((l) => l.split("\n").reduce((acc, cur) => acc + +cur, 0));

const topThree = y.sort((a, b) => b - a).slice(0, 3);

console.log(topThree.reduce((cur, acc) => cur + acc));
