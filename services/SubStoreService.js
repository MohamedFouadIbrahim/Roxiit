import { GET, POST, IMG } from '../utils/Network';

export const GetSubStore = (id, onSuccess, onFailure) => {
    GET(`SubStore/Details?subStoreId=${id}`, res => {
        onSuccess && onSuccess(res)
    }, err => {
        // Do something special if this request fails or ignore
        onFailure && onFailure(err)
    })
}


export const LikeSubStore = (SubStoreId, onSuccess, onFailure) => {
    POST(`SubStore/Like?SubStoreId=${SubStoreId}`, {},  res => {
        onSuccess && onSuccess(res)
    }, err => {
        // Do something special if this request fails or ignore
        onFailure && onFailure(err)
    })
}

export const RemoveLikeSubStore = (SubStoreId, onSuccess, onFailure) => {
    POST(`SubStore/RemoveLike?SubStoreId=${SubStoreId}`, {}, res => {
        onSuccess && onSuccess(res)
    }, err => {
        // Do something special if this request fails or ignore
        onFailure && onFailure(err)
    })
}

export const AddSubStore = (data, onSuccess, onFailure) => {
    POST(`SubStore`, data, res => {
        onSuccess && onSuccess(res)
    }, err => {
        // Do something special if this request fails or ignore
        onFailure && onFailure(err)
    })
}

export const SubStoreDetails = (subStoreId, onSuccess, onFailure) => {
    GET(`SubStore/Details?subStoreId=${subStoreId}`, res => {
        onSuccess && onSuccess(res)
    }, err => {
        // Do something special if this request fails or ignore
        onFailure && onFailure(err)
    })
}


export const ChangeSubStoreImage = (image, onSuccess, onFailure, onUploadProgress) => {
    let formData = new FormData();

    formData.append('sc', {
        uri: image,
        name: `subStore_img_${+ new Date()}.jpg`,
        type: 'image/jpg'
    });
    return IMG(`SubStore/Image`,
        formData,
        res => {
            onSuccess && onSuccess(res)
        }, err => {
            onFailure && onFailure(err)
        }, re => {
            onUploadProgress && onUploadProgress(re)
        })

}
export const UpdateSubStoreLocation = (data, onSuccess, onFailure) => {
    
    POST(`SubStore/Location`, data, res => {
        onSuccess && onSuccess(res)
    }, err => {
        // Do something special if this request fails or ignore
        onFailure && onFailure(err)
    })
}