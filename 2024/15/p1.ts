const [rawBoard, rawMoves] = Deno.readTextFileSync("./input.txt").split("\n\n");

const board = rawBoard.split("\n").map((l) => l.split(""));
const walls = board.map((l, y) => l.map((c, x) => (c === "#" ? { x, y } : null)).filter(Boolean)).flat();
const boxes = board.map((l, y) => l.map((c, x) => (c === "O" ? { x, y } : null)).filter(Boolean)).flat();
const pos = board.map((l, y) => l.map((c, x) => (c === "@" ? { x, y } : null)).filter(Boolean)).flat()[0];
const moves = rawMoves.split("\n").join("").split("");

for (const move of moves) {
  if (move === "<") {
    if (!isWall("left", pos)) {
      shove("left", pos);
      pos.x--;
    }
  } else if (move === ">") {
    if (!isWall("right", pos)) {
      shove("right", pos);
      pos.x++;
    }
  } else if (move === "^") {
    if (!isWall("up", pos)) {
      shove("up", pos);
      pos.y--;
    }
  } else if (move === "v") {
    if (!isWall("down", pos)) {
      shove("down", pos);
      pos.y++;
    }
  }
}

function shove(dir: "up" | "right" | "down" | "left", position: { x: number; y: number }) {
  const nextPosition = getNextPosition(dir, position);

  const box = boxes.find((b) => b.x === nextPosition.x && b.y === nextPosition.y);
  if (!box) return;

  shove(dir, nextPosition);

  if (dir === "up") box.y--;
  if (dir === "right") box.x++;
  if (dir === "down") box.y++;
  if (dir === "left") box.x--;

  return;
}

function isWall(dir: "up" | "right" | "down" | "left", position: { x: number; y: number }) {
  const nextPosition = getNextPosition(dir, position);
  if (boxes.find((b) => b.x === nextPosition.x && b.y === nextPosition.y)) return isWall(dir, nextPosition);
  return walls.find((w) => w.x === nextPosition.x && w.y === nextPosition.y) ? true : false;
}

function drawBoard() {
  const grid = new Array(board.length).fill(".").map((_, y) => {
    return new Array(board[0].length).fill(".").map((_, x) => {
      if (pos.x === x && pos.y === y) return "@";
      else if (walls.find((w) => w.x === x && w.y === y)) return "#";
      else if (boxes.find((b) => b.x === x && b.y === y)) return "O";
      else return ".";
    });
  });
  console.log();
  console.log(grid.map((l) => l.join("")).join("\n"));
}

function getNextPosition(dir: "up" | "right" | "down" | "left", position: { x: number; y: number }) {
  if (dir === "up") {
    return { x: position.x, y: position.y - 1 };
  } else if (dir === "right") {
    return { x: position.x + 1, y: position.y };
  } else if (dir === "down") {
    return { x: position.x, y: position.y + 1 };
  } else return { x: position.x - 1, y: position.y };
}

console.log(boxes.map((b) => b.y * 100 + b.x).reduce((a, b) => a + b));

drawBoard();
