const inputs = await Deno.readTextFile("input.txt");
const WINDOW_SIZE = 14;

const toWindows = <T>(inputArray: T[], size: number) => {
  return inputArray.reduce<T[][]>((acc, _, index, arr) => {
    if (index + size > arr.length) return acc;
    return acc.concat([arr.slice(index, index + size)]);
  }, []);
};

const skippedChars = toWindows(inputs.split(""), WINDOW_SIZE)
  .map((window, i) => (new Set(window).size === WINDOW_SIZE ? i : null))
  .filter((i) => i !== null)
  .at(0);

if (typeof skippedChars != "number") throw new Error("No skipped chars found");

console.log(skippedChars + WINDOW_SIZE);
