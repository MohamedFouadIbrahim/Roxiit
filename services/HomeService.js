import { GET } from '../utils/Network';

export const GetHome = (onSuccess, onFailure) => {
	GET(`Home`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}