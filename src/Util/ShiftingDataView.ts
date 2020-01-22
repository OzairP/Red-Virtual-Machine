export class ShiftingDataView {
	protected dataView: DataView

	protected byteOffset = 0

	constructor(buffer: Buffer)
	constructor(buffer: ArrayBuffer) {
		if (Buffer.isBuffer(buffer)) {
			this.dataView = new DataView(
				buffer.buffer.slice(
					buffer.byteOffset,
					buffer.byteOffset + buffer.byteLength
				)
			)
		} else {
			this.dataView = new DataView(buffer)
		}
	}

	public getUint8() {
		return this.dataView.getUint8(this.increment())
	}

	public getUint16() {
		return this.dataView.getUint16(this.increment(2))
	}

	public setUint8(byteOffset: number, data: number) {
		this.dataView.setUint8(byteOffset, data)
	}

	public setUint16(byteOffset: number, data: number) {
		this.dataView.setUint16(byteOffset, data)
	}

	public peekUint8() {
		return this.dataView.getUint8(this.getByteOffset())
	}

	public getByteOffset() {
		return this.byteOffset
	}

	public getByteLength() {
		return this.dataView.byteLength
	}

	public rest() {
		return this.dataView.buffer.slice(this.getByteOffset())
	}

	private increment(amount: number = 1) {
		this.byteOffset += amount
		return this.byteOffset - amount
	}
}
