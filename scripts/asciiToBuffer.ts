import { readFileSync, writeFileSync } from 'fs'

const [, , input, output] = process.argv

if (!input || !output || input === '--help') {
	console.log(
		'Convert the contents of a ASCII file containing hexadecimal instructions to a raw binary file'
	)
	console.log('ts-node asciiToBuffer.ts <input file> <output file>')
	process.exit(0)
}

const data = readFileSync(input, { encoding: 'ascii' }).replace(
	/[^0-9A-F]/g,
	''
)
const buffer = Buffer.from(data, 'hex')

writeFileSync(output, buffer)
