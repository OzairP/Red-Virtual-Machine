import { readFileSync } from 'fs'
import { UniqueAddress, VirtualMachine } from './VirtualMachine'

// 64kb of memory
const vm = new VirtualMachine(16 ** 4)
const [, , instructionFile] = process.argv
// read ascii file and convert it into a hex buffer
const hexString = readFileSync(instructionFile, { encoding: 'ascii' }).replace(
	/[^0-9A-F]/g,
	''
)
const instructionBuffer = Buffer.from(hexString, 'hex')

vm.loadInstructions(instructionBuffer)

console.log(
	vm.heap.getUint16(UniqueAddress.INSTRUCTION_STACK),
	vm.heap.getUint8(vm.heap.getUint16(UniqueAddress.INSTRUCTION_STACK)),
	vm.heap.getUint8(vm.heap.getUint16(UniqueAddress.INSTRUCTION_STACK) + 1)
)
