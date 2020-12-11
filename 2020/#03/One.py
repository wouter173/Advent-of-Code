from find import find_trees

with open("input.txt") as file:
	lines = [x.strip() for x in file.readlines()]

	print(find_trees(lines, 1, 3))
	
	file.close()