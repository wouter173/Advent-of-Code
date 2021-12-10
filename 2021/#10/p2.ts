const data = (await Deno.readTextFile('input.txt')).split('\n')

const openers = ['(', '[', '{', '<']
const scores =  [1, 2, 3, 4]
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

const fixLine = (val: string): string[] => {
	const cs = []
	
	for (const c of val) {
		if (openers.includes(c)) cs.push(c)
		if (closers.includes(c) && cs[cs.length -1] == openers[closers.indexOf(c)]) cs.pop() 
	}

	return cs
}

const winners = data
	.filter(i => getCorrupt(i) == undefined)
	.map(i => fixLine(i).map(j => scores[openers.indexOf(j)]).reverse())
	.reduce((acc, cur) => [...acc, cur.reduce((acc, cur) => acc * 5 + cur, 0)], [])
	.sort((a, b) => a > b? 1: -1)

console.log(winners[~~(winners.length / 2)])