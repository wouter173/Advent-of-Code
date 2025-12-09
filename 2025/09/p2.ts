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

type Point = { x: number; y: number }

function area(pointA: Point, pointB: Point) {
  return (Math.abs(pointA.x - pointB.x) + 1) * (Math.abs(pointA.y - pointB.y) + 1)
}

function isInPolygon(point: Point, polygon: Point[]) {
  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[j]!
    const b = polygon[i]!

    const onEdge =
      (a.x === b.x && point.x === a.x && point.y >= Math.min(a.y, b.y) && point.y <= Math.max(a.y, b.y)) ||
      (a.y === b.y && point.y === a.y && point.x >= Math.min(a.x, b.x) && point.x <= Math.max(a.x, b.x))

    if (onEdge) return true

    const intersect = a.y > point.y !== b.y > point.y && point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x

    if (intersect) inside = !inside
  }

  return inside
}

function rectBounds(a: Point, b: Point) {
  const x1 = Math.min(a.x, b.x)
  const x2 = Math.max(a.x, b.x)
  const y1 = Math.min(a.y, b.y)
  const y2 = Math.max(a.y, b.y)
  return { x1, x2, y1, y2 }
}

function segmentsIntersectAxisAligned(p1: Point, p2: Point, q1: Point, q2: Point): boolean {
  const pVert = p1.x === p2.x
  const qVert = q1.x === q2.x
  if (pVert && qVert) return false
  if (!pVert && !qVert) return false
  const v = pVert ? p1 : q1
  const v2 = pVert ? p2 : q2
  const h = pVert ? q1 : p1
  const h2 = pVert ? q2 : p2
  const vy1 = Math.min(v.y, v2.y),
    vy2 = Math.max(v.y, v2.y)
  const hx1 = Math.min(h.x, h2.x),
    hx2 = Math.max(h.x, h2.x)
  const crosses = v.x >= hx1 && v.x <= hx2 && h.y >= vy1 && h.y <= vy2
  if (!crosses) return false

  const ip: Point = { x: v.x, y: h.y }
  const isEndpoint =
    (ip.x === p1.x && ip.y === p1.y) ||
    (ip.x === p2.x && ip.y === p2.y) ||
    (ip.x === q1.x && ip.y === q1.y) ||
    (ip.x === q2.x && ip.y === q2.y)
  return !isEndpoint
}

function polygonIntersectsRectangleEdges(polygon: Point[], rectA: Point, rectB: Point): boolean {
  const { x1, x2, y1, y2 } = rectBounds(rectA, rectB)
  const rectEdges: Array<[Point, Point]> = [
    [
      { x: x1, y: y1 },
      { x: x2, y: y1 },
    ],
    [
      { x: x2, y: y1 },
      { x: x2, y: y2 },
    ],
    [
      { x: x2, y: y2 },
      { x: x1, y: y2 },
    ],
    [
      { x: x1, y: y2 },
      { x: x1, y: y1 },
    ],
  ]
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[j]!
    const b = polygon[i]!
    for (const [r1, r2] of rectEdges) {
      if (segmentsIntersectAxisAligned(a, b, r1, r2)) return true
    }
  }
  return false
}

async function solution(input: string) {
  const points = input.split('\n').map((line) => {
    const [x, y] = line.split(',').map((n) => parseInt(n))
    return { x: x!, y: y! }
  })

  let best = 0
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i]!
      const b = points[j]!
      if (a.x === b.x || a.y === b.y) continue
      const corners = [a, b, { x: a.x, y: b.y }, { x: b.x, y: a.y }]
      const cornersInside = corners.every((corner) => isInPolygon(corner, points))
      if (!cornersInside) continue
      if (polygonIntersectsRectangleEdges(points, a, b)) continue
      const ar = area(a, b)
      if (ar > best) best = ar
    }
  }
  return best
}

console.log('--- P2 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P2 real input ---')
console.log(await solution(realInput))
