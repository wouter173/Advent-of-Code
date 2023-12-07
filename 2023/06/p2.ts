import { print } from "../lib/mod.ts";

const input = Deno.readTextFileSync("input.txt");

const extractNum = (x: string) => parseInt(x.split(" ").slice(1).filter(Boolean).join(""));

const lines = input.split("\n");

const time = extractNum(lines[0]);
const distance = extractNum(lines[1]);

const isOdd = (time / 2) % 2 == 1;

const out = new Array(Math.ceil(time / 2))
  .fill(null)
  .map((_, i) => i * (time - i))
  .filter((y) => y > distance);

print(out.length * 2 + (isOdd ? 1 : 0));
