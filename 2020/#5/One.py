from decode import decode_code

with open('input.txt') as file:
	lines = [x.strip() for x in file.readlines()]

	highest = 0

	for line in lines:
		decoded = decode_code(line)
		if decoded[0] * 8 + decoded[1] > highest: 
			highest = decoded[0] * 8 + decoded[1]

	print(highest)
	file.close()