const input = await Deno.readTextFile("input.txt");

const [rawRules, rawUpdates] = input.split("\n\n");

const rules = rawRules.split("\n").map((rule) => {
  const [x, y] = rule.split("|").map((i) => parseInt(i));
  return { x, y };
});

const updates = rawUpdates
  .split("\n")
  .map((x) => x.split(",").map((y) => parseInt(y)));

let sum = 0;

for (const update of updates) {
  const followsRules =
    update
      .map(
        (x, xIndex) =>
          rules
            .filter((rule) => rule.x === x)
            .map((rule) => {
              const yIndex = update.indexOf(rule.y);
              if (yIndex === -1) return true;
              if (xIndex > yIndex) return false;
              return true;
            })
            .filter((x) => x === false).length === 0
      )
      .filter((x) => x === false).length === 0;

  if (followsRules) {
    sum += update[(update.length - 1) / 2];
  }
}

console.log(sum);
