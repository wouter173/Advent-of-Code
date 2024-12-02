const inp = await Deno.readTextFile("input.txt");

const reports = inp.split("\n").map((report) => report.split(" ").map(Number));

const isLevelSafe = (index: number, report: Array<number>) => {
  if (index === report.length - 1) {
    return null;
  }

  const diff = report[index + 1] - report[index];
  if (Math.abs(diff) > 3) {
    return false;
  }

  const shouldIncrease = report[0] < report[1];
  if (shouldIncrease && diff <= 0) {
    return false;
  } else if (!shouldIncrease && diff >= 0) {
    return false;
  }

  return true;
};

const safeReports = reports.map((report) => {
  const isSafe = report
    .map((_, i) => isLevelSafe(i, report))
    .filter((x) => x != null);

  return isSafe.filter(Boolean).length === report.length - 1;
});

console.log(safeReports.reduce((acc, val) => acc + (val ? 1 : 0), 0));
