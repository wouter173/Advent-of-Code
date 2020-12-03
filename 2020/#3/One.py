def findTrees(coordmap, lines, deltaY, deltaX):
	iterator = 0
	trees = 0

	for line in lines:
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
	

	print(findTrees(coordmap, lines, 1, 3))
	
	
	file.close()