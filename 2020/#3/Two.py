def findTrees(coordmap, lines, deltaY, deltaX):
	iterator = 0
	trees = 0

	for line in range(0, len(lines)):
		if iterator * deltaY >= len(lines): return trees
		coord = coordmap[iterator * deltaY][iterator * deltaX % 31]
		if (coord == "#"): trees += 1
		iterator += 1
	
	return trees

with open("input.txt") as file:
	lines = [x.strip() for x in file.readlines()]
	coordmap = []
	for line in lines:
		linemap = []
		for char in line:
			linemap.append(char)
		coordmap.append(linemap)
	

	one = findTrees(coordmap, lines, 1, 1)
	two = findTrees(coordmap, lines, 1, 3)
	three = findTrees(coordmap, lines, 1, 5)
	four = findTrees(coordmap, lines, 1, 7)
	five = findTrees(coordmap, lines, 2, 1)
	
	print(one * two * three * four * five)
	
	file.close()