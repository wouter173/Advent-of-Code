const inputs = await Deno.readTextFile("./input.txt");

const game_scores = inputs
  .split("\n")
  .map((l) => {
    const [o, m] = l.split(" ");
    let points = [0, 3, 6][m.charCodeAt(0) - 88];

    if (m === "X") points += o.charCodeAt(0) - 65 || 3;
    if (m === "Y") points += o.charCodeAt(0) - 64;
    if (m === "Z") points += (o.charCodeAt(0) - 63) % 4 || 1;

    return points;
  })
  .reduce((acc, cur) => acc + cur, 0);

console.log(game_scores);
