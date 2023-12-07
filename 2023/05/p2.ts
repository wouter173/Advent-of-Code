import { print } from "../lib/mod.ts";

const input = await Deno.readTextFile("input.txt");

const seeds = input
  .split("\n")
  .slice(0, 1)[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .map((x) => parseInt(x))
  .reduce<[number, number?][]>((acc, cur) => (acc.at(-1)?.length == 1 ? [...acc.slice(0, -1), [acc.at(-1)![0], cur]] : [...acc, [cur]]), []);

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
    let changedAnything = false;

    for (const [lookupTo, lookupFrom, lookupSize] of ranges[key]) {
      console.log(currentStart, "->", currentStart + currentSize, ", inside of?", lookupFrom, "->", lookupFrom + lookupSize, ", maps to", lookupTo, "->", lookupTo + lookupSize, key);
      if (currentStart < lookupFrom && currentStart + currentSize > lookupFrom + lookupSize) {
        console.log("hit", "first");
        changedAnything = true;

        console.log("current", currentStart, lookupFrom - currentStart);
        currentStep.push([currentStart, lookupFrom - currentStart]);

        console.log("next", lookupTo, lookupSize);
        nextStep.push([lookupTo, lookupSize]);

        console.log("current", lookupFrom + lookupSize, currentStart + currentSize - (lookupFrom + lookupSize));
        currentStep.push([lookupFrom + lookupSize, currentStart + currentSize - (lookupFrom + lookupSize)]);
        break;
      } else if (currentStart >= lookupFrom && currentStart < lookupFrom + lookupSize && currentSize < lookupSize) {
        console.log("hit", "second");
        changedAnything = true;

        console.log("next", lookupTo + (currentStart - lookupFrom), currentSize);
        nextStep.push([lookupTo + (currentStart - lookupFrom), currentSize]);
        break;
      } else if (lookupFrom + lookupSize < currentStart + currentSize && currentStart < lookupFrom + lookupSize && lookupFrom < currentStart) {
        // matches: 50 -> 60 inside of? 45 -> 55 maps to 10 -> 20
        // upper bound dangling

        changedAnything = true;
        console.log("hit", "third");

        console.log("current", lookupFrom + lookupSize, currentSize - (currentStart - lookupFrom));
        nextStep.push([lookupFrom + lookupSize, currentSize - (currentStart - lookupFrom)]);

        console.log("next", lookupTo, currentStart - lookupFrom);
        nextStep.push([lookupTo, currentStart - lookupFrom]);
        break;
      } else if (lookupFrom + lookupSize > currentStart && currentStart < lookupFrom && currentStart + currentSize > lookupFrom) {
        // matches: 50 -> 60 inside of? 55 -> 65 maps to 10 -> 20
        // lower bound dangling

        changedAnything = true;
        console.log("hit", "fourth");
        console.log("current", currentStart, lookupFrom - currentStart);
        currentStep.push([currentStart, lookupFrom - currentStart]);

        console.log("next", lookupTo, currentStart + currentSize - lookupFrom);
        nextStep.push([lookupTo, currentStart + currentSize - lookupFrom]);

        break;
      }
    }

    if (changedAnything) continue;
    nextStep.push(seed);
  }

  currentStep = nextStep;
  nextStep = [];
}

console.log(currentStep);
console.log(Math.min(...currentStep.map((x) => x[0])));
