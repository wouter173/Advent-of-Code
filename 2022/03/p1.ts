const input = await Deno.readTextFile("input.txt");

const out = input.split("\n").map((line) => {
  const middle = line.length / 2;
  const char = line
    .slice(0, middle)
    .split("")
    .map((c) => (line.slice(middle).includes(c) ? c : null))
    .filter((c) => c !== null)
    .at(0);

  if (typeof char != "string") throw new Error("No char found");
  return char;
});

const calcWorth = (c: string) =>
  c.charCodeAt(0) - (c.toUpperCase() == c ? 38 : 96);

const total = out.reduce((acc, cur) => (acc += calcWorth(cur)), 0);
console.log(total);
