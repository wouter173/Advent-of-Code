import math

with open("./input.txt") as file:
	inp = file.readline().split(",")
	steps = math.floor(len(inp) / 4) + 1
	for i in range(0, steps):
		op = int(inp[i * 4])
		if op == 99:
			print("stop - out: {}".format(inp))
			exit()
		
		if op == 1:
			inp[int(inp[i * 4 + 3])] = int(inp[int(inp[i * 4 + 1])]) + int(inp[int(inp[i * 4 + 2])])
			print("op1")
		
		if op == 2:
			inp[int(inp[i * 4 + 3])] = int(inp[int(inp[i * 4 + 1])]) * int(inp[int(inp[i * 4 + 2])])
			print("op2")


