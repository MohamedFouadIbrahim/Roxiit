import { getFCMToken } from '../utils/FCM';
import DeviceInfo from 'react-native-device-info'
import { POST } from '../utils/Network';
import { store } from '../App';

export const LoginUser = (data, onSuccess, onFailure) => {
	getFCMToken((fcmToken, didSucceed) => {
		DeviceInfo.getDeviceName().then(deviceName => {
			const body = {
				...data,
				fcm: fcmToken,
				devicemodel: DeviceInfo.getModel(),
				deviceBrand: DeviceInfo.getBrand(),
				deviceName,
				deviceID: DeviceInfo.getUniqueId(),
			}

			POST('Signin', body, res => {
				onSuccess && onSuccess(res)
			}, err => {
				if (onFailure) {
					return onFailure(err)
				}
			}, false)
		})
	})
}

export const LoginGuest = (onSuccess, onFailure) => {
	getFCMToken((fcmToken, didSucceed) => {
		DeviceInfo.getDeviceName().then(deviceName => {
			const body = {
				fcm: fcmToken,
				devicemodel: DeviceInfo.getModel(),
				deviceBrand: DeviceInfo.getBrand(),
				deviceName,
				deviceID: DeviceInfo.getUniqueId(),
				LanguageId: store.getState().walkthrough.selected_language,
				ShippingCountryId: store.getState().walkthrough.selected_country
			}

			POST('Guest', body, res => {
				onSuccess && onSuccess(res)
			}, err => {
				onFailure && onFailure(err)
			}, false)
		})
	})
}

export const LoginFacebook = (data, onSuccess, onFailure) => {
	getFCMToken((fcmToken, didSucceed) => {
		DeviceInfo.getDeviceName().then(deviceName => {
			const body = {
				...data,
				fcm: fcmToken,
				devicemodel: DeviceInfo.getModel(),
				deviceBrand: DeviceInfo.getBrand(),
				deviceName,
				deviceID: DeviceInfo.getUniqueId(),
				LanguageId: store.getState().walkthrough.selected_language,
				ShippingCountryId: store.getState().walkthrough.selected_country
			}

			POST('Signup/Facebook', body, res => {
				onSuccess && onSuccess(res)
			}, err => {
				onFailure && onFailure(err)
			}, false)
		})
	})
}

export const LoginGoogle = (data, onSuccess, onFailure) => {
	getFCMToken((fcmToken, didSucceed) => {
		DeviceInfo.getDeviceName().then(deviceName => {
			const body = {
				...data,
				fcm: fcmToken,
				devicemodel: DeviceInfo.getModel(),
				deviceBrand: DeviceInfo.getBrand(),
				deviceName,
				deviceID: DeviceInfo.getUniqueId(),
				LanguageId: store.getState().walkthrough.selected_language,
				ShippingCountryId: store.getState().walkthrough.selected_country
			}

			POST('Signup/GooglePlus', body, res => {
				onSuccess && onSuccess(res)
			}, err => {
				onFailure && onFailure(err)
			}, false)
		})
	})
}

export const SignupUser = (data, onSuccess, onFailure) => {
	getFCMToken((fcmToken, didSucceed) => {
		DeviceInfo.getDeviceName().then(deviceName => {
			const body = {
				...data,
				fcm: fcmToken,
				devicemodel: DeviceInfo.getModel(),
				deviceBrand: DeviceInfo.getBrand(),
				deviceName,
				deviceID: DeviceInfo.getUniqueId(),
				LanguageId: store.getState().walkthrough.selected_language,
				ShippingCountryId: store.getState().walkthrough.selected_country
			}

			POST('Signup', body, res => {
				onSuccess && onSuccess(res)
			}, err => {
				if (onFailure) {
					return onFailure(err)
				}
			}, false)
		})
	})
}

export const ForgetPasswod = (Email, onSuccess, onFailure) => {
	POST('Password/Forget', {
		AccountLogin: Email
	}, res => {
		onSuccess && onSuccess(res)
	}, err => {
		onFailure && onFailure(err)
		return true
	})
}

export const ValidateResetToken = (email, token, onSuccess, onFailure) => {
	POST('Password/ValidateResetToken', {
		AccountLogin: email,
		PasswordResetToken: token,
	}, res => {
		onSuccess && onSuccess(res)
	}, err => {
		onFailure && onFailure(err)
		return true
	})
}

export const PasswordReset = (email, token, password, onSuccess, onFailure) => {
	POST('Password/Reset', {
		PasswordResetToken: token,
		AccountLogin: email,
		Password: password,
		PasswordConfirmation: password
	}, res => {
		onSuccess && onSuccess(res)
	}, err => { onFailure && onFailure(err) })
}

export const SignupPhoneVerify = (customer_id, code, onSuccess, onFailure) => {
	POST('Signup/Phone/Verify', {
		CustomerId: customer_id,
		VerifyTokenToken: code,
	}, res => {
		onSuccess && onSuccess(res)
	}, err => {
		if (onFailure) {
			return onFailure(err)
		}
	})
}