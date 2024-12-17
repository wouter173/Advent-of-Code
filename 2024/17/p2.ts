const input = Deno.readTextFileSync("./input.txt");

function runProgram(program: number[], registerA: number, registerB: number, registerC: number) {
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

  return outputs;
}

let registerA = 0;
const registerB = parseInt(/Register B: (\d+)/.exec(input)![1]);
const registerC = parseInt(/Register C: (\d+)/.exec(input)![1]);

const program = /Program: (\d.+)/
  .exec(input)![1]
  .split(",")
  .map((op) => parseInt(op));

console.log();
console.log(program.join("\t"));

let j = 0;
while (true) {
  j++;
  // if (j > 65) throw new Error("no solution found");

  const output = runProgram(program, registerA, registerB, registerC);

  if (output.length > program.length) {
    console.log(output.join(), program.join());
    throw new Error("program is too long");
  }

  // console.log(output.join(), registerA);
  if (output.join() === program.join()) {
    console.log(`${program} == ${output}`);
    console.log("found registerA:", registerA);
    break;
  }

  for (let i = 0; i < output.length; i++) {
    if (program.length - i - 1 === 2) {
      console.log(output.join("\t"));
    }
    if (output[program.length - i - 1] !== program[program.length - i - 1]) {
      registerA += 8 ** (program.length - i - 2);
      break;
    }
  }
}
