const data = (await Deno.readTextFile('input.txt')).split('\n')

const openers = ['(', '[', '{', '<']
const scores =  [3, 57, 1197, 25137]
const closers = [')', ']', '}', '>']

const getCorrupt = (val: string) => {
	const cs = []

	for (const c of val) {
		if (openers.includes(c)) cs.push(c)
		if (closers.includes(c) ) {
			if (cs[cs.length -1] == openers[closers.indexOf(c)]) cs.pop()
			else return c
		}
	}
}

console.log(
	data
		.map(i => getCorrupt(i))
		.filter(i => i != undefined)
		.reduce((acc, cur) => acc + scores[closers.indexOf(cur!)], 0)
)