import math

def fuel(i, total=0):
	s = math.floor(i / 3 - 2)
	# print(s)
	if 0 > s:
		return total
	else:
		print("test")
		return fuel(s, total+s)

with open("./input.txt") as file:
	totalUsage = 0
	for cnt, line in enumerate(file):
		fuelUsage = fuel(int(line))
		totalUsage = totalUsage + fuelUsage
		print("- {} = {}".format(line, fuelUsage))
	
	print("total: {}".format(totalUsage))