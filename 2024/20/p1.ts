type Node = {
  char: string;
  parent: Node | null;
  pos: { x: number; y: number };
};

let longestPath: Node[] | null = null;

function getNeighbours(pos: { x: number; y: number }, board: Node[][]) {
  const neighbours = [
    board[pos.y - 1]?.[pos.x],
    board[pos.y + 1]?.[pos.x],
    board[pos.y]?.[pos.x - 1],
    board[pos.y]?.[pos.x + 1],
  ]
    .filter((n) => Boolean(n))
    .filter((n) => n.char !== "#");

  return neighbours;
}

function search(board: Node[][], startNode: Node, endNode: Node) {
  const visitedNodes = [startNode];

  while (true) {
    const current = visitedNodes.at(-1);
    if (!current) throw new Error("no path found");

    if (current.pos.x === endNode.pos.x && current.pos.y === endNode.pos.y) {
      break;
    }

    const neighbours = getNeighbours(current.pos, board);
    const nextNodes = neighbours
      .filter((node) => !visitedNodes.find((v) => v.pos.x === node.pos.x && v.pos.y === node.pos.y))
      .filter((node) => node.char !== "#");

    if (nextNodes.findIndex((node) => node.char === "C") !== -1) {
      visitedNodes.push(nextNodes.find((node) => node.char === "C")!);
      continue;
    }

    if (nextNodes.length === 0) {
      console.log(current);
      throw new Error("no path found");
    }
    if (nextNodes.length === 1) {
      visitedNodes.push(nextNodes[0]);
      continue;
    }

    if (longestPath === null) throw new Error("no longest path while running into 2 way path");

    const furthestNode = nextNodes
      .map((nextNode) => ({
        node: nextNode,
        score: longestPath?.findIndex((node) => node.pos.x === nextNode.pos.x && node.pos.y === nextNode.pos.y),
      }))
      .sort((a, b) => b.score! - a.score!)[0];

    visitedNodes.push(furthestNode.node);
  }

  return visitedNodes;
}

function printBoard(board: Node[][]) {
  for (const row of board) {
    console.log(row.map((node) => node.char).join(""));
  }
}

const board: Node[][] = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line, y) => line.split("").map((char, x) => ({ char, parent: null, pos: { x, y } })));

const startNode = board.find((row) => row.find((node) => node.char === "S"))!.find((node) => node.char == "S")!;
const endNode = board.find((row) => row.find((node) => node.char === "E"))!.find((node) => node.char == "E")!;

longestPath = search(board, startNode, endNode);

const cheatableWalls = board
  .map((row, y) => {
    if (y === 0 || y === board.length - 1) return row;

    return row.filter((node, x) => {
      if (node.char !== "#") return false;
      if (x === 0 || x === board[y].length - 1) return false;

      if (board[y][x - 1].char !== "#" && board[y][x + 1].char !== "#") return true;
      if (board[y - 1][x].char !== "#" && board[y + 1][x].char !== "#") return true;

      return false;
    });
  })
  .filter((_, y) => y > 0 && y < board.length - 1)
  .flat();

console.log(longestPath.length - 1);

console.log(cheatableWalls.length);
let i = 0;

const result = [];
for (const wall of cheatableWalls) {
  const newBoard = JSON.parse(JSON.stringify(board)) as Node[][];
  newBoard[wall.pos.y][wall.pos.x].char = "C";

  result.push(longestPath.length - search(newBoard, startNode, endNode).length);
  console.log(i++);
}

// console.log(result);
const digitCount = result.reduce((acc, num) => {
  acc[num] = (acc[num] || 0) + 1;
  return acc;
}, {} as Record<number, number>);

console.log(digitCount);
