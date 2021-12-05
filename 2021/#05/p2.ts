const data = await Deno.readTextFile("input.txt")
const maxY = 999

const range = (start:number, end:number):Array<number> => {
    if (start > end) return [...Array(start - end +1).keys()].map(i => start - i);
    else return [...Array(end - start + 1).keys()].map(i => i + start);
}

const board = new Array(maxY + 1)
  .fill(0)
  .map(() => new Array(maxY + 1).fill(0));

const lines: number[][] = data
	.split('\n')
	.map(l => l 
		.split('->')
		.reduce<any>((acc, cur) => [...acc, ...cur.split(',')], [])
		.map((a: any) => parseInt(a))
	)
	.reduce((acc, a) => {
		let b = []

		if(a[0] == a[2]) b = [[a[0]], range(a[1], a[3])]
		else if (a[1] == a[3]) b = [range(a[0], a[2]), [a[1]]]
		else b = [range(a[0], a[2]), range(a[1], a[3])]

		return [...acc, b]
	}, [])
	.map((l: number[][]) => {
		if (l[0].length == 1 || l[1].length == 1) {
			l[0].map((i: number) => l[1].map((j: number) => {
				board[j][i] += 1
			}))
		} else {
			l[0].map((j: number, i: number) => {
				board[l[1][i]][j] += 1
			})
		}
	})


console.log(board.map(a => a.reduce((acc, cur) => acc + cur, '')).join('\n').replaceAll('0', '.'))
console.log(board.reduce((acc, cur) => [...acc, ...cur], []).filter(i => i > 1).length)