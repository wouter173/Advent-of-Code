import math

for noun in range(0,100):
	for verb in range(0,100):
		with open("./input.txt") as file:
			inp = file.readline().split(",")
			inp[1] = noun
			inp[2] = verb
			steps = math.floor(len(inp) / 4) + 1
			for i in range(0, steps):
				op = int(inp[i * 4])
				if op == 99:
					# print("stop - out: {}".format(inp))
					if int(inp[0]) == 19690720:
						print(inp[0])
						print(inp[1], inp[2])
						exit()
				
				if op == 1:
					inp[int(inp[i * 4 + 3])] = int(inp[int(inp[i * 4 + 1])]) + int(inp[int(inp[i * 4 + 2])])
					print("op1")
				
				if op == 2:
					inp[int(inp[i * 4 + 3])] = int(inp[int(inp[i * 4 + 1])]) * int(inp[int(inp[i * 4 + 2])])
					print("op2")


