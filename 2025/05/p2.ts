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

const bigIntMax = (...args: bigint[]) => args.reduce((m, e) => (e > m ? e : m))
const bigIntMin = (...args: bigint[]) => args.reduce((m, e) => (e < m ? e : m))

function overlaps(a: Readonly<[bigint, bigint]>, b: Readonly<[bigint, bigint]>) {
  return a[0] <= b[1] && a[1] >= b[0]
}

async function solution(input: string) {
  const [rangesPart] = input.split('\n\n')

  const outputRanges: Array<Readonly<[bigint, bigint]>> = []
  const inputRanges = rangesPart!
    .split('\n')
    .map((val) => val.split('-').map((x) => BigInt(x)) as [bigint, bigint])
    .toSorted((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))

  for (const inputRange of inputRanges) {
    const overlappingIdx = outputRanges.findIndex((outputRange) => overlaps(inputRange, outputRange))

    if (overlappingIdx == -1) {
      outputRanges.push(inputRange)
      continue
    }

    const overlappingRange = outputRanges.at(overlappingIdx)!
    const newRange = [bigIntMin(inputRange[0], overlappingRange[0]), bigIntMax(inputRange[1], overlappingRange[1])] as const

    outputRanges[overlappingIdx] = newRange
  }

  return outputRanges.reduce((acc, cur) => acc + (cur[1] - cur[0] + 1n), 0n).toString()
}

console.log('--- P2 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P2 real input ---')
console.log(await solution(realInput))
