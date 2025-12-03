const testInput = `
987654321111111
811111111111119
234234234234278
818181911112111
`.trim()

function calculateJoltage(bank: string) {
  let digits = bank.split('').map((x) => parseInt(x))
  const out: Array<number> = []

  for (let idx = 0; idx < 12; idx++) {
    const needed = 12 - out.length - 1
    const optionCount = digits.length - needed

    const options = digits.slice(0, optionCount)

    const maxJ = Math.max(...options)
    out.push(maxJ)

    const maxJIdx = options.indexOf(maxJ)
    digits = digits.slice(maxJIdx + 1)
  }

  return parseInt(out.map((d) => d.toString()).join(''))
}

async function solution(input: string) {
  return input
    .split('\n')
    .map(calculateJoltage)
    .reduce((acc, cur) => acc + cur, 0)
}

console.log('--- P2 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P2 real input ---')
console.log(await solution(realInput))
