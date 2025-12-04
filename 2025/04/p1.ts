const testInput = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`.trim()

// prettier-ignore
const neighborsMap: [number,number][] = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1],
]

async function solution(input: string) {
  const grid = input.split('\n').map((line) => line.split(''))

  const movableRolls = grid.map((row, i) =>
    row.map((col, j) => {
      if (col === '.') return false

      const neighbors = neighborsMap.map((n) => grid[i + n[0]]?.[j + n[1]])
      const neighboringRolls = neighbors.filter((c) => c === '@').length

      return neighboringRolls < 4
    }),
  )

  return movableRolls.flat().filter(Boolean).length
}

console.log('--- P1 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P1 real input ---')
console.log(await solution(realInput))
