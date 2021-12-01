import {readFile} from 'fs/promises';

let total = (await readFile('input.txt', 'utf-8'))
	.split('\n')
	.map(i => Number(i))
	.reduce((acc, cur, i, values) => {
		if (i == 0) return acc;
		if (values[i-1] < cur) return acc + 1;
		else return acc;
	}, 0)

console.log(total)