const inp = await Deno.readTextFile("input.txt");

const instructions = inp
  .matchAll(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don\'t\(\)/g)
  .toArray()
  .map((x) => x[0]);

let listFilterIndex: number | null = 0;
while (listFilterIndex !== null) {
  const start = instructions.indexOf("don't()", listFilterIndex);
  if (start === -1) {
    listFilterIndex = null;
    break;
  }

  const end = instructions.indexOf("do()", start);

  instructions.splice(start, end - start + 1);
}

const sum = instructions
  .filter((x) => x !== "do()")
  .map((instruction) =>
    instruction
      .slice(4, -1)
      .split(",")
      .map((y) => parseInt(y))
      .reduce((a, b) => a * b)
  )
  .reduce((a, b) => a + b);

console.log(sum);
