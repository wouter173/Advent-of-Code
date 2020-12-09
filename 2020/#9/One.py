preamble = 25

def find(i, lines):
	for j in range(i - preamble, i):
		for n in range(i - preamble, i):
			if (lines[j] + lines[n] == lines[i]):
				return True

def loop(lines):
	final = []

	for i in range(0, len(lines)):
		if not (i < preamble):
			if not find(i, lines):
				return lines[i]
						
with open('input.txt') as file:
	lines = [int(x.strip()) for x in file.readlines()]

	print(loop(lines))
