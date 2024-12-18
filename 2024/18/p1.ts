const size = 70;
const positions = 1024;

const memoryPositions = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .splice(0, positions)
  .map((line) => ({
    x: parseInt(line.split(",")[0]),
    y: parseInt(line.split(",")[1]),
  }));

type Node = { char: "." | "#" | "O"; g: number; h: number; parent: Node | null; pos: { x: number; y: number } };

const board: Node[][] = new Array(size + 1)
  .fill(0)
  .map((_, y) =>
    new Array(size + 1).fill(null).map((_, x) => ({ char: ".", g: 0, h: 0, parent: null, pos: { x, y } }))
  );

for (const { x, y } of memoryPositions) {
  board[y][x].char = "#";
}

function getNeighbours(pos: { x: number; y: number }) {
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

const openList: Node[] = [];
const closedList: Node[] = [];

function search(startNode: Node, endNode: Node) {
  openList.push(startNode);

  while (openList.length > 0) {
    const current = openList.toSorted((a, b) => a.g + a.h - (b.g + b.h))[0];

    if (current.pos.x === endNode.pos.x && current.pos.y === endNode.pos.y) {
      console.log("path found");
      const newPath = [];

      let resultCur = current;
      while (resultCur.parent) {
        newPath.push(resultCur.pos);
        resultCur = resultCur.parent;
      }

      return newPath.toReversed();
    }

    const currentIndex = openList.findIndex((node) => node.pos.x === current.pos.x && node.pos.y === current.pos.y);
    openList.splice(currentIndex, 1);
    closedList.push(current);

    const neighbours = getNeighbours(current.pos);
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

  throw new Error("no path found");
}

const shortestPath = search(board[0][0], board[size][size]);
console.log(shortestPath.length);
