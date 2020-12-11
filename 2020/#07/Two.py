bags = {}
counter = 0
# Random ass variable naming.

def bag(inp):
	name = inp.split("bags")[0].strip()
	children = [x.strip() for x in inp.split("contain")[1].split(",")]
	if children[0][0] == "n":
		children = [];
	else:
		children = [[int(children[x][:2]), children[x][2:].split("bag")[0].strip()] for x in range(0, len(children))]
		# Still magic

	bags[name] = children


def search(name, count):
	global counter
	
	for bag in bags[name]:
		counter += count * bag[0]
		search(bag[1], count * bag[0])
		# It took me about 3 hours to realise I have to multiply the count instead of add to the count smh.
	


with open("input.txt") as file:
	rules = [x.strip() for x in file.readlines()]
	for rule in rules:
		bag(rule)

	search("shiny gold", 1)
	#this is more efficient than part one smh.

	print(counter)