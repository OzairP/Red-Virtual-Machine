import { readFileSync } from 'fs'
import { HeapMetaAddress } from './HeapMetaAddress'
import { Instructions } from './instructions'

const heap = new DataView(new ArrayBuffer(16 ** 4))
const [, , instructionFile] = process.argv
// read ascii file and convert it into a hex buffer
const hexString = readFileSync(instructionFile, { encoding: 'ascii'}).replace(/[^0-9A-F]/g, '')
const instructionBuffer = Buffer.from(hexString, 'hex')
const instructions = new DataView(instructionBuffer.buffer.slice(instructionBuffer.byteOffset, instructionBuffer.byteOffset + instructionBuffer.byteLength))
let instructionOffset = 0

// Process flags
while (
	instructions.getUint8(instructionOffset) >=
	Instructions.FLAG_INSTRUCTION_ADDRESS
) {
	const instruction: Instructions = instructions.getUint8(instructionOffset)
	instructionOffset++
	switch (instruction) {
		case Instructions.FLAG_INSTRUCTION_ADDRESS: {
			const address = instructions.getUint16(instructionOffset)
			instructionOffset += 2
			heap.setUint16(HeapMetaAddress.INSTRUCTION_STACK, address)
			break
		}

		default:
			throw new Error(`Unknown instruction ${instruction}`)
	}
}

// Copy rest of instructions to the instruction stack
// TODO: use ArrayBuffer.copyWithin
let nextInstructionAddress = heap.getUint16(HeapMetaAddress.INSTRUCTION_STACK)
for (let i = instructionOffset; i < instructions.byteLength; i++) {
	heap.setUint8(nextInstructionAddress, instructions.getUint8(i))
	nextInstructionAddress++
}

console.log(
	heap.getUint16(HeapMetaAddress.INSTRUCTION_STACK),
	heap.getUint8(heap.getUint16(HeapMetaAddress.INSTRUCTION_STACK)),
	heap.getUint8(heap.getUint16(HeapMetaAddress.INSTRUCTION_STACK) + 1)
)
