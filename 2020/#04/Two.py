import re

with open('input.txt') as file:
	lines = [x.strip() for x in file.readlines()]

	passports = []
	passport = {}
	
	for line in lines:
		if line != "":
			for el in line.split(" "):
				passport[el.split(":")[0]] = el.split(":")[1]

		else:
			passports.append(passport)
			passport = {}

	valid = 0 # This one isn't 0 indexed?! idk... I have no idea but it works.
	# don't look at this down below, it's litteraly trash
	for p in passports:
		if(('byr' in p) and int(p['byr']) > 1919 and int(p['byr']) < 2003):
			if (('iyr' in p) and int(p['iyr']) > 2009 and int(p['iyr']) < 2021):
				if (('eyr' in p) and int(p['eyr']) > 2019 and int(p['eyr']) < 2031):
					if (('hgt' in p) and ((p['hgt'][-2:] == "cm" and int(p['hgt'].split("c")[0]) > 149 and int(p['hgt'].split("c")[0]) < 194) or (p['hgt'][-2:] == "in" and int(p['hgt'].split("i")[0]) > 58 and int(p['hgt'].split("i")[0]) < 77))):
						if (('hcl' in p) and (re.search("\#\w{6}", p['hcl']) != None)):
							if (('ecl' in p) and ((p['ecl'] == "amb") or (p['ecl'] == "blu") or (p['ecl'] == "brn") or (p['ecl'] == "gry") or (p['ecl'] == "grn") or (p['ecl'] == "hzl") or (p['ecl'] == "oth"))):
								if (('pid' in p) and (re.search("[0-9]{9}",p['pid']) != None)):
									print(p)
									valid += 1
	
	print(valid)
