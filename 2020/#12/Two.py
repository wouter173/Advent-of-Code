ship = [0,0]
waypoint = [10,1]

directions = ["N", "E", "S", "W"]
direction_map = {
	"90": 1,
	"180": 2,
	"270": 3,
}
direction = 1

def command(direc, val):
	global x
	global y

	if direc == "N":
		waypoint[1] += val
	
	elif direc == "S":
		waypoint[1] -= val
	
	elif direc == "E":
		waypoint[0] += val
	
	elif direc == "W":
		waypoint[0] -= val


def rotate(direc):
	x = waypoint[0]
	y = waypoint[1]

	if x < 0:
		

	past = waypoint.copy() 

	waypoint[0] = past[1]
	waypoint[1] = past[0]

with open('input.txt') as file:
	lines = [x.strip() for x in file.readlines()]

	for line in lines:
		cmd = line[:1]
		value = int(line[1:])

		if cmd in directions:
			command(cmd, value)
		
		elif cmd == "F":
			ship[0] += waypoint[0] * value
			ship[1] += waypoint[1] * value
		
		elif cmd == "L" or cmd == "R":			
			print(waypoint)
			rotate(cmd)
			print(waypoint)
			

	print(abs(ship[0]) + abs(ship[1]))