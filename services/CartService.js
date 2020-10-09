import { POST, DELETE, GET } from '../utils/Network';
import { store } from '../App';
import { types } from '../redux/BadgesRedux';

export const GetCart = (address_id, payment_id, shipping_id, warehouse_id, voucher, onSuccess, onFailure) => {
	let query = ""

	if (address_id) {
		query = `${query}${query.length ? '&' : '?'}ShippingAddress=${address_id}`
	}

	if (payment_id) {
		query = `${query}${query.length ? '&' : '?'}PaymentMethod=${payment_id}`
	}

	if (shipping_id) {
		query = `${query}${query.length ? '&' : '?'}ShippingMethod=${shipping_id}`
	}

	if (voucher) {
		query = `${query}${query.length ? '&' : '?'}voucher=${voucher}`
	}

	if (warehouse_id) {
		query = `${query}${query.length ? '&' : '?'}WarehouseId=${warehouse_id}`
	}

	GET(`Cart/Index${query}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const AddCartItem = (id, quantity, options, onSuccess, onFailure) => {
	POST(`Cart`, {
		Id: 0,
		ProductId: id,
		Qty: quantity,
		Options: options
	}, res => {
		store.dispatch({ type: types.INCREMENT_CART_COUNT })

		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const DeleteCartItem = (id, onSuccess, onFailure) => {
	DELETE(`Cart?Id=${id}`, res => {
		store.dispatch({ type: types.DECREMENT_CART_COUNT })

		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const SetCartItemQuantity = (id, product_id, quantity, Options, onSuccess, onFailure) => {
	// id can be 0 to be ignored

	POST(`Cart`, {
		Id: id,
		ProductId: product_id,
		Qty: quantity,
		SkipIdAndMatchPerProduct: id > 0 ? false : true,
		Options: Options ? Options : []
	}, res => {
		if (quantity <= 0) {
			store.dispatch({ type: types.DECREMENT_CART_COUNT })
		}

		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const GetCartItem = (id, onSuccess, onFailure) => {
	GET(`Cart?Id=${id}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const GetCartEstShippingCost = (lat, lng, onSuccess, onFailure) => {
	GET(`Cart/EstShippingCost?lat=${lat}&lng=${lng}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}