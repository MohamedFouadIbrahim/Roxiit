import { GET, POST, IMG } from '../utils/Network';
import { formatDate, formatTime } from '../utils/Date';

export const GetOrderItems = (orderId, onSuccess, onFailure) => {
	GET(`Order/Items?orderId=${orderId}`, res => { onSuccess && onSuccess(res) }, err => { onFailure && onFailure(err) })
}

export const GetOrderAddress = (orderId, onSuccess, onFailure) => {
	GET(`Order/Address?orderId=${orderId}`, res => { onSuccess && onSuccess(res) }, err => { onFailure && onFailure(err) })
}

export const CancelOrder = (orderId, onSuccess, onFailure) => {
	GET(`Order/Cancel?orderId=${orderId}`, res => { onSuccess && onSuccess(res) },
		err => {
			if (onFailure) {
				return onFailure(err)
			}
		})
}

export const GetOrderSummary = (orderId, onSuccess, onFailure) => {
	GET(`Order/Summary?orderId=${orderId}`, res => { onSuccess && onSuccess(res) }, err => { onFailure && onFailure(err) })
}

export const GetOrderSummaryDetails = (orderId, onSuccess, onFailure) => {
	GET(`Order/Summary/Details?orderId=${orderId}`, res => { onSuccess && onSuccess(res) }, err => { onFailure && onFailure(err) })
}

export const GetPaymentMethods = (onSuccess, onFailure) => {
	GET('PaymentMethods', res => { onSuccess && onSuccess(res) }, err => { onFailure && onFailure(err) })
}

export const GetOrderStatusList = (onSuccess, onFailure) => {
	GET('Order/StatusList', res => { onSuccess && onSuccess(res) }, err => { onFailure && onFailure(err) })
}


export const SendFile = (orderId, customerId, file, onSuccess, onFailure, onUpoadFile) => {
	let formData = new FormData();
	console.log(orderId, customerId)
	console.log(file)
	formData.append('sc', {
		uri: file.uri,
		name: file.name,
		type: file.type
	});

	IMG(`Order/Chat/File?orderId=${orderId}&customerId=${customerId}`, formData, (res) => {
		console.log('onSuccess')

		onSuccess && onSuccess(res)

	}, err => {
		console.log('onFailure')
		onFailure && onFailure(err)

	}, (pro) => {

		onUpoadFile && onUpoadFile(pro)

	})
}

export const GetOrderHistory = (id, color, onSuccess, onFailure) => {
	GET(`Order/History?orderId=${id}`, res => {
		if (onSuccess) {
			const formatted_data = res.data.Data.map(({ Id, Status: { Name }, CreatedUtc, User, Note
			}) => ({
				Id,
				title: Name,
				description: `${formatDate(CreatedUtc)} ${formatTime(CreatedUtc)}`,
				dotColor: color,
				circleColor: color,
				Note
			}))

			onSuccess(res, formatted_data)
		}
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const MakeOrder = (address_id, payment_id, shipping_id, warehouse_id, voucher, note, options, onSuccess, onFailure) => {
	POST(`Order/MakeOrder`, {
		courierId: shipping_id,
		paymentMethod: payment_id,
		addressId: address_id,
		WarehouseId: warehouse_id,
		voucher,
		note,
		Options: options,
	}, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const AddReview = (data, onSuccess, onFailure) => {

	POST(`Review`, data, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}


export const GetReview = (orderId, onSuccess, onFailure) => {

	GET(`Reviews?orderId=${orderId}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const GetChat = (orderId, onSuccess, onFailure) => {
	GET(`Order/Chats?orderId=${orderId}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const SendMsg = (data, onSuccess, onFailure) => {
	POST(`Order/Chat`, data, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const OneTouchOrder = (data, onSuccess, onFailure) => {
	return POST(`Order/OneTouch`, data, res => {
		onSuccess && onSuccess(res)
	}, err => {

		if (onFailure) {
			return onFailure(err)
		}

	})
}
