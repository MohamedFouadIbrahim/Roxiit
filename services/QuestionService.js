import { GET, POST } from '../utils/Network';

export const GetQuestionById = (Id, onSuccess, onFailure) => {
    return GET(`Question?questionId=${Id}`, res => {
        onSuccess && onSuccess(res)
    }, err => {
		onFailure && onFailure(err)
    })
}

export const AskQuestion = (data, onSuccess, onFailure) => {
    return POST('Question', data, res => {
		onSuccess && onSuccess(res)
    }, err => {
		onFailure && onFailure(err)
    })
}

export const AnswerQuestion = (data, onSuccess, onFailure) => {
    return POST('Question/Answer', data, res => {
		onSuccess && onSuccess(res)
    }, err => {
		onFailure && onFailure(err)
    })
}

export const ProductQuestions = (ProductId, onSuccess, onFailure) => {
  return GET(`Product/FD?Id=${ProductId}`, res => {
      onSuccess && onSuccess(res)
  }, err => {
  onFailure && onFailure(err)
  })
}

