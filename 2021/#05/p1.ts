const data = await Deno.readTextFile("input.txt")
const maxY = 999

const board = new Array(maxY + 1)
  .fill(0)
  .map(() => new Array(maxY + 1).fill(0));

let lines: number[][] = data
	.split('\n')
	.map(l => l 
		.split('->')
		.reduce<any>((acc, cur) => [...acc, ...cur.split(',')], [])
		.map((a: any) => parseInt(a))
	)
	.filter((a: number[]) => a[0] == a[2] || a[1] == a[3])
	.reduce((acc, a) => {
		let b = []
		if(a[0] == a[2]) b = [[a[0]], range((Math.max(a[1], a[3]) - Math.min(a[1], a[3]) + 1) , Math.min(a[1], a[3]))]
		else b = [range((Math.max(a[0], a[2]) - Math.min(a[0], a[2]) + 1), Math.min(a[0], a[2])), [a[1]]]

		return [...acc, b]
	}, [])
	.map((l: number[][]) => {
		l[0].map((i: number) => l[1].map((j: number) => {
			board[j][i] += 1
		}))
	})

console.log(board.map(a => a.reduce((acc, cur) => acc + cur, '')).join('\n'))
console.log(board.reduce((acc, cur) => [...acc, ...cur], []).filter(i => i > 1).length)

function range(size:number, startAt:number = 0):ReadonlyArray<number> {
	return [...Array(size).keys()].map(i => i + startAt);
}