import { readFile } from 'fs/promises'

var yuh = (await readFile('input.txt', {encoding: 'utf-8'}))
	.split('\n')
	.reduce((acc, cur) => {
		let i=+cur[cur.length-1]
		if (cur[0] == 'd') return [acc[0] += i, acc[1]]
		if (cur[0] == 'u') return [acc[0] -= i, acc[1]]
		if (cur[0] == 'f') return [acc[0], acc[1] += i]
	}, [0, 0])
	.reduce((acc, cur) => {
		return acc *= cur
	}, 1)

console.log(yuh)