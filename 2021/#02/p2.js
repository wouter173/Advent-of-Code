import { readFile } from 'fs/promises'

var yuh = (await readFile('input.txt', {encoding: 'utf-8'}))
	.split('\n')
	.reduce(([hp, dp, aim], cur) => {
		let i=+cur[cur.length-1]
		if (cur[0] == 'd') return [hp, dp, aim += i]
		if (cur[0] == 'u') return [hp, dp, aim -= i]
		if (cur[0] == 'f') return [hp += i, dp += i * aim, aim]
	}, [0, 0, 0])
	.filter((_, i) => {
		if (i > 1) return false;
		return true
	})
	.reduce((acc, cur) => {
		return acc *= cur
	}, 1)

console.log(yuh)