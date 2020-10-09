import Toast from 'react-native-simple-toast'
import { getTranslate } from 'react-localize-redux';
import { store } from '../App';

export const ShortToast = (message, translateMessage = true) => {
	const translate = getTranslate(store.getState().localize)
	Toast.show(translateMessage ? translate(message) : message)
}

export const LongToast = (message, translateMessage = true) => {
	const translate = getTranslate(store.getState().localize)
	//Toast.show(translateMessage ? translate(message) : message, Toast.LONG)
	//asem: even long toas make it short
	Toast.show(translateMessage ? translate(message) : message)
}