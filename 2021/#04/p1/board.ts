type Value = {
	marked: boolean;
	val: Number;
}

export default class Board {
	private values: Value[][]

	constructor() {
		this.values = []
	}

	addRow(values: Number[]) {
		this.values.push(values.map(val => {return {marked: false, val: val} as Value}))
	}

	mark(value: Number) {
		this.values.map(a => a.map(b => { 
			if (b.val == value) b.marked = true; 
			return b
		}))
	}

	check(): Value[][] {
		let horizontal_matches = this.values.filter(a => a.filter(b => b.marked).length == 5)
		let vertical = this.values.map((_, i) => this.values[i].map((_, j) => this.values[j][i]))
		let vertical_matches = vertical.filter(a => a.filter(b => b.marked).length == 5)
		return [...vertical_matches, ...horizontal_matches]
	}

	getValues(): Value[][] {
		return this.values;
	}
}