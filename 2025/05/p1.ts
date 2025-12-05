const testInput = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`.trim()

async function solution(input: string) {
  const [rangesPart, idsPart] = input.split('\n\n')

  const rangeReps = rangesPart!.split('\n').map((val) => val.split('-').map((x) => BigInt(x)))

  const ids = idsPart!
    .split('\n')
    .map((x) => BigInt(x))
    .filter((x) => rangeReps!.some(([start, end]) => x >= start! && x <= end!))

  return ids.length
}

console.log('--- P1 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P1 real input ---')
console.log(await solution(realInput))
