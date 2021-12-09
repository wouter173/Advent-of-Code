const data = (await Deno.readTextFile('input.txt')).split('\n')
const values = data.map(val => val.split('').map(i => parseInt(i)))
const basins: string[][] = []

const neighbours = (x: number, y: number): number[] => {
	return [(values[x-1]||[])[y], (values[x]||[])[y-1], (values[x]||[])[y+1], (values[x+1]||[])[y]]
}

const basin = (x: number, y: number, i: number): string => {
	const ns = neighbours(x, y);

	for (const n of ns.keys()) {
		if (values[x][y] < ns[n] && ns[n] != 9) {
			if (n == 0) basins[i].push(basin(x-1, y, i))
			if (n == 1) basins[i].push(basin(x, y-1, i))
			if (n == 2) basins[i].push(basin(x, y+1, i))
			if (n == 3) basins[i].push(basin(x+1, y, i))
		}
	}
	return x+''+y
}

values.map((l, i) => l.map((val, j) => {
	const n = neighbours(i, j).filter(p => p <= val)

	if (n.length == 0) {
		basins.push([])
		basins[basins.length-1].push(basin(i, j, basins.length-1))
	}
}))

const uniqs = basins.map(i => [...new Set(i)].length)
console.log(Array(3).fill(0).map(() => uniqs.splice(uniqs.indexOf(Math.max(...uniqs)), 1)[0]).reduce((acc, cur) => acc * cur))