counter = 0

with open("input.txt") as file:
	for line in file.readlines():
		[policy, password] = line.split(":")
		[minmax, char] = policy.split()
		[minval, maxval] = minmax.split("-")
		if ((password.count(char) > int(maxval) ) or (password.count(char) < int(minval))):
			continue
		else: counter += 1
	print(counter)