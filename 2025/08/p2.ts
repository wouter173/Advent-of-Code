const testInput = `
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689
`.trim()

type Point = { x: number; y: number; z: number }

function distance(a: Point, b: Point) {
  return Math.abs(Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2))
}

async function solution(input: string) {
  const points = input.split('\n').map((line) => {
    const [xRaw, yRaw, zRaw] = line.split(',')
    return { x: parseInt(xRaw!), y: parseInt(yRaw!), z: parseInt(zRaw!) }
  })

  const pointBs = [...points]
  pointBs.shift()

  const sets = points
    .flatMap((pointA) => {
      pointBs.shift()
      return pointBs.map((pointB) => ({ points: [pointA, pointB] as const, distance: distance(pointA, pointB) }))
    })
    .toSorted((a, b) => a.distance - b.distance)

  const circuits: Array<Array<Point>> = []

  for (const set of sets) {
    const [pointA, pointB] = set.points

    const circuitAIdx = circuits.findIndex((circuit) => circuit.includes(pointA))
    const circuitBIdx = circuits.findIndex((circuit) => circuit.includes(pointB))

    if (circuitAIdx === -1 && circuitBIdx === -1) {
      // create new circuit
      circuits.push([pointA, pointB])
    } else if (circuitAIdx === -1 && circuitBIdx !== -1) {
      // add pointA to circuitB
      circuits[circuitBIdx]?.push(pointA)
    } else if (circuitAIdx !== -1 && circuitBIdx === -1) {
      // add pointB to circuitA
      circuits[circuitAIdx]?.push(pointB)
    } else if (circuitAIdx === circuitBIdx) {
      continue
    } else if (circuitAIdx !== -1 && circuitBIdx !== -1) {
      circuits[circuitAIdx]?.push(...circuits[circuitBIdx]!)
      circuits.splice(circuitBIdx, 1)
    }

    if (circuits.length === 1 && circuits[0]?.length === points.length) {
      return pointA.x * pointB.x
    }
  }
}

console.log('--- P2 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P2 real input ---')
console.log(await solution(realInput))
