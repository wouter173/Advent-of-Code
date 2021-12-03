import {readFile} from 'fs/promises'

let answer = (await readFile('input.txt', {encoding: 'utf-8'}))
	.split('\n')
	.reduce((acc, cur) => {
		cur.split('').map((c, i) => {acc[i] = [...acc[i] || [], c]})
		return acc
	}, [])
	.map(o => o.reduce((acc, cur) => {
		return +cur? [acc[0], acc[1]+1]: [acc[0]+1, acc[1]]
	}, [0, 0]))
	.reduce((acc, cur, i) => {
		acc[0][i] = cur.indexOf(Math.max(...cur))
		acc[1][i] = cur.indexOf(Math.min(...cur))
		return acc
	}, [[], []])
	.map(a => parseInt(a.join(''), 2))
	.reduce((a, c) => a * c)

console.log(answer)