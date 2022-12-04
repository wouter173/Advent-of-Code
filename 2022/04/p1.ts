const i = await Deno.readTextFile("input.txt");

const z = i.split("\n").map((l) => l.split(","));

const countBiggest = (inp: string[]) => {
  const [a, b] = inp;
  const aParsed = a.split("-").map(Number);
  const bParsed = b.split("-").map(Number);

  const [a1, a2] = aParsed;
  const [b1, b2] = bParsed;

  return a2 - a1 >= b2 - b1 ? [aParsed, bParsed] : [bParsed, aParsed];
};

const output = z
  .map((l) => {
    const o = countBiggest(l);
    return o[0][0] <= o[1][0] && o[0][1] >= o[1][1];
  })
  .filter(Boolean);

console.log(output.length);
