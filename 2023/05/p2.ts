import { print } from "../lib/mod.ts";

const input = await Deno.readTextFile("input.txt");

const seeds = input
  .split("\n")
  .slice(0, 1)[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .map((x) => parseInt(x))
  .reduce<[number, number?][]>(
    (acc, cur) =>
      acc.at(-1)?.length == 1
        ? [...acc.slice(0, -1), [acc.at(-1)![0], cur]]
        : [...acc, [cur]],
    []
  );

print(seeds);

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

const keys = Object.keys(ranges);

let currentStep: [number, number][] = seeds as [number, number][];
let nextStep: [number, number][] = [];

for (const key of keys) {
  while (currentStep.length > 0) {
    const seed = currentStep.shift()!;

    const currentStart = seed[0];
    const currentSize = seed[1];
    // console.log(currentStart);

    for (const [lookupTo, lookupFrom, lookupSize] of ranges[key]) {
      console.log(lookupTo, lookupFrom, lookupSize);
      if (
        currentStart >= lookupFrom &&
        currentStart <= lookupFrom + lookupSize
      ) {
        nextStep.push([lookupTo + (currentStart - lookupFrom), currentSize]);
        break;
      } else {
        nextStep.push([currentStart, currentSize]);
        break;
      }
    }
  }

  console.log(key, nextStep);

  currentStep = nextStep;
  nextStep = [];
}

console.log(currentStep);
