const inputs = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

// const inputs = await Deno.readTextFile("input.txt");

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

const head: Vec2 = { x: 0, y: 0 };
const tail: Vec2 = { x: 0, y: 0 };
const history: string[] = [];

for (const instr of instructions) {
  if (instr === "R") head.x += 1;
  if (instr === "L") head.x -= 1;
  if (instr === "U") head.y += 1;
  if (instr === "D") head.y -= 1;

  if (!isCloseEnough(head, tail)) {
    moveCloser(head, tail);
  }

  history.push(JSON.stringify(tail));
}

console.log(new Set(history).size);
