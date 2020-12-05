from decode import decode_code

with open('input.txt') as file:
	lines = [x.strip() for x in file.readlines()]

	done = []

	for line in lines:
		decoded = decode_code(line)
		ans = decoded[0] * 8 + decoded[1]
		done.append(ans)

	for i in range(0, int(len(done))):
		if done[i] + 1 not in done:
			print(done[i] + 1) 
			break
	
	file.close()