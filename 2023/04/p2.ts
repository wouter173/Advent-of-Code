import { print } from "../lib/mod.ts";

const input = await Deno.readTextFile("input.txt");

const index: number[] = [];

input.split("\n").forEach((line, i) => {
  const id = parseInt(line.split(":")[0].split(" ")[1]);
  const winning = line
    .split(":")[1]
    .split("|")[0]
    .split(" ")
    .map((x) => parseInt(x))
    .filter(Boolean);

  const having = line
    .split(":")[1]
    .split("|")[1]
    .split(" ")
    .map((x) => parseInt(x))
    .filter(Boolean);

  const overlap = winning.filter((x) => having.includes(x));
  index[i] = index[i] ?? 1;
  overlap.forEach((_, j) => {
    index[j + i + 1] = (index[j + i + 1] ?? 1) + 1 * index[i];
  });

  return { id, overlap };
});

print(index.reduce((acc, cur) => acc + cur, 0));
