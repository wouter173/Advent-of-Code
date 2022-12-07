const input = await Deno.readTextFile("./input.txt");

const fs: { [key: string]: unknown } = {};
let cwd: string[] = [];

const lines = input.split(/(\$.*)/g).filter((x) => x != "\n");

const getHead = (cwd: string[]) => {
  // deno-lint-ignore no-explicit-any
  let head: any = fs;
  for (let i = 0; i < cwd.length; i++) {
    head = head[cwd[i]];
  }
  return head;
};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.startsWith("$")) continue;

  if (line.includes("cd")) {
    const nextDir = line.split(" ").at(-1)!;

    if (nextDir == "/") cwd = [];
    else if (nextDir == "..") cwd.pop();
    else {
      getHead(cwd)[nextDir] = {};
      cwd.push(nextDir);
    }
  }

  if (line.includes("ls")) {
    const filesLine = lines[i + 1];
    const files = filesLine
      .split("\n")
      .filter((f, i) => {
        if (f.includes("dir")) return false;
        if (i == 0) return false;
        if (f == "") return false;
        return true;
      })
      .map((f) => {
        const [size, name] = f.split(" ");
        return [name, Number(size)];
      });

    const head = getHead(cwd);
    for (const [name, size] of files) head[name] = size;
  }
}

// deno-lint-ignore no-explicit-any
const flatFs: { [key: string]: any } = {};

// deno-lint-ignore no-explicit-any
const recursiveFlatten = (name: string, fs: { [key: string]: any }) => {
  flatFs[name] = fs;
  for (const [key, value] of Object.entries(fs)) {
    if (typeof value == "object") recursiveFlatten(`${name}/${key}`, value);
  }
};

// deno-lint-ignore no-explicit-any
const recursiveSum = (fs: { [key: string]: any }) => {
  let sum = 0;
  for (const [, value] of Object.entries(fs)) {
    if (typeof value == "number") sum += value;
    else sum += recursiveSum(value);
  }

  return sum;
};

recursiveFlatten("/", fs);
const required = 30000000 - (70000000 - recursiveSum(flatFs["/"]));

console.log(
  Object.entries(flatFs)
    .map((x) => recursiveSum(x[1]))
    .filter((x) => x >= required)
    .sort((a, b) => a - b)
    .at(0)
);
