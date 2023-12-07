import { print } from "../lib/mod.ts";

const input = Deno.readTextFileSync("input.txt");

const extractNums = (x: string) =>
  x
    .split(" ")
    .slice(1)
    .filter(Boolean)
    .map((x) => parseInt(x));

const lines = input.split("\n");

const times = extractNums(lines[0]);
const distances = extractNums(lines[1]);

const timeMap = times.map((x, i) => ({
  time: x,
  distance: distances[i],
}));

const out = timeMap
  .map((x) =>
    new Array(x.time)
      .fill(null)
      .map((_, i) => i * (x.time - i))
      .filter((y) => y > x.distance)
  )
  .reduce((acc, cur) => acc * cur.length, 1);

print(out);
