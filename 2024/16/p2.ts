const grid = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.split(""));

const start = grid.map((row, y) => row.map((char, x) => ({ char, x, y })).filter((e) => e.char === "S")).flat()[0];
const exit = grid.map((row, y) => row.map((char, x) => ({ char, x, y })).filter((e) => e.char === "E")).flat()[0];

type Node = { x: number; y: number; score: number; direction: string | null; parents: Node[] };

const nodes: Node[] = [];

function findPath(node: Node) {
  const existingNode = nodes.find((p) => p.x === node.x && p.y === node.y);
  if (existingNode && existingNode.score < node.score) return;
  if (existingNode && existingNode.score === node.score) {
    existingNode.parents.push(node);
  }

  if (!existingNode) {
    nodes.push(node);
  } else {
    existingNode.score = node.score;
  }

  if (node.y === exit.y && node.x === exit.x) {
    console.log("found exit", node.score);
    return;
  }

  const directions = [
    { x: node.x - 1, y: node.y, direction: "left" },
    { x: node.x + 1, y: node.y, direction: "right" },
    { x: node.x, y: node.y - 1, direction: "up" },
    { x: node.x, y: node.y + 1, direction: "down" },
  ];

  const neighbours = directions
    .filter(({ x, y }) => grid[y][x] !== "#")
    .map(({ x, y, direction }) => {
      const score = node.score + 1 + (node.direction !== direction ? 1000 : 0);
      return { x, y, score, direction, parents: [node] };
    });

  for (const neighbour of neighbours) {
    findPath(neighbour);
  }
}

function backtrack(node: Node) {
  node.parents.forEach((parent) => {
    console.log(parent.score);
    backtrack(parent);
  });
}

findPath({ x: start.x, y: start.y, score: 0, direction: null, parents: [] });

const exitNode = nodes.find((p) => p.x === exit.x && p.y === exit.y)!;
console.log(exitNode.parents);
backtrack(exitNode);

const exitScore = exitNode.score;
console.log(exitScore);
