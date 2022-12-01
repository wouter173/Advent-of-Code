const inputs = await Deno.readTextFile("./input.txt");

const y = inputs
  .split("\n\n")
  .map((l) => l.split("\n").reduce((cur, acc) => Number(cur) + Number(acc), 0));

console.log(Math.max(...y));
