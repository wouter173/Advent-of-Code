const data = await Deno.readTextFile('input.txt')
let init = data.split(',').map(i => parseInt(i))

for (let i = 0; i < 256; i++) {
	console.log(i)
	init = init.map(i => i -1)
	init.map(i => {
		if (i == -1) { 
			init.push(8) 
		}

		return i
	})
	init = init.map(i => {
		if (i == -1) {
			return 6
		}
		return i
	})
}

console.log(init.length)
