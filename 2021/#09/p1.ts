const data = (await Deno.readTextFile('input.txt')).split('\n')
const values = data.map(val => val.split('').map(i => parseInt(i)))
const lowest: number[] = []

values.map((l, i) => l.map((val, j) => {
	let neighbours = [(values[i-1]||[])[j], (values[i]||[])[j-1], (values[i]||[])[j+1], (values[i+1]||[])[j]]
	neighbours = neighbours.filter(p => p <= val)
	if (neighbours.length == 0) lowest.push(val+1)
}))

console.log(lowest.reduce((acc, cur) => acc + cur, 0))