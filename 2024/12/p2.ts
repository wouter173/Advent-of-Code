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

let total = 0;
for (const area of areas.filter((a) => a.plots.length > 0)) {
  const plotVisibility = area.plots.map((plot) => {
    const left = area.plots.find((p) => p.x === plot.x - 1 && p.y === plot.y);
    const right = area.plots.find((p) => p.x === plot.x + 1 && p.y === plot.y);
    const down = area.plots.find((p) => p.x === plot.x && p.y === plot.y + 1);
    const up = area.plots.find((p) => p.x === plot.x && p.y === plot.y - 1);

    const visibility = { right: true, left: true, top: true, bottom: true, x: plot.x, y: plot.y };

    if (left) visibility.left = false;
    if (right) visibility.right = false;
    if (down) visibility.bottom = false;
    if (up) visibility.top = false;

    return visibility;
  });

  const rightSides = findVerticalSides(plotVisibility.filter((p) => p.right));
  const leftSides = findVerticalSides(plotVisibility.filter((p) => p.left));
  const topSides = findHorizontalSides(plotVisibility.filter((p) => p.top));
  const bottomSides = findHorizontalSides(plotVisibility.filter((p) => p.bottom));

  const totalSides = bottomSides + leftSides + rightSides + topSides;

  total += area.plots.length * totalSides;
}

function findVerticalSides(plots: Array<{ x: number; y: number }>) {
  const sides: Array<{ x: number; ys: Array<number> }> = [];
  for (const plot of plots) {
    const side = sides.findIndex(
      (side) => side.x === plot.x && (side.ys.includes(plot.y + 1) || side.ys.includes(plot.y - 1))
    );

    if (side === -1) {
      sides.push({ ys: [plot.y], x: plot.x });
      continue;
    }

    sides[side].ys.push(plot.y);
  }

  return sides.length;
}

function findHorizontalSides(plots: Array<{ x: number; y: number }>) {
  const sides: Array<{ y: number; xs: Array<number> }> = [];
  for (const plot of plots) {
    const side = sides.findIndex((s) => s.y === plot.y && (s.xs.includes(plot.x + 1) || s.xs.includes(plot.x - 1)));

    if (side === -1) {
      sides.push({ y: plot.y, xs: [plot.x] });
      continue;
    }

    sides[side].xs.push(plot.x);
  }

  return sides.length;
}

console.log(total);
