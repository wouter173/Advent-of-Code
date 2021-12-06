const data = await Deno.readTextFile('input.txt')
let init = data.split(',').map(i => parseInt(i))

init = init.reduce((acc, cur) => {
	acc[cur] +=1
	return acc
}, [0, 0, 0, 0, 0, 0, 0, 0, 0])
console.log(init)

for (let i = 0; i < 256; i++) {
	init.push(init.shift()!)
	init[6] += init[8]
}

console.log(init.reduce((acc, cur) => acc + cur, 0));

