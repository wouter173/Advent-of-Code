const testInput = `
11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124
`.trim()

console.log('--- P1 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P1 real input ---')
console.log(await solution(realInput))

function range([start, end]: Readonly<[number, number]>) {
  const size = end - start
  return new Array(size + 1).fill(null).map((_, idx) => idx + start)
}

function matchPattern(x: number) {
  const s = x.toString()
  const regex = /^(.+)\1$/

  return regex.test(s)
}

async function solution(input: string) {
  return input
    .split('\n')
    .join('')
    .split(',')
    .map((x) => {
      const r = x.split('-').map((y) => parseInt(y))
      return [r.at(0)!, r.at(1)!] as const
    })
    .flatMap((x) => range(x))
    .filter((x) => matchPattern(x))
    .reduce((acc, cur) => (acc += cur))
}
