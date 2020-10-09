export const ValidateQuantityIncrement = (current, max, callback) => {
	if (!max || current < max) {
		callback && callback(true)
	}
	else {
		callback && callback(false)
	}
}

export const ValidateQuantityDecrement = (current, min, callback) => {
	if (current > min) {
		callback && callback(true)
	}
	else {
		callback && callback(false)
	}
}