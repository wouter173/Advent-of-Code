const test = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`.trim()

console.log('--- P1 test input ---')
console.log(await solution(test))

const input = await Bun.file('./input.txt').text()
console.log('--- P1 real input ---')
console.log(await solution(input))

async function solution(input: string) {
  return input
    .split('\n')
    .reduce<Array<number>>(
      (acc, cur) => {
        const val = +acc.at(-1)!

        const direction = cur.slice(0, 1)
        const count = +cur.slice(1)

        const newVal = (direction === 'L' ? val - count : val + count) % 100

        return [...acc, newVal < 0 ? 100 + newVal : newVal]
      },
      [50],
    )
    .reduce((acc, cur) => acc + (cur === 0 ? 1 : 0), 0)
}
