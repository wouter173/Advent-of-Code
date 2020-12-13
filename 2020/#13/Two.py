busses = []
done = False

with open("input-test.txt") as file:
	lines = file.readlines()[1].split(',');

	for x in range(0, len(lines)):
		if lines[x] == "x": continue
		busses.append({"id": int(lines[x]), "t": x})
	
	i = 1
	while done == False:
		found = []
		for bus in busses:
			if bus["id"] - (i % bus["id"]) == bus["t"]:
				found.append(bus)

		if i == 3417:
			print(found)
			print(busses)
		if found == busses:
			print("MATCH: " + str(i))
			done = True

		i += 1
