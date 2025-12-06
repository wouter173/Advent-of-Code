const testInput = `
123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +
`.trim()

function rotateGrid(grid: string[][]) {
  const rows = grid.length
  const cols = Math.max(...grid.map((col) => col.length))

  return new Array(cols).fill('').map((_, i) => new Array(rows).fill('').map((_, j) => grid[j]?.[i] ?? ''))
}

async function solution(input: string) {
  const rows = input.split('\n').map((x) => x.split(''))
  const grid = rotateGrid(rows).map((cols) => cols.join(''))

  return grid
    .map((x) => x.trim())
    .join('\n')
    .split('\n\n')
    .map((x) => x.split('\n'))
    .map((value) => {
      const operator = value[0]?.at(-1)
      const nums = value.map((num, idx) => {
        if (idx === 0) num = num.split('').slice(0, -1).join('')

        return parseInt(num)
      })

      if (operator == '+') {
        return nums.reduce((acc, cur) => acc + cur, 0)
      } else {
        return nums.reduce((acc, cur) => acc * cur, 1)
      }
    })
    .reduce((acc, cur) => acc + cur)
}

console.log('--- P2 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P2 real input ---')
console.log(await solution(realInput))
