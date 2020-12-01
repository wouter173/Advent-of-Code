with open("inputs.txt") as file:
	lines = file.readlines()
	for line in lines:
		for line2 in lines:
			for line3 in lines:
				if (int(line) + int(line2) + int(line3) == 2020):
					print(int(line) * int(line2) * int(line3))
		