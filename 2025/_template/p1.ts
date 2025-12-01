const test = `

`.trim()

console.log('--- P1 test input ---')
console.log(await program(test))

const input = await Bun.file('./input.txt').text()
console.log('--- P1 real input ---')
console.log(await program(input))

async function program(input: string) {}
