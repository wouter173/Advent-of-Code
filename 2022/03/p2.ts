const input = await Deno.readTextFile("input.txt");

const chunk = <T>(arr: Array<T>) =>
  new Array(Math.ceil(arr.length / 3)).fill(null).map((_, i) => {
    const index = i * 3;
    return arr.slice(index, index + 3);
  });

const out = chunk(input.split("\n")).map((chunk) => {
  const char = chunk[0]
    .split("")
    .map((c) => (chunk[1].includes(c) && chunk[2].includes(c) ? c : null))
    .filter((c) => c !== null)
    .at(0);

  if (typeof char != "string") throw new Error("No char found");
  return char;
});

const calcWorth = (c: string) =>
  c.charCodeAt(0) - (c.toUpperCase() == c ? 38 : 96);

const total = out.reduce((acc, cur) => (acc += calcWorth(cur)), 0);
console.log(total);
