const input = await Deno.readTextFile("./input.txt");

const trees = input
  .split("\n")
  .map((line) => line.split("").map((val) => Number(val)));

function isVisible(x: number, y: number) {
  const xRow = trees[x];
  const yRow = trees.map((row) => row[y]);

  const xSlice1 = xRow.slice(0, y);
  const xSlice2 = xRow.slice(y + 1);

  const ySlice1 = yRow.slice(0, x);
  const ySlice2 = yRow.slice(x + 1);

  const treeHeight = trees[x][y];

  const visibleFromTop = Math.max(...xSlice1) < treeHeight;
  const visibleFromBottom = Math.max(...xSlice2) < treeHeight;
  const visibleFromLeft = Math.max(...ySlice1) < treeHeight;
  const visibleFromRight = Math.max(...ySlice2) < treeHeight;

  return (
    visibleFromTop || visibleFromBottom || visibleFromLeft || visibleFromRight
  );
}

console.log(
  trees
    .map((row, i) => row.map((_, j) => isVisible(i, j)))
    .flat()
    .filter((x) => x).length
);
