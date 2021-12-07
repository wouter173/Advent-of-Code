const data = await Deno.readTextFile('input.txt')
const values = data.split(',').map(l => parseInt(l))

const median = (arr: number[]): number => {
	const mid = Math.floor(arr.length / 2), nums = [...arr].sort((a, b) => a - b);
	return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const m = median(values);
const a = values.reduce((acc, cur) => {
	return acc += (Math.max(m, cur) - Math.min(m, cur))
}, 0)

console.log(a)