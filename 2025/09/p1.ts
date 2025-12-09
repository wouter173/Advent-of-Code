const testInput = `
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
`.trim()

function area(pointA: { x: number; y: number }, pointB: { x: number; y: number }) {
  return (Math.abs(pointA.x - pointB.x) + 1) * (Math.abs(pointA.y - pointB.y) + 1)
}

async function solution(input: string) {
  const points = input.split('\n').map((line) => {
    const [x, y] = line.split(',').map((n) => parseInt(n))
    return { x: x!, y: y! }
  })

  const pointBs = [...points]

  const areas = points
    .flatMap((pointA) => {
      pointBs.shift()
      return pointBs.map((pointB) => ({ pointA, pointB, area: area(pointA, pointB) }))
    })
    .toSorted((a, b) => b.area - a.area)

  return areas[0]?.area
}

console.log('--- P1 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P1 real input ---')
console.log(await solution(realInput))
