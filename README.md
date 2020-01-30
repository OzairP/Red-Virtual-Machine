# Red Virtual Machine

This project was made for educational reasons.

## Memory

The initial heap size is 16kb which allows for memory addresses
to be 4 hexadecimal digits long.

### Register Map

| Register Name       | Alias | Size  | Description                             |
| ------------------- | ----- | ----- | --------------------------------------- |
| Accumulator A       | AA    | 8bit  | Accumulator A                           |
| Accumulator B       | AB    | 8bit  | Accumulator A                           |
| Register C          | C     | 16bit | General purpose                         |
| Index X             | IX    | 8bit  | General purpose index register          |
| Index Y             | IY    | 8bit  | General purpose index register          |
| Instruction Pointer | IP    | 16bit | Next instruction address to be executed |
| Stack pointer       | SP    | 16bit | Next empty pointer on the call stack    |

### Memory Map

| Address             | Name       | Description                             |
| ------------------- | ---------- | --------------------------------------- |
| `0xF000` - `0xFF00` | Call stack | 3840 bytes reserved for the call stack. |

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
