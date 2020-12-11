with open('input.txt') as file:
	ones = 1
	threes = 1

	lines = [int(x.strip()) for x in file.readlines()]
	lines.sort(reverse=True)
	
	for i in range(0, len(lines) - 1):
		ans = lines[i] - lines[i + 1]
		if (ans == 1):
			ones += 1
		elif (ans == 3):
			threes += 1
	
	print(ones * threes)