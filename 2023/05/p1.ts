import { print } from "../lib/mod.ts";

const input = await Deno.readTextFile("input.txt");

const seeds: number[] = input
  .split("\n")
  .slice(0, 1)[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .map((x) => parseInt(x));

const ranges: Record<string, [number, number, number][]> = {};

input
  .slice(1)
  .split("\n\n")
  .map((line) => line.split("\n"))
  .forEach((lines) => {
    const key = lines[0].split(":")[0];

    lines.slice(1).forEach((line) => {
      const args = line.split(" ").map((x) => parseInt(x));
      if (!ranges[key]) ranges[key] = [];
      ranges[key].push([args[0], args[1], args[2]]);
    });
  });

const destinations = seeds.map((seed) => {
  let out = seed;

  Object.keys(ranges).forEach((key) => {
    for (const [to, from, size] of ranges[key]) {
      if (out >= from && out <= from + size) {
        out = to + (out - from);
        console.log(seed, out, "->", to, from, size, key);
        break;
      }
    }
  });

  return out;
});
print(destinations);

print(Math.min(...destinations));
