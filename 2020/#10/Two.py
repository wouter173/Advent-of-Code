with open('input.txt') as file:

	lines = [int(x.strip()) for x in file.readlines()]
	lines.sort(reverse=True)

	top = max(lines) + 3
	lines = set(lines)
	lines.add(top)
	a, b, c = 0, 0, 1
	for i in range(1, top + 1):
			if i in lines:
					a, b, c = b, c, a + b + c
			else:
					a, b, c = b, c, 0
	print(c)

