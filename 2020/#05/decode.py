def decode(inp, upper_char):
	upper = 2 ** len(inp) - 1
	lower = 0

	for i in range(0, len(inp)):
		if (inp[i] == upper_char):
			upper = upper - int(((upper - lower + 1)/ 2))
		else:
			lower = lower + int((upper - lower + 1) / 2)
	
	return upper


def decode_code(inp):

	row = decode(inp[:7], "F")
	column = decode(inp[7:], "L")
	
	return [row, column]