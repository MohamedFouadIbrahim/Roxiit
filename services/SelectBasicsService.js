import { GET } from '../utils/Network';

export const GetSelectBasics = (onSuccess, onFailure) => {
	GET(`Public/LangsCountries`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}