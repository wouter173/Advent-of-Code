const data = (await Deno.readTextFile('input_test.txt')).split('\n')
const board = new Array(data.length).fill(null).map((_,i) => new Array(data[i].length).fill(null).map((_,j) => +data[i][j]))
// console.log(board.map(i => i.join('')).join('\n'))

const pos = [0, 0]

const neighbours = (x, y) => [
	[x,   y+1], [x+1, y]
].filter(i => !(i.includes(-1) || i.includes(data.length)))

const weighedBoard = board.map((c, i) => c.map((_, j) => {
	const A = neighbours(i, j).reduce((acc, cur) => acc += board[cur[0]][cur[1]], 0)
	const B = ((i - data.length) * -1) + ((j - data[0].length) * -1)
	return A + B
}))

console.log(weighedBoard.map(i => i.join(' ')).join('\n'))

while (!(pos[0] == data.length && pos[1] == data[0].length)) {
	console.log('bruh')
	console.log(neighbours(8, 7))
	pos[0] = data.length
	pos[1] = data[0].length
	console.log(pos)
}