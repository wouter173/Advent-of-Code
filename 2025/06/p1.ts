const testInput = `
123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +
`.trim()

async function solution(input: string) {
  const rows = input.split('\n').map((x) => x.split(' ').filter(Boolean))

  const operators = rows.splice(rows.length - 1, 1)[0]!
  const numRows = rows.map((cols) => cols.map((x) => parseInt(x)))

  const output = operators.map((operator, idx) => {
    const nums = numRows.map((cols) => cols.at(idx)!)

    if (operator == '+') {
      return nums.reduce((acc, cur) => acc + cur, 0)
    } else {
      return nums.reduce((acc, cur) => acc * cur, 1)
    }
  })

  return output.reduce((acc, cur) => acc + cur)
}

console.log('--- P1 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P1 real input ---')
console.log(await solution(realInput))
