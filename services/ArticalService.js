import { POST, DELETE, GET } from '../utils/Network';

export const GetArtical = (id, onSuccess, onFailure) => {
	GET(`Article?Id=${id}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		onFailure && onFailure(err)
	})
}

export const ArticleLike = (id, onSuccess, onFailure) => {
	POST(`Article/Like?articleId=${id}`, {}, res => {
		onSuccess && onSuccess(res)
	}, err => {
		onFailure && onFailure(err)
	})
}

export const ArticleRemoveLike = (id, onSuccess, onFailure) => {
	POST(`Article/RemoveLike?articleId=${id}`, {}, res => {
		onSuccess && onSuccess(res)
	}, err => {
		onFailure && onFailure(err)
	})
}