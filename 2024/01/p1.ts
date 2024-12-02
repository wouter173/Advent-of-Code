const inp = await Deno.readTextFile("input.txt");
const left = inp.split("\n").map((line) => parseInt(line.split("   ")[0]));
const right = inp.split("\n").map((line) => parseInt(line.split("   ")[1]));

const sortedLeft = left.toSorted();
const sortedRight = right.toSorted();

const diff = sortedLeft.map((v, i) => Math.abs(sortedRight[i] - v));
const sum = diff.reduce((acc, val) => acc + val, 0);

console.log(sum);
