const bots = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((b) => {
    const [rp, rv] = b.split(" ");
    const p = rp
      .slice(2)
      .split(",")
      .map((v) => parseInt(v));
    const v = rv
      .slice(2)
      .split(",")
      .map((v) => parseInt(v));
    return { pos: { x: p[0], y: p[1] }, velocity: { x: v[0], y: v[1] } };
  });

const width = 101;
const height = 103;

function printGrid(positions: { x: number; y: number }[]) {
  const grid = new Array(height).fill(0).map((_, y) => {
    return new Array(width).fill(".").map((_, x) => {
      const p = positions.filter((p) => p.x === x && p.y === y);
      if (p.length > 0) return p.length;
      else return ".";
    });
  });

  console.log();
  console.log(grid.map((l) => l.join("")).join("\n"));
}

function isGridLikely(positions: { x: number; y: number }[]) {
  const grid = new Array(height).fill(0).map((_, y) => {
    return new Array(width).fill(0).map((_, x) => {
      const p = positions.filter((p) => p.x === x && p.y === y);
      if (p.length > 0) return p.length;
      else return 0;
    });
  });

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const neighbors = [
        grid[y][x],
        grid[y - 1]?.[x],
        grid[y + 1]?.[x],
        grid[y][x + 1],
        grid[y][x - 1],
        grid[y + 1]?.[x + 1],
        grid[y - 1]?.[x + 1],
        grid[y + 1]?.[x - 1],
        grid[y - 1]?.[x - 1],
      ].filter((n) => n > 0).length;
      if (neighbors == 9) return true;
    }
  }
}

let seconds = 0;
while (true) {
  seconds++;
  console.log(seconds);
  for (const bot of bots) {
    const newX = (bot.pos.x + bot.velocity.x) % width;
    const newY = (bot.pos.y + bot.velocity.y) % height;
    bot.pos.x = newX < 0 ? width + newX : newX;
    bot.pos.y = newY < 0 ? height + newY : newY;
  }

  if (isGridLikely(bots.map((b) => b.pos))) {
    printGrid(bots.map((b) => b.pos));
    console.log(seconds);
    if (confirm("stop?")) break;
  }
}

console.log(seconds);
