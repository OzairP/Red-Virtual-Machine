import { ShiftingDataView } from '../Util/ShiftingDataView'
import { Heap } from './Heap'
import { Instruction } from './Instruction'
import { UniqueAddress } from './UniqueAddress'

export class VirtualMachine {
	public register = {
		ACCUMULATOR_A: new Uint8Array(1),
		ACCUMULATOR_B: new Uint8Array(1),
		C: new Uint16Array(1),
		INDEX_X: new Uint8Array(1),
		INDEX_Y: new Uint8Array(1),
		INSTRUCTION_POINTER: new Uint16Array(
			UniqueAddress.DEFAULT_INSTRUCTION_POINTER
		),
		STACK_POINTER: new Uint16Array(1)
	}

	public heap: Heap

	private interval?: NodeJS.Timeout

	constructor(memoryByteSize: number) {
		this.heap = new Heap(new ArrayBuffer(memoryByteSize))
	}

	/**
	 * Load instructions into the machine. Flag instructions that head the
	 * instructions are processed first. Once the instruction set has ran out
	 * of flag instructions, the rest of the instructions are loaded into memory
	 */
	public loadInstructions(buffer: Buffer) {
		const instructions = new ShiftingDataView(buffer)

		// Process flags
		while (
			instructions.peekUint8() >=
			Instruction.__INITIAL_INSTRUCTION_POINTER
		) {
			this.processFlag(instructions)
		}

		// Copy rest of instructions to the instruction stack
		this.heap.copyWithin(
			instructions.rest(),
			this.register.INSTRUCTION_POINTER[0]
		)
	}

	public start() {
		this.interval = setInterval(this.tick.bind(this), 1)
	}

	public pause() {
		this.interval && clearInterval(this.interval)
	}

	public tick() {
		// Tick the machine
	}

	/**
	 * Process the next flag from the head of instruction set
	 */
	private processFlag(instructions: ShiftingDataView) {
		const instruction: Instruction = instructions.getUint8()
		switch (instruction) {
			case Instruction.__INITIAL_INSTRUCTION_POINTER: {
				this.register.INSTRUCTION_POINTER[0] = instructions.getUint16()
				break
			}

			default:
				throw new Error(`Unknown instruction ${instruction}`)
		}
	}
}

export { Instruction } from './Instruction'
export { UniqueAddress } from './UniqueAddress'
