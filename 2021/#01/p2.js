import {readFile} from 'fs/promises';

let total = (await readFile('input.txt', 'utf-8'))
	.split('\n')
	.map(i => Number(i))
	.reduce((acc, _, i, arr) => {
		if (i + 3 > arr.length) return acc;
		return [...acc, arr.slice(i, i + 3).reduce((acc, cur) => acc + cur)]
	}, [])
	.reduce((acc, cur, i, arr) => {
		if (i == 0) return acc;
		if (arr[i-1] < cur) return acc + 1;
		else return acc;
	}, 0)
	
console.log(total)