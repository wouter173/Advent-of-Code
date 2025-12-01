const debugInput = `
L1000
`.trim()

console.log('--- P2 debug input ---')
console.log(await solution(debugInput))

const testInput = `
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

console.log('--- P2 test input ---')
console.log(await solution(testInput))

const input = await Bun.file('./input.txt').text()
console.log('--- P2 real input ---')
console.log(await solution(input))

async function solution(input: string) {
  return input
    .split('\n')
    .reduce<Array<{ val: number; revs: number }>>(
      (acc, cur) => {
        const { val } = acc.at(-1)!

        const direction = cur.slice(0, 1)
        const count = +cur.slice(1)

        const revs = Math.floor(count / 100)
        const newCount = count % 100
        const newVal = direction === 'L' ? val - newCount : val + newCount

        const totalRevs = revs + (val !== 0 && (newVal > 100 || newVal < 0) ? 1 : 0)

        return [...acc, { val: newVal < 0 ? 100 + (newVal % 100) : newVal % 100, revs: totalRevs }]
      },
      [{ val: 50, revs: 0 }],
    )
    .reduce((acc, cur) => (acc += cur.revs + (cur.val === 0 ? 1 : 0)), 0)
}
