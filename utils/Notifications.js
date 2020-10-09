import { Linking } from 'react-native'
import { getInitialRouteName } from './Navigation';

export const processPressedNotification = (notification, navigation, is_root = true) => {
	const { _data } = notification

	if (_data) {
		const { type } = _data

		if (type === "open_url") {
			const { url } = _data
			Linking.openURL(url)
		}

		if (type === "navigation") {
			let { routeName } = _data
			const { params } = _data

			let parsedParams = params && params.length ? JSON.parse(params) : undefined

			if (routeName === "Home") {
				routeName = getInitialRouteName()
			}
			else if (routeName == 'Product' && parsedParams.Type && parsedParams.Type.Id) {
				routeName = 'MyProducts'
				parsedParams = {
					screen: 'MyProduct',
					params: {
						ProductId: parsedParams.Id
					},
				}
			}
			else if (routeName === "Product") {
				parsedParams = {
					screen: routeName,
					params: parsedParams,
				}
			}
			else if (routeName === "OrderChat") {
				routeName = 'Orders'
				parsedParams = {
					screen: 'OrderChat',
					params: parsedParams,
				}
			}

			else if (routeName == 'OrderTrackingHistory') {

				routeName = 'Orders'
				parsedParams = {
					screen: 'OrderHistory',
					params: {
						Id: parsedParams.Id
					},
				}

			}

			else if (routeName === "Order") {
				routeName = 'Orders'
				parsedParams = {
					screen: 'Order',
					params: parsedParams,
				}
			}
			if (is_root) {
				//timeout added to avoid navigator not mounted yet
				setTimeout(() => {
					try {
						// to avoid any exception if navigator not mounted yet
						navigation.current.navigate(routeName, parsedParams)
					} catch{ }
				}, 1500)
			}
			else {
				navigation.navigate(routeName, parsedParams)
			}
		}
	}
}