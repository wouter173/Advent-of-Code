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
						
def adder_loop(lines, ans):

	for i in range(0, len(lines)):
		if not (i < preamble):
			
			ans_sum = 0
			values = []

			for j in range(i, len(lines)):
				values.append(lines[j])
				
				if ans_sum == ans:
					return values
				else:
					ans_sum += lines[j]
	
	return None


with open('input.txt') as file:
	lines = [int(x.strip()) for x in file.readlines()]

	ans = loop(lines)
	output = adder_loop(lines, ans)
	
	# fuck this fuck this fuck this fuck this fuck this fuck this fuck this fuck this fuck this fuck this fuck this fuck this fuck this
	print(max(output) + min(output))
	print(ans)
