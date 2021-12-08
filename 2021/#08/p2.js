const data = await Deno.readTextFile('input.txt');
const values = data.split('\n').map(a => a.split('|'))
const [inp, out] = values.reduce((acc, cur) => [[...acc[0], cur[0]], [...acc[1], cur[1]]], [[], []])

const commons = (arrays) => arrays.shift().filter(v => arrays.every(a => a.includes(v)))
const exclusive = (arr, arrays) => arr.filter(v => arrays.every(a => !a.includes(v)))

const checkCorrect = (inp) => {
	const perm = Array(7).fill(null)

	const digits = inp.split(' ')
		.filter(l => l.length == 2 || l.length == 3 || l.length == 4 || l.length == 7)
		.sort((a, b) => a.length - b.length)
		.map(l => l.split(''))

	const fives = inp.split(' ')
		.filter(l => l.length == 5)
		.map(l => l.split(''))

	const sixes = inp.split(' ')
		.filter(l => l.length == 6)
		.map(l => l.split(''))

	const fivesFiltered = []
	fivesFiltered.push(fives[0].filter(a => (fives[1].includes(a) || fives[2].includes(a))))
	fivesFiltered.push(fives[1].filter(a => (fives[0].includes(a) || fives[2].includes(a))))
	fivesFiltered.push(fives[2].filter(a => (fives[1].includes(a) || fives[0].includes(a))))

	const three = fivesFiltered.filter(s => s.length == 5)[0]
	const nine = sixes.filter(s => exclusive(three, s).length == 0)[0]
	perm[3] = commons([...fives, digits[2]])[0]
	perm[4] = exclusive(digits[3], [nine])[0]

	const zero = sixes.filter(s => commons([[perm[3]], s]).length == 0)[0]
	const six = sixes.filter(s => !(s == zero || s == nine))[0]
	perm[0] = digits[1].filter(a => !digits[0].includes(a))[0]
	perm[2] = exclusive(digits[3], [six])[0]
	perm[6] = exclusive(commons(fives), [digits[1], digits[2]])[0]

	perm[5] = exclusive(digits[0], [perm])[0]
	perm[1] = exclusive(digits[3], [perm])[0]
	return perm
}

const digitFromSegments = (segments) => {
	if (segments.filter(a => a).length == 6 && !segments[4]) return 9
	if (segments.filter(a => a).length == 7) return 8
	if (segments.filter(a => a).length == 3) return 7
	if (segments.filter(a => a).length == 6 && !segments[2]) return 6
	if (segments.filter(a => a).length == 5 && segments[1] && segments[5]) return 5
	if (segments.filter(a => a).length == 4) return 4
	if (segments.filter(a => a).length == 5 && segments[2] && segments[5]) return 3
	if (segments.filter(a => a).length == 5 && segments[2] && segments[4]) return 2
	if (segments.filter(a => a).length == 2) return 1
	if (segments.filter(a => a).length == 6 && !segments[3]) return 0
}

const digits = inp.map((i, j) => {
	const p = checkCorrect(i)

	return parseInt(out[j].trim().split(' ').map(a => {
		const segments = Array(7).fill(false)
	
		a.split('').map(l => { segments[p.indexOf(l)] = true })
		return digitFromSegments(segments)
	}).join(''))
})

console.log(digits.reduce((acc, cur) => acc + cur))