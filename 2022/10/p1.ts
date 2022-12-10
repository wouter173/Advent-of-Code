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

let strength = 0;

for (const instruction of instructions) {
  cycles += 1;
  const [method, value] = instruction.split(" ");

  if (cycles === 20 || cycles % 40 === 20) {
    strength += X * cycles;
  }

  if (method === "addx") {
    X += parseInt(value);
  }
}

console.log(strength);
