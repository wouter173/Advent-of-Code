def find_trees(lines, deltaY, deltaX):
	trees = 0
	width = len(lines[0])
	loops = int(len(lines) / deltaY)

	for i in range(0, loops):

		y = i * deltaY
		x = i * deltaX % width

		if (lines[y][x] == "#"): trees += 1
	
	return trees