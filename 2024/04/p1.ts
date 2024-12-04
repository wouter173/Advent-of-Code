const input = await Deno.readTextFile("input.txt");

const grid = input.split("\n").map((row) => row.split(""));

function isXMAS(row: number, col: number) {
  const right = [
    grid[row][col],
    grid[row][col + 1],
    grid[row][col + 2],
    grid[row][col + 3],
  ];
  const left = [
    grid[row][col],
    grid[row][col - 1],
    grid[row][col - 2],
    grid[row][col - 3],
  ];
  const up = [
    grid[row][col],
    grid[row - 1]?.[col],
    grid[row - 2]?.[col],
    grid[row - 3]?.[col],
  ];
  const down = [
    grid[row][col],
    grid[row + 1]?.[col],
    grid[row + 2]?.[col],
    grid[row + 3]?.[col],
  ];

  const topRightDiag = [
    grid[row][col],
    grid[row + 1]?.[col + 1],
    grid[row + 2]?.[col + 2],
    grid[row + 3]?.[col + 3],
  ];
  const topLeftDiag = [
    grid[row][col],
    grid[row + 1]?.[col - 1],
    grid[row + 2]?.[col - 2],
    grid[row + 3]?.[col - 3],
  ];
  const bottomRightDiag = [
    grid[row][col],
    grid[row - 1]?.[col + 1],
    grid[row - 2]?.[col + 2],
    grid[row - 3]?.[col + 3],
  ];
  const bottomLeftDiag = [
    grid[row][col],
    grid[row - 1]?.[col - 1],
    grid[row - 2]?.[col - 2],
    grid[row - 3]?.[col - 3],
  ];

  const all = [
    right,
    left,
    up,
    down,
    topRightDiag,
    topLeftDiag,
    bottomRightDiag,
    bottomLeftDiag,
  ];

  return all.map((arr) => arr.join("")).filter((x) => x === "XMAS").length;
}

let sum = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    sum += isXMAS(i, j);
  }
}

console.log(sum);
