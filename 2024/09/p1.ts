const input = Deno.readTextFileSync("./input.txt")
  .split("")
  .map((x) => parseInt(x));

const diskBlocks: Array<number | "."> = input
  .map((x, i) => {
    return i % 2 === 0 ? Array(x).fill(i / 2) : Array(x).fill(".");
  })
  .flat();

const sortedDisk: Array<number> = [];

while (diskBlocks.length > 0) {
  let block = diskBlocks.shift();
  if (block !== ".") {
    sortedDisk.push(block!);
    continue;
  }

  while (block === ".") {
    block = diskBlocks.pop();
  }
  sortedDisk.push(block!);
}

const sum = sortedDisk.map((x, i) => x * i).reduce((a, b) => a + b);
console.log(sum);
