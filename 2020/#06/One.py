with open('input.txt') as file:
	lines = [x.strip() for x in file.readlines()]

	counter = 0
	yes = []

	for line in lines:
		if line != "":
			for char in line:
				if char not in yes:
					yes.append(char)
					counter += 1
		else:
			yes = []
			continue
			

	print(counter)