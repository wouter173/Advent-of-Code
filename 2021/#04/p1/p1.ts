import {readFile} from 'fs/promises'
import Board from './board.js';

const data = (await readFile('input.txt', {encoding: 'utf-8'})).split('\n')
const drawables = data.shift();
let boards: Board[] = []

for (let line of data) {
	if (line.length == 0) {
		boards.push(new Board())
		continue
	}

	let values = line.split(' ').filter(a => a.length).map(a => Number(a))
	boards[boards.length-1].addRow(values)
}

let winner: Board = null
let last_drawn = 0

for (let drawn of drawables.split(',').map(a => Number(a))) {
	if (winner != null) break;
	for (let board of boards) {
		board.mark(drawn)
		last_drawn = drawn
		if (board.check().length != 0) {
			winner = board;
			break;
		}
	}
}

let sum = winner.getValues().reduce((acc, cur) => [...acc, ...cur], []).filter(a => !a.marked).reduce((acc, cur) => acc + +cur.val, 0)
console.log(sum * last_drawn)