const input = await Deno.readTextFile("input.txt");

function visit(grid: string[][], x: number, y: number, direction: "up" | "down" | "left" | "right") {
  grid[y][x] = direction[0];
}

function getNewGrid() {
  const grid = input.split("\n").map((row) => row.split(""));
  const coords = grid
    .map((row, y) =>
      row.map((cell, x) => ({ x, y, cell, direction: "up" as const })).filter(({ cell }) => cell === "^")
    )
    .flat()[0];

  return { grid, coords };
}

function move(grid: string[][], coords: { x: number; y: number; direction: "up" | "down" | "left" | "right" }) {
  if (
    (grid[coords.y][coords.x] === "u" && coords.direction === "up") ||
    (grid[coords.y][coords.x] === "d" && coords.direction === "down") ||
    (grid[coords.y][coords.x] === "l" && coords.direction === "left") ||
    (grid[coords.y][coords.x] === "r" && coords.direction === "right")
  )
    return true;

  if (coords.direction === "up" && (grid[coords.y - 1][coords.x] === "#" || grid[coords.y - 1][coords.x] === "O")) {
    coords.direction = "right";
    return;
  }
  if (coords.direction === "right" && (grid[coords.y][coords.x + 1] === "#" || grid[coords.y][coords.x + 1] === "O")) {
    coords.direction = "down";
    return;
  }
  if (coords.direction === "down" && (grid[coords.y + 1][coords.x] === "#" || grid[coords.y + 1][coords.x] === "O")) {
    coords.direction = "left";
    return;
  }
  if (coords.direction === "left" && (grid[coords.y][coords.x - 1] === "#" || grid[coords.y][coords.x - 1] === "O")) {
    coords.direction = "up";
    return;
  }

  visit(grid, coords.x, coords.y, coords.direction);

  if (coords.direction === "up") coords.y--;
  if (coords.direction === "down") coords.y++;
  if (coords.direction === "left") coords.x--;
  if (coords.direction === "right") coords.x++;

  if (coords.x < 0 || coords.x >= grid[0].length || coords.y < 0 || coords.y >= grid.length)
    throw new Error("Out of bounds");
}

function testForLoop(obstacle?: { x: number; y: number }) {
  const { grid, coords } = getNewGrid();
  if (obstacle) grid[obstacle.y][obstacle.x] = "O";

  while (true) {
    try {
      const isLoop = move(grid, coords);
      if (isLoop) return true;
    } catch (_e) {
      return false;
    }
  }
}

const { grid } = getNewGrid();
const positions = grid.map((row, y) => row.map((_, x) => ({ y, x }))).flat();

const solutions = positions.map((p) => ({ loops: testForLoop(p), ...p }));
console.log(solutions.filter((grid) => grid.loops).length);
