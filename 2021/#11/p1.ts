const data = (await Deno.readTextFile('input_test.txt')).split('\n')
let board = new Array(data.length).fill(0).map((_, i) => new Array(data[0].length).fill(0).map((_, j) => parseInt(data[i][j])))
let had: string[]
let score = 0

const neighbours = (x: number, y: number) => {
	return [
		[x-1, y-1], 	[x-1, y], 	[x-1, y+1],
		[x, y-1], 					[x, y+1],
		[x+1, y-1],		[x+1, y], 	[x+1, y+1]
	].filter(i => (board[i[0]]||[])[i[1]] != undefined)
}

const recursive = (x: number, y: number) => {
	if (board[x][y] > 9 && !had.includes(x+','+y)) {
		had.push(x+','+y)

		const ns = neighbours(x, y)
		for (const n of ns) {
			board[n[0]][n[1]] += 1
			recursive(n[0], n[1])
		}
	}
}

for(let l=0; l < 100; l++) {
	board = board.map(i => i.map(j => j+1))
	had = []

	for(let i=0; i < board.length; i++) {
		for(let j=0; j < board[i].length; j++) {
			if (board[i][j] > 9) {
				recursive(i, j)
			}
		}
	}

	board = board.map(i => i.map(j => j > 9? 0: j))
	board.map(i => console.log(i.join(',')))
	score += board.reduce((acc, cur) => [...acc, ...cur],[]).filter(i => i == 0).length
}

console.log(score)