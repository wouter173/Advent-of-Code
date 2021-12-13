const data = (await Deno.readTextFile('input.txt')).split('\n').map(i => i.split('-'))
const points = {}
const ended = []

data.map(i => {
	points[i[0]] = [...points[i[0]]||[], i[1]]
	points[i[1]] = [...points[i[1]]||[], i[0]]
})

points['end'] = []

const recursive = (cur, history) => {
	if (history[history.length -1] == 'end') return
	history.push(cur)
	if (cur == 'end') ended.push(history) 

	points[cur].map(e => {
		if (!history.includes(e) || e.toUpperCase() == e) {
			recursive(e, [...history])
		}
	});

	return
}

recursive('start', [])
console.log(ended.map(i => i.join(',')))
console.log(ended.length)