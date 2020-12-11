from find import find_trees

with open("input.txt") as file:
	lines = [x.strip() for x in file.readlines()]

	slopes = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]]
	output = 1

	for i in slopes:
		output *= find_trees(lines, i[0], i[1])

	print(output)
	
	file.close()