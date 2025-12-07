const testInput = `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............
`.trim()

async function solution(input: string) {
  const grid: Array<Array<'^' | number>> = input.split('\n').map((line) =>
    line.split('').map((val) => {
      if (val === '^') return '^'
      if (val === 'S') return 1
      return 0
    }),
  )

  for (let i = 1; i < grid.length; i++) {
    const rowAbove = grid[i - 1]!
    const row = grid[i]!
    const pipesAbove = rowAbove.map((val, idx) => (typeof val === 'number' && val > 0 ? idx : null)).filter((x) => x !== null) as number[]

    for (const pipeAbove of pipesAbove) {
      if (row[pipeAbove] === '^') {
        ;(row[pipeAbove - 1] as number) += grid[i - 1]![pipeAbove] as number
        ;(row[pipeAbove + 1] as number) += grid[i - 1]![pipeAbove] as number
      } else {
        ;(row[pipeAbove]! as number) += grid[i - 1]![pipeAbove] as number
      }
    }
  }

  return grid
    .at(-1)!
    .filter((x) => typeof x === 'number')
    .reduce((cur, acc) => (cur += acc))
}

console.log('--- P2 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P2 real input ---')
console.log(await solution(realInput))
