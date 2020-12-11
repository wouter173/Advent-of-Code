const fs = require("fs");

const input = fs.readFileSync("input.txt").toString();

const list = input.split("\n").map((line) => parseInt(line));

let goal = 0;

const isSumOfTwo = (n, options) => {
  options = options.reduce((a, b) => ((a[b] = b), a), {});
  for (o in options) {
    if (n - o != o && options[n - o] != null) {
      return true;
    }
  }
  return false;
};

const part1 = async () => {
  console.time("part1");

  for (let i = 25; i < list.length; i++) {
    if (!isSumOfTwo(list[i], list.slice(i - 25, i))) {
      goal = list[i];
      console.log("Part 1: ", goal);
      break;
    }
  }

  console.timeEnd("part1");
};

const part2 = () => {
  console.time("part2");

  let partsum = [0];
  let acc = 0;

  list.forEach((x) => {
    acc += parseInt(x);
    partsum.push(acc);
  });

  for (let i = 0; i < partsum.length; i++) {
    let j = i + 2;
    while (0 <= j < partsum.length && partsum[j] - partsum[i] <= goal) {
      if (partsum[j] - partsum[i] == goal) {
				const a = list.splice(i, j - i);
				console.log(i, j)
        let max = Math.max(...a) + Math.min(...a);
        console.log("Part 2: ", max);
        break;
      }
      j++;
    }
  }

  console.timeEnd("part2");
};

(async () => {
  await part1();
  part2();
})();