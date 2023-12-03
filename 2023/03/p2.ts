import { print } from "../lib/mod.ts";

const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n");

const searchNeighbours = ({ x, y }: { x: number; y: number }) => {
  const s = (x: number, y: number) => {
    try {
      return { value: lines[x][y], x, y };
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

  return neighbours.filter(Boolean).filter((x) => x.value == "*");
};

const out = lines
  .map((line, i) =>
    Array.from(line.matchAll(/\d+/g)).map((m) => ({
      number: m[0],
      cogs: m[0]
        .split("")
        .map((_, j) => searchNeighbours({ x: i, y: m.index! + j }))
        .flat()
        .reduce<{ x: number; y: number; value: string }[]>((acc, cur) => {
          if (acc.filter(({ x, y }) => x == cur.x && y == cur.y).length > 0) {
            return acc;
          }
          return [...acc, cur];
        }, []),
    }))
  )
  .flat()
  .reduce<{ x: number; y: number; values: string[] }[]>((acc, cur) => {
    cur.cogs.forEach(({ x, y }) => {
      const ref = acc.find((c) => c.x == x && c.y == y);
      if (ref) {
        ref.values.push(cur.number);
      } else {
        acc.push({ x, y, values: [cur.number] });
      }
    });

    return acc;
  }, [])
  .filter((x) => x.values.length > 1)
  .map((x) => x.values.map((y) => parseInt(y)).reduce((acc, cur) => acc * cur))
  .reduce((acc, cur) => acc + cur, 0);

print(out);
