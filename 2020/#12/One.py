x = 0
y = 0

directions = ["N", "E", "S", "W"]
direction_map = {
	"0": 0,
	"90": 1,
	"180": 2,
	"270": 3,
	"360": 4,
	"450": 5,
}
direction = 1

def command(direc, val):
	global x
	global y

	if direc == "N":
		y += val
	
	elif direc == "S":
		y -= val
	
	elif direc == "E":
		x += val
	
	elif direc == "W":
		x -= val


with open('input.txt') as file:
	lines = [x.strip() for x in file.readlines()]

	for line in lines:
		cmd = line[:1]
		value = int(line[1:])

		if cmd in directions:
			command(cmd, value)
		
		elif cmd == "F":
			command(directions[direction], value)
		
		elif cmd == "L":
			direction = (direction - direction_map[str(value)] + 4) % 4
		
		elif cmd == "R":
			direction = abs(direction + direction_map[str(value)]) % 4

	print(abs(x) + abs(y))