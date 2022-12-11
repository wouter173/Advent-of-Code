import { lcm as MathJsLcm } from "npm:mathjs";
const input = await Deno.readTextFile("./input.txt");

const monkeys = input.split("\n\n").map((raw) => {
  const rawLines = raw.split("\n").filter((_, i) => i > 0);
  const items = rawLines[0]
    .split(" ")
    .slice(4)
    .map((x) => parseInt(x));

  const operation = {
    action: rawLines[1].slice(23).at(0),
    value: rawLines[1].slice(25),
  };
  const test = parseInt(rawLines[2].slice(21));
  const testResult = {
    true: parseInt(rawLines[3].slice(29)),
    false: parseInt(rawLines[4].slice(30)),
  };

  return { items, operation, test, testResult, inspections: 0 };
});

// @ts-expect-error fucking retards
const lcm = MathJsLcm(...monkeys.map<number>((m) => m.test));

function watDaMonkeyDoing(monkey: typeof monkeys[0]) {
  for (const item of monkey.items) {
    const value =
      monkey.operation.value === "old"
        ? item
        : parseInt(monkey.operation.value);

    let worry = 0;

    if (monkey.operation.action === "*") worry = item * value;
    else worry = item + value;

    worry = worry % lcm;

    if (worry % monkey.test === 0) {
      monkeys[monkey.testResult.true].items.push(worry);
    } else {
      monkeys[monkey.testResult.false].items.push(worry);
    }

    monkey.inspections += 1;
  }

  monkey.items = [];
}

for (let i = 0; i < 10000; i++) {
  for (const monkey of monkeys) {
    watDaMonkeyDoing(monkey);
  }
}

console.log(
  monkeys
    .map((m) => m.inspections)
    .toSorted((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b)
);
