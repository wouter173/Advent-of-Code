const inputs = await Deno.readTextFile("./input.txt");

const game_scores = inputs
  .split("\n")
  .map((l) => {
    const [o, m] = l.split(" ");

    const res_points = [6, 0, 3, 6, 0][m.charCodeAt(0) - o.charCodeAt(0) - 21];
    return res_points + m.charCodeAt(0) - 87;
  })
  .reduce((acc: number, cur) => acc + cur, 0);

console.log(game_scores);
