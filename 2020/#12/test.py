from operator import add, sub
dirs = []
with open("input.txt") as file:
    for line in file.readlines():
        line = line.rstrip()
        dirs.append((line[:1], int(line[1:])))
# q1 
def turn(dir, curr_face, trans):
    if dir == "R":
        return trans[curr_face][0]
    elif dir == "L":
        return trans[curr_face][1]

pos = [0,0]
trans = {
    "E" : ("S", "N"),
    "N" : ("E", "W"),
    "S" : ("W", "E"),
    "W" : ("N", "S")
}
key = {
    "N" : add,
    "S" : sub, 
    "E" : add,
    "W" : sub
}
p = {
    "N" : 1,
    "S" : 1,
    "E" : 0,
    "W" : 0
}
curr_face = "E"

for val in dirs:
    if val[0] == "F":
        print(curr_face, val[1])
        op = key[curr_face]
        pval = p[curr_face]
        pos[pval] = op(pos[pval], val[1]) 

    elif val[0] == "N":
        pos[1] += val[1]
    
    elif val[0] == "S":
        pos[1] -= val[1]
    
    elif val[0] == "E":
        pos[0] += val[1] 
    
    elif val[0] == "W":
        pos[0] -= val[1]
    
    elif val[0] == "R" or val[0] == "L":
        deg = val[1]
        while deg > 0:
            curr_face = turn(val[0], curr_face, trans)
            deg -= 90 

print(f"The Manhattan distance for q1 = {abs(pos[0]) + abs(pos[1])}")


# q2 
def rotate(dir, wp, trans, deg, p):
    x = wp[0]
    y = wp[1]
    degree = deg 

    if x < 0:
        face_x = "W"
    else:
        face_x = "E"

    if y < 0:
        face_y = "S"
    else:
        face_y = "N"

    while degree > 0:
        face_x = turn(dir, face_x, trans)
        face_y = turn(dir, face_y, trans)

        degree -= 90 
 
    if face_x == "S" or face_x == "W":
        wp[0] = abs(wp[0]) * -1 
    else:
        wp[0] = abs(wp[0])

    if face_y == "S" or face_y == "W":
        wp[1] = abs(wp[1]) * -1 
    else:
        wp[1] = abs(wp[1])
    
    prev_x = wp[0]
    prev_y = wp[1]

    # p[face] gives correct new position (0 or 1)
    wp[p[face_x]] = prev_x
    wp[p[face_y]] = prev_y

    return wp 
    
    
wp = [10, 1]          # wp stands for waypoint (see AOC website) 
curr_pos = [0,0]

for val in dirs:
    if val[0] == "F":
        curr_pos[0]  += (val[1] * wp[0])
        curr_pos[1]  += (val[1] * wp[1])

    elif val[0] == "N":
        wp[1] += val[1] 
    
    elif val[0] == "S":
        wp[1] -= val[1]

    elif val[0] == "E":
        wp[0] += val[1]
    
    elif val[0] == "W":
        wp[0] -= val[1]

    elif val[0] == "R" or val[0] == "L":
        wp = rotate(val[0], wp, trans, val[1], p)
      

print(f"The Manhattan distance for q2 = {abs(curr_pos[0]) + abs(curr_pos[1])}")