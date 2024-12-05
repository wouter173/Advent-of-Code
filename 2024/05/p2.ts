const input = await Deno.readTextFile("input.txt");

const [rawRules, rawUpdates] = input.split("\n\n");

const rules = rawRules.split("\n").map((rule) => {
  const [x, y] = rule.split("|").map((i) => parseInt(i));
  return { x, y };
});

const updates = rawUpdates
  .split("\n")
  .map((x) => x.split(",").map((y) => parseInt(y)));

function followsRules(update: Array<number>) {
  return update.map((x, xIndex) => {
    return (
      rules
        .filter((rule) => rule.x === x)
        .map((rule) => {
          const yIndex = update.indexOf(rule.y);
          if (yIndex === -1) return true;
          if (xIndex > yIndex) return false;
          return true;
        })
        .filter((x) => x === false).length === 0
    );
  });
}

let sum = 0;

for (const update of updates) {
  const results = followsRules(update);
  if (results.indexOf(false) === -1) continue;

  while (true) {
    if (followsRules(update).indexOf(false) === -1) {
      sum += update[(update.length - 1) / 2];
      break;
    }

    const firstFalseIndex = followsRules(update).indexOf(false);
    const y = rules.filter((rule) => {
      if (rule.x !== update[firstFalseIndex] || !update.includes(rule.y)) {
        return false;
      }
      if (update.indexOf(rule.y) < firstFalseIndex) return true;
      return false;
    })[0].y;

    update.splice(update.indexOf(y), 0, update.splice(firstFalseIndex, 1)[0]);
  }
}

console.log(sum);
