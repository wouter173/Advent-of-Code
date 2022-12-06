const data = (await Deno.readTextFile('input.txt')).split('\n')
const pol = data.splice(0, 1) 
const rules = data.slice(1, data.length).map(i => i.split(' -> '))

const steps = 10
let counts = Object.assign({}, ...rules.map(i => {return {[i[0]]: 0}}))

const a = pol[0].split('').reduce((acc, cur, i, arr) => {
	if (i == arr.length-1) return acc
	return [...acc, cur + arr[i+1]]
}, []).map(i => counts[i]++)

for (let i = 0; i < steps; i++) {
	const temp = Object.assign({}, counts)
	rules.map(i => {
		temp[i[0][0]+i[1]] += counts[i[0]]
		temp[i[1]+i[0][1]] += counts[i[0]]
		temp[i[0]] -= counts[i[0]]
	})
	counts = temp
}

const chars = [...new Set(rules.reduce((acc, cur) => [...acc, ...cur[0]], []))]
	.reduce((acc, cur) => {
		let holding = Object.keys(counts).map(k => k.split('').filter(i => i == cur).length / 2 * counts[k])
		return [...acc, Math.ceil(holding.reduce((acc, cur) => acc += cur))]
	}, [])

console.log(Math.max(...chars) - Math.min(...chars))