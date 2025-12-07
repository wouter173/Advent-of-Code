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
  const grid = input.split('\n').map((line) => line.split(''))

  let splits = 0

  for (let i = 1; i < grid.length; i++) {
    const rowAbove = grid[i - 1]!
    const pipesAbove = rowAbove.map((val, idx) => (val === 'S' || val === '|' ? idx : null)).filter((x) => x !== null) as number[]

    for (const pipeAbove of pipesAbove) {
      if (grid[i]![pipeAbove] === '^') {
        grid[i]![pipeAbove - 1] = '|'
        grid[i]![pipeAbove + 1] = '|'
        splits++
      } else {
        grid[i]![pipeAbove] = '|'
      }
    }
  }

  console.log(grid.map((x) => x.join('')).join('\n'))
  return splits
}

console.log('--- P1 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P1 real input ---')
console.log(await solution(realInput))
