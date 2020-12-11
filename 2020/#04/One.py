with open('input.txt') as file:
	lines = [x.strip() for x in file.readlines()]

	passports = []
	passport = []
	
	for line in lines:
		if line != "":
			for el in line.split(" "):
				passport.append(el.split(":")[0])

		else:
			passports.append(passport)
			passport = []

	valid = 1 # It works, I dont know how or what. But somewhere something is 0 indexed or somn idk.
	for p in passports:
		if('byr' in p):
			if ('iyr' in p):
				if ('eyr' in p):
					if ('hgt' in p):
						if ('hcl' in p):
							if ('ecl' in p):
								if ('pid' in p):
									valid += 1
	
	print(valid)
