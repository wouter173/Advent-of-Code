from itertools import chain

with open('input.txt') as file:
	lines = [x.strip() for x in file.readlines()]
	
	groups = []
	group = []

	for line in lines:
		if line == "":
			groups.append(group)
			group = []
			continue
		else:
			group.append(line)
		
	groups.append(group)

	counter = 0
	for group in groups:
		total = ""
		done = []

		for answers in group:
			total += answers
		
		for char in total:
			if total.count(char) == len(group) and char not in done:
				done.append(char)
				counter += 1

	print(counter)