counter = 0

with open("input.txt") as file:
	for line in file.readlines():
		[policy, password] = line.split(":")
		[positions, char] = policy.split()
		[pos1, pos2] = positions.split("-")
		[pos1, pos2] = [int(pos1), int(pos2)]

		if ((password[pos1] == char and password[pos2] != char) or (password[pos1] != char and password[pos2] == char)):
			counter += 1

	print(counter)