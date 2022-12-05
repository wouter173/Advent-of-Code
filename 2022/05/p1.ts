const i = await Deno.readTextFile("input.txt");
const [inp, instructions] = i.split("\n\n").map((x) => x.split("\n"));

const inputs = inp
  .map((x) => x.split(/(.{1,4})/g).filter((x) => x.length > 0))
  .filter((_, i, a) => i != a.length - 1)
  .map((x) =>
    x.map((p) => p.trim()).map((p) => (p.length == 0 ? "" : p.split("")[1]))
  )
  .reduce<string[][]>(
    (prev, next) => next.map((_, i) => (prev[i] ?? []).concat(next[i])),
    []
  )
  .map((l) => l.filter((x) => x != ""));

instructions.forEach((line) => {
  const [_, amount, _1, from, _2, to] = line.split(" ").map(Number);
  const moving = inputs[from - 1].slice(0, amount).reverse();

  inputs[from - 1] = inputs[from - 1].slice(amount);
  inputs[to - 1] = moving.concat(inputs[to - 1]);
});

console.log(inputs.map((l) => l[0]).join(""));
