import { GET } from '../utils/Network';

export const GetCategory = (id, onSuccess, onFailure) => {
	GET(`Category/Fd?Id=${id}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}