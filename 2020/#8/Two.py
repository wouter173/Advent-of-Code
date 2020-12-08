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

	for x in range(0, len(lines)):
		cp = lines.copy()
		if lines[x][:3] == "jmp":
			print(x)
			cp[x] = "nop" + lines[x][3:]
			if execute(cp):
				print(acc)
				print(lines)
			
	print(acc)

	# Somewhere in the middle the right value is printed
	# I have no idea what prints it or why its right, could be pure luck.
	# But I somehow got the right answer so I'm gonna stick with it
	