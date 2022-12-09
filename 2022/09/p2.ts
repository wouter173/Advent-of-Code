const inputs = await Deno.readTextFile("input.txt");

const instructions = inputs.split("\n").reduce<string[]>((acc, cur) => {
  const [instr, amount] = cur.split(" ");
  const amountInstr = new Array(parseInt(amount)).fill(instr);
  return [...acc, ...amountInstr];
}, []);

type Vec2<T = number> = { x: T; y: T };

function isDiagonal(head: Vec2, tail: Vec2) {
  return head.x !== tail.x && head.y !== tail.y;
}

function isCloseEnough(head: Vec2, tail: Vec2) {
  const diff = Math.abs(head.x - tail.x) + Math.abs(head.y - tail.y);
  return diff <= (isDiagonal(head, tail) ? 2 : 1);
}

function moveCloser(head: Vec2, tail: Vec2) {
  const xDiff = head.x - tail.x;
  const yDiff = head.y - tail.y;

  if (Math.abs(xDiff) >= 1) xDiff > 0 ? (tail.x += 1) : (tail.x -= 1);
  if (Math.abs(yDiff) >= 1) yDiff > 0 ? (tail.y += 1) : (tail.y -= 1);
}

const rope: Vec2[] = new Array(10).fill(null).map(() => ({ x: 0, y: 0 }));
const history: string[] = [];

for (const instr of instructions) {
  if (instr === "R") rope[0].x += 1;
  if (instr === "L") rope[0].x -= 1;
  if (instr === "U") rope[0].y += 1;
  if (instr === "D") rope[0].y -= 1;

  for (let i = 1; i < rope.length; i++) {
    const head = rope[i - 1];
    const tail = rope[i];

    if (!isCloseEnough(head, tail)) {
      moveCloser(head, tail);
    }

    if (i == 9) history.push(JSON.stringify(tail));
  }
}

console.log(new Set(history).size);
