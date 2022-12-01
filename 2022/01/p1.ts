const inputs = await Deno.readTextFile("./input.txt");

const y = inputs
  .split("\n\n")
  .map((l) => l.split("\n").reduce((acc, cur) => acc + +cur, 0));

console.log(Math.max(...y));
