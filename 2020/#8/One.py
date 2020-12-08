acc = 0

def execute(instr):
	global acc;
	acc = 0
	done = []
	ptr = 0

	while ptr not in done:
		if len(instr) <= ptr:
			return True

		ist = instr[ptr].split(" ")[0]
		val = int(instr[ptr].split(" ")[1])
		done.append(ptr)


		if ist == "nop":
			ptr += 1
			continue
		elif ist == "jmp":
			ptr += val
			continue
		else:
			acc += val
			ptr += 1
			continue

	else:
		return False;

with open('input.txt') as file:
	lines = [x.strip() for x in file.readlines()]

	print (execute(lines))
	print(acc)
	