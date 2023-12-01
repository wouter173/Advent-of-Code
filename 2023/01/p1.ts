const input = await Deno.readTextFile("input.txt");

const out = input
  .split("\n")
  .map((line) =>
    line
      .split("")
      .map((char) => parseInt(char))
      .filter((char) => !isNaN(char))
  )
  .map((nums) => parseInt(nums[0] + "" + nums[nums.length - 1]))
  .reduce((acc, cur) => acc + cur, 0);

console.log(out);
