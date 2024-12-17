const input = Deno.readTextFileSync("./input.txt");

let registerA = parseInt(/Register A: (\d+)/.exec(input)![1]);
let registerB = parseInt(/Register B: (\d+)/.exec(input)![1]);
let registerC = parseInt(/Register C: (\d+)/.exec(input)![1]);

const program = /Program: (\d.+)/
  .exec(input)![1]
  .split(",")
  .map((op) => parseInt(op));

let instructionPointer = 0;
const outputs: number[] = [];

function combo(operand: number) {
  if (operand <= 3) return operand;
  if (operand === 4) return registerA;
  if (operand === 5) return registerB;
  if (operand === 6) return registerC;
  throw new Error("unreachable combo operand used");
}

function adv(operand: number) {
  const comboOperand = combo(operand);
  registerA = Math.trunc(registerA / 2 ** comboOperand);
}

function bxl(operand: number) {
  registerB = operand ^ registerB;
}

function bst(operand: number) {
  const comboOperand = combo(operand);
  registerB = comboOperand % 8;
}

function jnz(operand: number) {
  if (registerA == 0) return;
  instructionPointer = operand - 2;
}

function bxc(_operand: number) {
  registerB = registerB ^ registerC;
}

function out(operand: number) {
  const comboOperand = combo(operand);
  outputs.push(comboOperand % 8);
}

function bdv(operand: number) {
  const comboOperand = combo(operand);
  registerB = Math.trunc(registerA / 2 ** comboOperand);
}

function cdv(operand: number) {
  const comboOperand = combo(operand);
  registerC = Math.trunc(registerA / 2 ** comboOperand);
}

const instructions = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];

while (instructionPointer < program.length) {
  const opCode = program[instructionPointer];
  const operand = program[instructionPointer + 1];

  instructions[opCode](operand);

  instructionPointer += 2;
}

console.log(outputs.join());
