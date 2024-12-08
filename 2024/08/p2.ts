const grid = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((row) => row.split(""));

const antennas: Record<string, Array<{ x: number; y: number }>> = {};

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const cell = grid[y][x];
    if (cell !== ".") {
      if (!antennas[cell]) antennas[cell] = [];
      antennas[cell].push({ x, y });
    }
  }
}

for (const frequency of Object.keys(antennas)) {
  antennas[frequency].forEach((antenna1) => {
    antennas[frequency].forEach((antenna2) => {
      if (antenna1 === antenna2) return;

      const offset = { x: antenna1.x - antenna2.x, y: antenna1.y - antenna2.y };

      let antinode = antenna2;
      while (true) {
        antinode = { x: antinode.x + offset.x, y: antinode.y + offset.y };
        if (antinode.y < 0 || antinode.y >= grid.length || antinode.x < 0 || antinode.x >= grid[0].length) break;
        grid[antinode.y][antinode.x] = "#";
      }
    });
  });
}

console.log(grid.flat().reduce((acc, cell) => (cell === "#" ? acc + 1 : acc), 0));
console.log(grid.map((row) => row.join("")).join("\n"));
