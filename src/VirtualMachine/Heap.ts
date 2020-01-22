export class Heap extends DataView {
	copyWithin(buffer: ArrayBuffer, byteOffset: number = 0) {
		const data = new Uint8Array(buffer)
		for (let i = 0; i <= data.byteLength; i++) {
			this.setUint8(byteOffset + i, data[i])
		}
	}
}
