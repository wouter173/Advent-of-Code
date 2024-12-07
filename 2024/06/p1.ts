const input = await Deno.readTextFile("input.txt");
const grid = input.split("\n").map((row) => row.split(""));

const coords = grid
  .map((row, y) => row.map((cell, x) => ({ x, y, cell, direction: "up" })).filter(({ cell }) => cell === "^"))
  .flat()[0];

grid[coords.y][coords.x] = ".";

function move() {
  grid[coords.y][coords.x] = "X";

  if (coords.direction === "up" && grid[coords.y - 1][coords.x] === "#") coords.direction = "right";
  if (coords.direction === "right" && grid[coords.y][coords.x + 1] === "#") coords.direction = "down";
  if (coords.direction === "down" && grid[coords.y + 1][coords.x] === "#") coords.direction = "left";
  if (coords.direction === "left" && grid[coords.y][coords.x - 1] === "#") coords.direction = "up";

  if (coords.direction === "up") coords.y--;
  if (coords.direction === "down") coords.y++;
  if (coords.direction === "left") coords.x--;
  if (coords.direction === "right") coords.x++;
}

while (true) {
  try {
    move();
  } catch (_e) {
    break;
  }
}

console.log(grid.flat().reduce((acc, cell) => acc + (cell === "X" ? 1 : 0), 0));
// console.log(grid.map((row) => row.join("")).join("\n"));
