import { print } from "../lib/mod.ts";

const input = await Deno.readTextFile("input.txt");

const lines = input
  .split("\n")
  .map((line) => {
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
    const score = overlap.length > 0 ? 1 * 2 ** (overlap.length - 1) : 0;

    return { id, overlap, score };
  })
  .map(print)
  .reduce((acc, cur) => (acc += cur.score), 0);

print(lines);
