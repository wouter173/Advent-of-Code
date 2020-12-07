bags = {}
bags_true = []
# Random ass variable naming.

def bag(inp):
	name = inp.split("bags")[0].strip()
	children = [x.strip() for x in inp.split("contain")[1].split(",")]
	if children[0][0] == "n":
		children = [];
	else:
		children = [children[x][2:].split("bag")[0].strip() for x in range(0, len(children))]
		# I made this, I have no idea anymore.
		# It is magic to me now but it made sense 5 minutes ago.

	bags[name] = children

def search(name, original):
	if("shiny gold" in bags[name]):
		if (original not in bags_true):
				bags_true.append(original)

	for bag in bags[name]:
		search(bag, original)
	# I get that this function isn't built very well, but it works.
	# Actually this is the worst, a loop in a recursive function.

with open("input.txt") as file:
	rules = [x.strip() for x in file.readlines()]
	for rule in rules:
		bag(rule)

	for bag in bags:
		search(bag, bag)
	# now this is just pure shit, I'm looping over the same shit 2 times. but once again, it works.
	
	print(len(bags_true))