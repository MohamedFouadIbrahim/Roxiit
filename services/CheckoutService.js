import { GET, POST } from '../utils/Network';

export const GetSimpleAddresses = (onSuccess, onFailure) => {
	GET(`Address/ListSimple`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const GetPaymentAndShipping = (address_id, onSuccess, onFailure) => {
	GET(`Cart/PaymentShippingMethods?ShippingAddress=${address_id}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const GetCartPricing = (address_id, payment_id, shipping_id, voucher, onSuccess, onFailure) => {
	GET(`Cart/Pricing?ShippingAddress=${address_id}${payment_id ? `&PaymentMethod=${payment_id}` : ''}${shipping_id ? `&ShippingMethod=${shipping_id}` : ''}${voucher ? `&voucher=${voucher}` : ''}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const ValidateQRCode = (code, onSuccess, onFailure) => {
	if (code && code.startsWith("purchase_")) {
		GET(`Order/quick?qrCode=${code}`, res => {
			onSuccess && onSuccess(res)
		}, err => {
			if (onFailure) {
				return onFailure(err)
			}
		})
	}
	else {
		POST('QrCode/Validate', {
			code
		}, res => {
			onSuccess && onSuccess(res)
		}, err => {
			if (onFailure) {
				return onFailure(err)
			}
		})
	}
}

export const QuickOrderCommissionViaQRCode = (code, amount,onSuccess, onFailure) => {
	POST(`Order/commission/quick?qrCode=${code}&amount=${amount}`,null, res => {
		onSuccess && onSuccess(res)
	}, err => {
		if (onFailure) {
		return onFailure(err)
		}
	})
}