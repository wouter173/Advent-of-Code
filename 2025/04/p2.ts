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

function findMovableRolls(grid: string[][]) {
  const movableRolls = grid.map((row, i) =>
    row.map((col, j) => {
      if (col === '.') return false

      const neighbors = neighborsMap.map((n) => grid[i + n[0]]?.[j + n[1]])
      const neighboringRolls = neighbors.filter((c) => c === '@').length

      return neighboringRolls < 4
    }),
  )

  return movableRolls
}

async function solution(input: string) {
  let grid = input.split('\n').map((line) => line.split(''))

  let totalMovableRollCount = 0
  let solvable = true
  while (solvable === true) {
    const movableRolls = findMovableRolls(grid)
    const movableRollCount = movableRolls.flat().filter(Boolean).length

    totalMovableRollCount += movableRollCount
    if (movableRollCount === 0) solvable = false

    grid = grid.map((row, i) => row.map((col, j) => (movableRolls[i]?.[j] ? '.' : col)))
  }

  return totalMovableRollCount
}

console.log('--- P2 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P2 real input ---')
console.log(await solution(realInput))
