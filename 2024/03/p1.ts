const inp = await Deno.readTextFile("input.txt");

const instructions = inp.matchAll(/mul\(\d{1,3},\d{1,3}\)/g).toArray();
const sum = instructions
  .map((x) =>
    x[0]
      .slice(4, -1)
      .split(",")
      .map((y) => parseInt(y))
      .reduce((a, b) => a * b)
  )
  .reduce((a, b) => a + b);

console.log(sum);
