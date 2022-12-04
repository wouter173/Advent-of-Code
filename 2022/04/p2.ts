const i = await Deno.readTextFile("input.txt");

const range = (start: number, end: number) =>
  [...Array(end - start + 1).keys()].map((i) => i + start);

const z = i.split("\n").map((l) => l.split(","));

const output = z.map((l) => {
  const o = l.map((i) => {
    const p = i.split("-").map(Number);
    return range(p[0], p[1]);
  });

  return o[0].map((p) => o[1].includes(p)).filter(Boolean).length > 0;
});

console.log(output.filter(Boolean).length);
