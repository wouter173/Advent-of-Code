import itertools

def iterate(lines):
	cp = lines.copy()

	for i in range(1, int(len(lines) - 1)):
		for j in range(1, int(len(lines[i]) - 1)):
			if lines[i][j] == ".": continue
			elif lines[i][j] == "L":
				adjacent = [
					[lines[i - 1][j - 1], lines[i - 1][j], lines[i - 1][j + 1]],
					[lines[i][j - 1], lines[i][j + 1]],
					[lines[i + 1][j - 1], lines[i + 1][j], lines[i + 1][j + 1]]
				]

				if list(itertools.chain.from_iterable(adjacent)).count("#") == 0:
					a = list(cp[i])
					a[j] = "#"
					cp[i] = "".join(a)


			elif lines[i][j] == "#":
				adjacent = [
					[lines[i - 1][j - 1], lines[i - 1][j], lines[i - 1][j + 1]],
					[lines[i][j - 1], lines[i][j + 1]],
					[lines[i + 1][j - 1], lines[i + 1][j], lines[i + 1][j + 1]]
				]

				if list(itertools.chain.from_iterable(adjacent)).count("#") >= 4:
					a = list(cp[i])
					a[j] = "L"
					cp[i] = "".join(a)

			


	# print(cp)
	return cp

with open('input.txt') as file:
	lines = [x.strip() for x in file.readlines()]
	lines.insert(0, "."*len(lines[0]))
	lines.append("."*len(lines[0]))

	for line in lines:
		lines[lines.index(line)] = "." + line + "."

	changing = True
	last = iterate(lines)

	while changing:
		out = iterate(last)

		if out == last:
			changing = False
			print("".join(list(itertools.chain.from_iterable(out))).count("#"))


		else:
			last = out
		
	
