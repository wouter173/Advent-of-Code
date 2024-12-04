const input = await Deno.readTextFile("input.txt");

const grid = input.split("\n").map((row) => row.split(""));

function isMas(arr: Array<string>) {
  return arr.join("") === "MAS" || arr.join("") === "SAM";
}

function isXMAS(row: number, col: number) {
  const firstMas = [
    grid[row][col],
    grid[row + 1]?.[col + 1],
    grid[row + 2]?.[col + 2],
  ];
  const secondMas = [
    grid[row + 2]?.[col],
    grid[row + 1]?.[col + 1],
    grid[row]?.[col + 2],
  ];

  return isMas(firstMas) && isMas(secondMas);
}

let sum = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (isXMAS(i, j)) sum += 1;
  }
}

console.log(sum);
