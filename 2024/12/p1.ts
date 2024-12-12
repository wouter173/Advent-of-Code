const input = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((l) => l.split(""));

type Area = { char: string; plots: Array<{ x: number; y: number }> };
const areas: Array<Area> = [];

for (const [y, row] of input.entries()) {
  for (const [x, char] of row.entries()) {
    const left = input[y]?.[x - 1];
    const top = input[y - 1]?.[x];

    const leftArea = areas.findIndex((a) => a.plots.find((p) => p.x === x - 1 && p.y === y));
    const topArea = areas.findIndex((a) => a.plots.find((p) => p.x === x && p.y === y - 1));

    if (leftArea !== topArea && left === char && top === char) {
      areas[topArea].plots = [...areas[topArea].plots, ...areas[leftArea].plots];
      areas[leftArea].plots = [];
    }

    let area: number | undefined;
    if (left === char) area = leftArea;
    if (top === char) area = topArea;

    if (area !== undefined) {
      areas[area].plots.push({ x, y });
    } else {
      areas.push({ char, plots: [{ x, y }] });
    }
  }
}

const total = areas
  .map((area) => {
    const perimeter = area.plots
      .map((plot) => {
        const left = area.plots.find((p) => p.x === plot.x - 1 && p.y === plot.y);
        const right = area.plots.find((p) => p.x === plot.x + 1 && p.y === plot.y);
        const down = area.plots.find((p) => p.x === plot.x && p.y === plot.y + 1);
        const up = area.plots.find((p) => p.x === plot.x && p.y === plot.y - 1);
        let sides = 4;

        if (left) sides -= 1;
        if (right) sides -= 1;
        if (down) sides -= 1;
        if (up) sides -= 1;
        return sides;
      })
      .reduce((a, b) => a + b, 0);

    return area.plots.length * perimeter;
  })
  .reduce((a, b) => a + b, 0);

console.log(total);
