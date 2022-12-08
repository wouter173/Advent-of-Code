const input = await Deno.readTextFile("./input.txt");

const trees = input
  .split("\n")
  .map((line) => line.split("").map((val) => Number(val)));

function countTreesVisible(arr: number[], treeHeight: number) {
  let treesVisible = 0;

  for (let i = 0; i < arr.length; i++) {
    treesVisible += 1;
    if (arr[i] >= treeHeight) break;
  }

  return treesVisible;
}

function lookAround(x: number, y: number) {
  const xRow = trees[x];
  const yRow = trees.map((row) => row[y]);

  const ySlice1 = xRow.slice(0, y);
  const ySlice2 = xRow.slice(y + 1);

  const xSlice1 = yRow.slice(0, x);
  const xSlice2 = yRow.slice(x + 1);

  const treeHeight = trees[x][y];

  const visibleFromTop = countTreesVisible(xSlice1.toReversed(), treeHeight);
  const visibleFromBottom = countTreesVisible(xSlice2, treeHeight);
  const visibleFromLeft = countTreesVisible(ySlice1.toReversed(), treeHeight);
  const visibleFromRight = countTreesVisible(ySlice2, treeHeight);

  return (
    visibleFromTop * visibleFromBottom * visibleFromLeft * visibleFromRight
  );
}

console.log(
  trees
    .map((row, i) => row.map((_, j) => lookAround(i, j)))
    .flat()
    .sort((a, b) => b - a)
    .at(0)
);
