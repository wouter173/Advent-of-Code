// const input = await Deno.readTextFile("./input.txt");

const input = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

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

console.log(monkeys);

function watDaMonkeyDoing(monkey: typeof monkeys[0]) {
  for (const item of monkey.items) {
    const value =
      monkey.operation.value === "old"
        ? item
        : parseInt(monkey.operation.value);

    let worry = 0;

    // console.log(1, item);

    if (monkey.operation.action === "*") worry = item * value;
    else worry = item + value;
    // console.log(2, worry);

    worry = Math.floor(worry / 3);
    // console.log(3, worry);

    // console.log(worry % monkey.test, worry, monkey.test);
    if (worry % monkey.test === 0) {
      monkeys[monkey.testResult.true].items.push(worry);
    } else {
      monkeys[monkey.testResult.false].items.push(worry);
    }

    monkey.inspections += 1;
  }

  monkey.items = [];
}

for (let i = 0; i < 20; i++) {
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
