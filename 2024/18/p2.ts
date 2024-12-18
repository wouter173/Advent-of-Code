const size = 70;

const memoryPositions = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => ({
    x: parseInt(line.split(",")[0]),
    y: parseInt(line.split(",")[1]),
  }));

type Node = { char: "." | "#" | "O"; g: number; h: number; parent: Node | null; pos: { x: number; y: number } };

function getNeighbours(board: Node[][], pos: { x: number; y: number }) {
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
  const openList: Node[] = [];
  const closedList: Node[] = [];

  openList.push(startNode);

  while (openList.length > 0) {
    const current = openList.toSorted((a, b) => a.g + a.h - (b.g + b.h))[0];

    if (current.pos.x === endNode.pos.x && current.pos.y === endNode.pos.y) {
      return true;
    }

    const currentIndex = openList.findIndex((node) => node.pos.x === current.pos.x && node.pos.y === current.pos.y);
    openList.splice(currentIndex, 1);
    closedList.push(current);

    const neighbours = getNeighbours(board, current.pos);
    for (const neighbour of neighbours) {
      if (closedList.findIndex((ln) => ln.pos.x === neighbour.pos.x && ln.pos.y === neighbour.pos.y) !== -1) {
        continue;
      }

      const newG = current.g + 1;
      const newH = Math.abs(neighbour.pos.x - current.pos.x) + Math.abs(neighbour.pos.y - current.pos.y);

      const neighbourIndex = openList.findIndex((ln) => ln.pos.x === neighbour.pos.x && ln.pos.y === neighbour.pos.y);
      if (neighbourIndex === -1) {
        neighbour.h = newH;
        neighbour.g = newG;
        neighbour.parent = current;
        openList.push(neighbour);
      } else if (newG < openList[neighbourIndex].g) {
        openList[neighbourIndex].g = newG;
        openList[neighbourIndex].parent = current;
      }
    }
  }

  return false;
}

let positions = 1024;
console.log("It is working, it just takes a little while");
while (true) {
  const board: Node[][] = new Array(size + 1)
    .fill(0)
    .map((_, y) =>
      new Array(size + 1).fill(null).map((_, x) => ({ char: ".", g: 0, h: 0, parent: null, pos: { x, y } }))
    );

  for (let i = 0; i < positions; i++) {
    const { x, y } = memoryPositions[i];
    board[y][x].char = "#";
  }

  const validPath = search(board, board[0][0], board[size][size]);
  if (!validPath) {
    console.log("no path at", memoryPositions[positions - 1]);
    break;
  }

  positions += 1;
}
