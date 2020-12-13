bus = None

with open("input.txt") as file:
	timestamp = int(file.readline())
	for x in file.readline().split(','):
		if x == "x": continue

		val = int(x.strip())
		offset = val - timestamp % val

		if bus == None:
			bus = val

		elif offset < (bus - timestamp % bus):
			bus = val
	
	print(bus * (bus - timestamp % bus))