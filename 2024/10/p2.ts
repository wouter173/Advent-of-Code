const grid = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.split("").map((x) => (x === "." ? 100 : parseInt(x))));

function findTrail({ x, y }: { x: number; y: number }): Array<{ x: number; y: number }> {
  const val = grid[x][y];

  if (val === 9) return [{ x, y }];

  let res: Array<{ x: number; y: number }> = [];
  if (grid[x - 1] && grid[x - 1][y] === val + 1) res = [...res, ...findTrail({ x: x - 1, y })];
  if (grid[x + 1] && grid[x + 1][y] === val + 1) res = [...res, ...findTrail({ x: x + 1, y })];
  if (grid[x][y - 1] === val + 1) res = [...res, ...findTrail({ x, y: y - 1 })];
  if (grid[x][y + 1] === val + 1) res = [...res, ...findTrail({ x, y: y + 1 })];

  return res;
}

const output = grid.map((line, x) =>
  line
    .map((val, y) => {
      if (val !== 0) return 0;
      const trailEnds = findTrail({ x, y });
      return trailEnds.length;
    })
    .reduce((acc, cur) => acc + cur, 0)
);

console.log(output.reduce((acc, cur) => acc + cur));
