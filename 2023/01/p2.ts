import { print } from "../lib/mod.ts";

const input = await Deno.readTextFile("input.txt");

const numbersReplaceMap = {
  one: "1ne",
  two: "2wo",
  three: "3hree",
  four: "4our",
  five: "5ive",
  six: "6ix",
  seven: "7even",
  eight: "8ight",
  nine: "9ine",
};

const out = input
  .split("\n")
  .map((line) => {
    let l = line;
    line.split("").forEach(() => {
      l = l.replace(
        /(one|two|three|four|five|six|seven|eight|nine)/g,
        (m) => numbersReplaceMap[m as "one"]
      );
    });
    return l;
  })
  .map((line) =>
    line
      .split("")
      .map((x) => parseInt(x))
      .filter((x) => !isNaN(x))
  )
  .map((nums) => parseInt(nums[0] + "" + nums[nums.length - 1]))
  .reduce((acc, cur) => acc + cur, 0);

print(out);
