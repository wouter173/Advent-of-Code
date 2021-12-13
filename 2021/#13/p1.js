const data = (await Deno.readTextFile('input.txt')).split('\n')
let dots = data
	.slice(0, data.indexOf(''))
	.map(i => i.split(',').map(j => parseInt(j)))
	
const instructions = data
	.slice(data.indexOf('')+1, data.length)
	.map(i => i.split('fold along ')[1].split('=').map((a, j) => j == 1? parseInt(a): a))

const ins = instructions[0]
ins[0] == 'x'? 
	dots = dots.map(d => [d[0] > ins[1]? ins[1] * 2 - d[0]: d[0], d[1]]):
	dots = dots.map(d => [d[0], d[1] > ins[1]? ins[1] * 2 - d[1]: d[1]])

const max = [Math.max(...dots.reduce((acc, cur) => [...acc, cur[0]], [])), Math.max(...dots.reduce((acc, cur) => [...acc, cur[1]], [])), ]
const paper = new Array(max[1]+1).fill(null).map(() => new Array(max[0]+1).fill('.'))
dots.map(d => paper[d[1]][d[0]] = '#')
console.log(paper.reduce((acc, cur) => [...acc, ...cur], []).filter(i => i == '#').length)
