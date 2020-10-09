import { POST } from '../utils/Network';

export const SetSelectedInterests = (data, onSuccess, onFailure) => {
	POST('Customer/Interest',
		data,
		res => {
			onSuccess && onSuccess(res)
		}, err => {
			// Do something special if this request fails or ignore
			onFailure && onFailure(err)
		})
}