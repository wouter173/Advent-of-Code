# gestolen van google
def mul_inv(a, b):
	b0 = b
	x0, x1 = 0, 1
	while a > 1:
		q = a // b
		a, b = b, a % b
		x0, x1 = x1 - q * x0, x0
	if x1 < 0:
		x1 += b0
	return x1

# gestolen van google
def crt(a, b, m, n):
	return ((a * n * mul_inv(n, m)) + (b * m * mul_inv(m, n))) % (m * n)

with open('input.txt') as file:
	data = file.read()

	a = 0
	m = 1

	for i, bus in enumerate(data.splitlines()[1].split(",")):
		if bus == "x": continue
		bus = int(bus)
		a = crt(a, bus-i, m, bus)
		m *= bus
	
	print(a)