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
      const lgAntenna = antenna1.x > antenna2.x ? antenna1 : antenna2;
      const smAntenna = antenna1.x < antenna2.x ? antenna1 : antenna2;
      const offset = { x: lgAntenna.x - smAntenna.x, y: lgAntenna.y - smAntenna.y };

      const antinode1 = { x: smAntenna.x - offset.x, y: smAntenna.y - offset.y };
      const antinode2 = { x: lgAntenna.x + offset.x, y: lgAntenna.y + offset.y };

      if (antinode1.y >= 0 && antinode1.y < grid.length && antinode1.x >= 0 && antinode1.x < grid[0].length) {
        grid[antinode1.y][antinode1.x] = "#";
      }

      if (antinode2.y >= 0 && antinode2.y < grid.length && antinode2.x >= 0 && antinode2.x < grid[0].length) {
        grid[antinode2.y][antinode2.x] = "#";
      }
    });
  });
}

console.log(grid.flat().reduce((acc, cell) => (cell === "#" ? acc + 1 : acc), 0));
console.log(grid.map((row) => row.join("")).join("\n"));
