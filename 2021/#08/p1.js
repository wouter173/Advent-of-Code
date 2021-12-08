const data = await Deno.readTextFile('input.txt');
const  values = data.split('\n').map(a => a.split('|'))
const [_inp, out] = values.reduce((acc, cur) => [[...acc[0], cur[0]], [...acc[1], cur[1]]], [[], []])

const a = out.join('').split(' ').reduce((acc, cur) => {
	if (cur.length == 2 || cur.length == 3 || cur.length == 4 || cur.length == 7) return acc + 1
	return acc
}, 0)

console.log(a)
