import {readFile} from 'fs/promises'

const data = (await readFile('input.txt', {encoding: 'utf-8'}))
	.split('\n')
	

const filter_criterea = (arr, index, oxygen) => {
	if (arr.length == 1) {
		return arr
	}

	let cur = arr
		.reduce((acc, cur) => {
			cur.split('').map((c, i) => {acc[i] = [...acc[i] || [], c]})
			return acc
		}, [])

	cur = cur[index]
		.reduce((acc, cur) => +cur? [acc[0], acc[1]+1]: [acc[0]+1, acc[1]], [0, 0])

	if (cur[0] == cur[1]) cur[1]+=1

	let out = arr.filter((c) => {
		return +c[index] == cur.indexOf(oxygen? Math.max(...cur): Math.min(...cur))
	})

	return filter_criterea(out, index+1, oxygen)
}

let a = parseInt(filter_criterea(data, 0, true)[0], 2) * parseInt(filter_criterea(data, 0, false)[0], 2)
console.log(a)