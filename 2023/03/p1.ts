import { print } from "../lib/mod.ts";

const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n");

const searchNeighbours = ({ x, y }: { x: number; y: number }) => {
  const s = (x: number, y: number) => {
    try {
      return lines[x][y];
    } catch {
      return undefined;
    }
  };

  const neighbours = [
    s(x - 1, y - 1),
    s(x - 1, y),
    s(x - 1, y + 1),
    s(x, y - 1),
    s(x, y + 1),
    s(x + 1, y - 1),
    s(x + 1, y),
    s(x + 1, y + 1),
  ];

  const hasSymbol = neighbours
    .filter(Boolean)
    .filter((x) =>
      ["*", "#", "%", "=", "-", "/", "+", "$", "@", "&"].includes(x)
    );
  return hasSymbol.length > 0;
};

const out = lines
  .map((line, i) =>
    Array.from(line.matchAll(/\d+/g)).map((m) => ({
      number: m[0],

      hasSymbol:
        m[0]
          .split("")
          .map((_, j) => searchNeighbours({ x: i, y: m.index! + j }))
          .filter(Boolean).length > 0,
    }))
  )
  .flat()
  .filter((x) => x.hasSymbol)
  .reduce((acc, cur) => acc + parseInt(cur.number), 0);

print(out);
