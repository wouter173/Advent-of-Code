const input = Deno.readTextFileSync("./input.txt");

function runProgram(program: bigint[], registerA: bigint, registerB: bigint, registerC: bigint) {
  let instructionPointer = 0n;
  const outputs: bigint[] = [];

  function combo(operand: bigint) {
    if (operand <= 3n) return operand;
    if (operand === 4n) return registerA;
    if (operand === 5n) return registerB;
    if (operand === 6n) return registerC;
    throw new Error("unreachable combo operand used");
  }

  function adv(operand: bigint) {
    const comboOperand = combo(operand);
    registerA = registerA / 2n ** comboOperand;
  }

  function bxl(operand: bigint) {
    registerB = operand ^ registerB;
  }

  function bst(operand: bigint) {
    const comboOperand = combo(operand);
    registerB = comboOperand % 8n;
  }

  function jnz(operand: bigint) {
    if (registerA == 0n) return;
    instructionPointer = operand - 2n;
  }

  function bxc(_operand: bigint) {
    registerB = registerB ^ registerC;
  }

  function out(operand: bigint) {
    const comboOperand = combo(operand);
    outputs.push(comboOperand % 8n);
  }

  function bdv(operand: bigint) {
    const comboOperand = combo(operand);
    registerB = registerA / 2n ** comboOperand;
  }

  function cdv(operand: bigint) {
    const comboOperand = combo(operand);
    registerC = registerA / 2n ** comboOperand;
  }

  const instructions = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];

  while (instructionPointer < program.length) {
    const opCode = program[Number(instructionPointer)];
    const operand = program[Number(instructionPointer) + 1];

    instructions[Number(opCode)](operand);

    instructionPointer += 2n;
  }

  return outputs;
}

let registerA = 0n;
const registerB = BigInt(parseInt(/Register B: (\d+)/.exec(input)![1]));
const registerC = BigInt(parseInt(/Register C: (\d+)/.exec(input)![1]));

const program = /Program: (\d.+)/
  .exec(input)![1]
  .split(",")
  .map((op) => BigInt(parseInt(op)));

console.log();
console.log(program.join("\t"));

let j = 0n;
while (true) {
  j++;
  // if (j > 65n) throw new Error("no solution found");

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

  for (let i = program.length - 1; i >= 0; i--) {
    if (i === 2) {
      console.log(output.join("\t"));
    }
    if (output.length < i || output[i] !== program[i]) {
      registerA += 8n ** BigInt(i);
      break;
    }
  }
}
