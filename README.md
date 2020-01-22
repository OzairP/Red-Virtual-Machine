# Red Virtual Machine

This project was made for educational reasons.

## Memory

The initial heap size is 16kb which allows for memory addresses
to be 4 hexadecimal digits long.

### Memory Map

Addresses beyond `0xF000` are reserved for the machine however
they may be read/written although it is not recommended.

| Address             | Name                                | Description                                                                                                                                        |
| ------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0xF000` - `0xF800` | Stack frame pointer stack           | 256 bytes of memory reserved for a stack of pointers that point to an instruction. Since addresses are 2 bytes this stack only holds 128 pointers. |
| `0xF801`            | (Stack frame pointer) stack pointer | The pointer for the previous stack.                                                                                                                |

## Machine Code

### Argument Data Types

| Type       | Size   | Description       |
| ---------- | ------ | ----------------- |
| `MEM_ADDR` | 16bits | Address in memory |

### Generic Instructions

Generic instructions are regular instructions that tell the
machine to perform an operation.
Generic instructions range from `0x00 <= X < 0xF0`.

| Code   | Name      | Description | Argument(s) |
| ------ | --------- | ----------- | ----------- |
| `0x00` | Terminate |             |             |

### Meta Instructions

Meta instructions or flags are special instructions that
instruct the machine to change the way it operates.
Meta instructions range from `0xF0 <= X <= 0xFF`.

| Code   | Name                        | Description                                                                                                                                                                  | Argument(s) |
| ------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `0xF0` | INITIAL_INSTRUCTION_POINTER | Instructs the loader at which address to put the rest of the instruction set. This can only be used to head an instruction set. The stack pointer is automatically adjusted. | `MEM_ADDR`  |
