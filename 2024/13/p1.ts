const machines = Deno.readTextFileSync("./input.txt")
  .split("\n\n")
  .map((m) => {
    const A = /Button A: X\+(\d+), Y\+(\d+)/.exec(m)!;
    const a = { x: parseInt(A[1]), y: parseInt(A[2]) };

    const B = /Button B: X\+(\d+), Y\+(\d+)/.exec(m)!;
    const b = { x: parseInt(B[1]), y: parseInt(B[2]) };

    const P = /Prize: X=(\d+), Y=(\d+)/.exec(m)!;
    const prize = { x: parseInt(P[1]), y: parseInt(P[2]) };

    return { a, b, prize };
  });

function calcMachine(machine: {
  a: { x: number; y: number };
  b: { x: number; y: number };
  prize: { x: number; y: number };
}) {
  const winners = [];

  for (let aUsage = 0; aUsage < 100; aUsage++) {
    for (let bUsage = 0; bUsage < 100; bUsage++) {
      const x = machine.a.x * aUsage + machine.b.x * bUsage;
      const y = machine.a.y * aUsage + machine.b.y * bUsage;

      if (x == machine.prize.x && y == machine.prize.y) winners.push({ a: aUsage, b: bUsage });
    }
  }

  return winners;
}

let sum = 0;

for (const machine of machines) {
  const winners = calcMachine(machine);
  sum += winners[0] ? winners[0].a * 3 + winners[0].b : 0;
}

console.log(sum);
