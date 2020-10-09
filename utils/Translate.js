import { getTranslate } from 'react-localize-redux';
import { store } from '../App';

export const ExternalTranslate = (key) => {
	const translate = getTranslate(store.getState().localize)
	return translate(key)
}