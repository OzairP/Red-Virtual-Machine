export enum HeapMetaAddress {
	// Instruction stack is a stack of pointers that points to the current executing
	// instruction
	INSTRUCTION_STACK = 0xf000, // 0xF000 to 0xF400 that is 1024 bytes of memory
	INSTRUCTION_STACK_END = 0xf400, // since addresses are 16bits that allows for 512 stack frame pointers
	INSTRUCTION_STACK_POINTER = 0xf401
}
