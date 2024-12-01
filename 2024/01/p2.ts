const inp = await Deno.readTextFile("input.txt");
const left = inp.split("\n").map((line) => parseInt(line.split("   ")[0]));
const right = inp.split("\n").map((line) => parseInt(line.split("   ")[1]));

console.log(
  left
    .map((v) => v * right.filter((x) => x === v).length)
    .reduce((acc, val) => acc + val, 0)
);
