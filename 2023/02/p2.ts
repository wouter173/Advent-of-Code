import { print } from "../lib/mod.ts";

const input = await Deno.readTextFile("input.txt");

const output = input
  .split("\n")
  .map((line) => {
    const [game, content] = line.split(":");
    const gameId = parseInt(game.split(" ")[1]);

    const minValues = content
      .split(";")
      .map((part) => {
        return part
          .split(",")
          .map((entry) => {
            const [count, name] = entry.trim().split(" ");

            return {
              name,
              count,
            };
          })
          .reduce<{ [key: string]: number }>((acc, cur) => {
            acc[cur.name] = parseInt(cur.count);
            return acc;
          }, {});
      })
      .reduce<{ [key: string]: number }>((acc, cur) => {
        Object.keys(cur).forEach((key) => {
          if (acc[key]) {
            if (acc[key] < cur[key]) {
              acc[key] = cur[key];
            }
          } else {
            acc[key] = cur[key];
          }
        });

        return acc;
      }, {});

    return {
      gameId,
      minValues,
    };
  })
  .map(
    (game) =>
      game.minValues["red"] * game.minValues["green"] * game.minValues["blue"]
  )
  .reduce((acc, cur) => {
    acc += cur;
    return acc;
  }, 0);

print(output);
