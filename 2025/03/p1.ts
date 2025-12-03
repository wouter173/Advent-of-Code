const testInput = `
987654321111111
811111111111119
234234234234278
818181911112111
`.trim()

function calculateJoltage(bank: string) {
  const tensDigits = bank.split('').map((x) => parseInt(x))
  const tensJ = Math.max(...tensDigits.slice(0, -1))

  const onesDigits = tensDigits.slice(tensDigits.indexOf(tensJ) + 1)
  const onesJ = Math.max(...onesDigits)

  return parseInt(`${tensJ}${onesJ}`)
}

async function solution(input: string) {
  return input
    .split('\n')
    .map(calculateJoltage)
    .reduce((acc, cur) => acc + cur, 0)
}

console.log('--- P1 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P1 real input ---')
console.log(await solution(realInput))
