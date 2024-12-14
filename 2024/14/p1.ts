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

const printGrid = (positions: { x: number; y: number }[]) => {
  const grid = new Array(height).fill(0).map((_, y) => {
    return new Array(width).fill(".").map((_, x) => {
      const p = positions.filter((p) => p.x === x && p.y === y);
      if (p.length > 0) return p.length;
      else return ".";
    });
  });

  console.log();
  console.log(grid.map((l) => l.join("")).join("\n"));
};

for (let i = 0; i < 100; i++) {
  for (const bot of bots) {
    const newX = (bot.pos.x + bot.velocity.x) % width;
    const newY = (bot.pos.y + bot.velocity.y) % height;
    bot.pos.x = newX < 0 ? width + newX : newX;
    bot.pos.y = newY < 0 ? height + newY : newY;
  }
}

printGrid(bots.map((b) => b.pos));

const botsNW = bots.filter((b) => b.pos.x < (width - 1) / 2 && b.pos.y < (height - 1) / 2).length;
const botsNE = bots.filter((b) => b.pos.x > (width - 1) / 2 && b.pos.y < (height - 1) / 2).length;
const botsSE = bots.filter((b) => b.pos.x > (width - 1) / 2 && b.pos.y > (height - 1) / 2).length;
const botsSW = bots.filter((b) => b.pos.x < (width - 1) / 2 && b.pos.y > (height - 1) / 2).length;

console.log(botsNE * botsNW * botsSE * botsSW);
