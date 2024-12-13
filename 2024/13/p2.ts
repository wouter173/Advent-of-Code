const machines = Deno.readTextFileSync("./input.txt")
  .split("\n\n")
  .map((m) => {
    const A = /Button A: X\+(\d+), Y\+(\d+)/.exec(m)!;
    const a = { x: parseInt(A[1]), y: parseInt(A[2]) };

    const B = /Button B: X\+(\d+), Y\+(\d+)/.exec(m)!;
    const b = { x: parseInt(B[1]), y: parseInt(B[2]) };

    const P = /Prize: X=(\d+), Y=(\d+)/.exec(m)!;
    const prize = { x: 10000000000000 + parseInt(P[1]), y: 10000000000000 + parseInt(P[2]) };

    return { a, b, prize };
  });

function calcMachine(machine: {
  a: { x: number; y: number };
  b: { x: number; y: number };
  prize: { x: number; y: number };
}) {
  const det = machine.a.x * machine.b.y - machine.a.y * machine.b.x;

  const a = (machine.prize.x * machine.b.y - machine.prize.y * machine.b.x) / det;
  const b = (machine.a.x * machine.prize.y - machine.a.y * machine.prize.x) / det;

  if (a.toFixed() != a.toString() || b.toFixed() != b.toString()) {
    return null;
  }

  if (machine.a.x * a + machine.b.x * b == machine.prize.x && machine.a.y * a + machine.b.y * b == machine.prize.y) {
    return { a, b };
  }

  return null;
}

let sum = 0;

for (const machine of machines) {
  const winner = calcMachine(machine);
  if (winner) sum += winner.a * 3 + winner.b;
}

console.log(sum);
