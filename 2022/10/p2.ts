const inputs = await Deno.readTextFile("./input.txt");

const instructions = inputs
  .split("\n")
  .reduce<string[]>(
    (acc, cur) =>
      cur.split(" ")[0] === "addx" ? [...acc, "noop", cur] : [...acc, cur],
    []
  );

let X = 1;
let cycles = 0;

const CRT: string[] = [];

for (const instruction of instructions) {
  const [method, value] = instruction.split(" ");

  if ([X - 1, X, X + 1].includes(cycles % 40)) CRT.push("#");
  else CRT.push(" ");

  cycles += 1;

  if (method === "addx") {
    X += parseInt(value);
  }
}

const render = CRT.map((c, i) => ((i + 1) % 40 == 0 ? c + "\n" : c)).join("");

console.log(render);
