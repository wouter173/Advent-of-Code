const testInput = `

`.trim()

console.log('--- P2 test input ---')
console.log(await solution(testInput))

const realInput = await Bun.file('./input.txt').text()
console.log('--- P2 real input ---')
console.log(await solution(realInput))

async function solution(input: string) {}
