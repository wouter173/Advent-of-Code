const [rawBoard, rawMoves] = Deno.readTextFileSync("./input.txt").split("\n\n");

const board = rawBoard.split("\n").map((l) => l.split(""));
const walls = board.map((l, y) => l.map((c, x) => (c === "#" ? { x: x * 2, y } : null)).filter(Boolean)).flat();
const boxes = board.map((l, y) => l.map((c, x) => (c === "O" ? { x: x * 2, y } : null)).filter(Boolean)).flat();
const pos = board.map((l, y) => l.map((c, x) => (c === "@" ? { x: x * 2, y } : null)).filter(Boolean)).flat()[0];
const moves = rawMoves.split("\n").join("").split("");

function shove(dir: "up" | "right" | "down" | "left", position: { x: number; y: number }) {}

function isWall(dir: "up" | "right" | "down" | "left", position: { x: number; y: number }) {}

function drawBoard() {
  const grid = new Array(board.length).fill(".").map(() => new Array(board[0].length * 2).fill("."));
  for (const box of boxes) {
    grid[box.y][box.x] = "[";
    grid[box.y][box.x + 1] = "]";
  }

  for (const wall of walls) {
    grid[wall.y][wall.x] = "#";
    grid[wall.y][wall.x + 1] = "#";
  }

  grid[pos.y][pos.x] = "@";

  console.log();
  console.log(grid.map((l) => l.join("")).join("\n"));
}

for (const move of moves) {
  drawBoard();
  console.log(move);
  if (move === "<") {
    const nextPosition = { x: pos.x - 1, y: pos.y };
    if (!isWall("left", nextPosition, true)) {
      shove("left", nextPosition);
      pos.x--;
    }
  } else if (move === ">") {
    const nextPosition = { x: pos.x + 1, y: pos.y };
    if (!isWall("right", nextPosition, true)) {
      shove("right", nextPosition);
      pos.x++;
    }
  } else if (move === "^") {
    if (!isWall("up", getNextPosition("up", pos), true)) {
      shove("up", getNextPosition("up", pos));
      pos.y--;
    }
  } else if (move === "v") {
    if (!isWall("down", getNextPosition("down", pos), true)) {
      shove("down", getNextPosition("down", pos));
      pos.y++;
    }
  }
}

drawBoard();
console.log(boxes.map((b) => b.y * 100 + b.x).reduce((a, b) => a + b));
