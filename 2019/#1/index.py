import math

def fuel(i):
	return math.floor(i / 3 - 2)

with open("./input.txt") as file:
	totalUsage = 0
	for cnt, line in enumerate(file):
		fuelUsage = fuel(int(line))
		totalUsage = totalUsage + fuelUsage
		print("- {} = {}".format(line, fuelUsage))
	
	print("total: {}".format(totalUsage))