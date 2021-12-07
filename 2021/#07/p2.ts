const data = await Deno.readTextFile('input.txt')
const values = data.split(',').map(l => parseInt(l))
const max = Math.max(...values)

const a = Array(max).fill(0).map((_, i) => {
	return values.reduce((acc, cur) => {
		return acc += [...Array(Math.max(i+1, cur) - Math.min(i+1, cur)).keys()]
			.map(i => i+1)
			.reduce((acc, cur) => acc+cur, 0)
	}, 0)
})

console.log(Math.min(...a))