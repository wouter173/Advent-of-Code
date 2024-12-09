const input = Deno.readTextFileSync("./input.txt")
  .split("")
  .map((x) => parseInt(x));

const diskBlocks: Array<Array<number | ".">> = input.map((x, i) => {
  return i % 2 === 0 ? Array(x).fill(i / 2) : Array(x).fill(".");
});

for (let i = diskBlocks.length - 1; i >= 0; i--) {
  const block = deepClone(diskBlocks[i]);
  if (block.length === 0) continue;
  if (block[0] === ".") continue;

  const freeSpaceIndex = findFirstFreeSpace({ before: i, length: block.length });
  if (freeSpaceIndex === null) continue;

  diskBlocks[i] = diskBlocks[freeSpaceIndex].splice(0, block.length);
  diskBlocks.splice(freeSpaceIndex, 0, block);
}

function findFirstFreeSpace({ before, length }: { before: number; length: number }) {
  for (let i = 0; i < before; i++) {
    const block = diskBlocks[i];
    if (block.length >= length && block[0] === ".") {
      return i;
    }
  }

  return null;
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

const sum = diskBlocks
  .flat()
  .map((x) => (x === "." ? 0 : x))
  .map((x, i) => x * i)
  .reduce((a, b) => a + b);
console.log(sum);
