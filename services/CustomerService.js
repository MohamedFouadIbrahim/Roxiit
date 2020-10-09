import { GET, POST, DELETE, IMG } from '../utils/Network';

export const GetPersonalInfo = (onSucess, onFailur) => {
    GET('Customer/PersonalInfo', res => {
        onSucess && onSucess(res)
    }, err => {
        onFailur && onFailur(err)
    })
}

export const GetHome = (onSucess, onFailur) => {
    GET('Customer/Home', res => {
        onSucess && onSucess(res)
    }, err => {
        onFailur && onFailur(err)
    })
}

export const PostPersonalInfo = (data, onSucess, onFailur) => {
    POST('Customer/PersonalInfo', data, res => {
        onSucess && onSucess(res)
    }, err => {
        onFailur && onFailur(err)
    })
}

export const SetLanguage = (Id, onSucess, onFailur) => {
    POST(`Customer/Language?language=${Id}`, {}, res => {
        onSucess && onSucess(res)
    }, err => {
        onFailur && onFailur(err)
    })
}

export const SetCountry = (Id, onSucess, onFailur) => {
    POST(`Customer/Country?countryId=${Id}`, {}, res => {
        onSucess && onSucess(res)
    }, err => {
        onFailur && onFailur(err)
    })
}
export const GetGenderStatus = (langId, onSuccess, onFailure) => {
    return GET(`Gender/Simple${langId ? `languageId=${langId}` : ''}`, res => {
        onSuccess && onSuccess(res)
    }, err => {
        // Do something special if this request fails or ignore
        onFailure && onFailure(err)
    })
}

export const GetAdressForCustomer = (cutmoerId, onSucces, onFailure) => {
    GET(`Address/New?customerId=${cutmoerId}`, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}

export const GetAdress = (Id, onSucces, onFailure) => {
    GET(`Address?addressId=${Id}`, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}

export const AddEditAdress = (data, onSucces, onFailure) => {
    POST('Address', data, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}

export const DeleteAdress = (Id, onSucces, onFailure) => {
    DELETE(`Address?addressId=${Id}`, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}

export const SetDefault = (Id, onSucces, onFailure) => {
    POST(`Address/Default?addressId=${Id}`, {}, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}


export const ChangeCustomerImage = (image, onSuccess, onFailure, onUploadProgress) => {
    let formData = new FormData();

    formData.append('sc', {
        uri: image,
        name: `subStore_img_${+ new Date()}.jpg`,
        type: 'image/jpg'
    });
    return IMG(`Customer/Image`,
        formData,
        res => {
            onSuccess && onSuccess(res)
        }, err => {
            onFailure && onFailure(err)
        }, re => {
            onUploadProgress && onUploadProgress(re)
        })

}

export const SetTimeZone = (Id, onSucces, onFailure) => {
    POST(`Customer/Timezone?timezoneId=${Id}`, {}, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}

export const SetCurrency = (Id, onSucces, onFailure) => {
    POST(`Customer/Currency?currencyId=${Id}`, {}, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}

export const SetInterest = (data, onSucces, onFailure) => {
    POST(`Customer/Interest`, data, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}

export const GetInterest = (onSucces, onFailure) => {
    GET(`Customer/Interest`, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}

export const ChangeCustomerPassword = (id, password, onSuccess, onFailure) => {
    return POST(`Customer/ChangePassword`, {
        customerId: id,
        Password: password,
        PasswordConfirm: password,
    }, res => {
        onSuccess && onSuccess(res)
    }, err => {
        // Do something special if this request fails or ignore
        onFailure && onFailure(err)
    })
}

export const ChangeCustomerLanguage = (langId, onSucces, onFailure) => {
    POST(`Customer/Language?language=${langId}`, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}

export const GetCustomerCompleteProfile = (onSucces, onFailure) => {
    GET(`Customer/Profile`, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}

export const EditCustomerCompleteProfile = (data, onSucess, onFailur) => {
    POST('Customer/Profile', data, res => {
        onSucess && onSucess(res)
    }, err => {
        onFailur && onFailur(err)
    })
}

export const GetChat = (onSuccess, onFailure) => {
    GET(`Customer/Chats`, res => {
        onSuccess && onSuccess(res)
    }, err => {
        // Do something special if this request fails or ignore
        onFailure && onFailure(err)
    })
}

export const SendMsg = (data, onSuccess, onFailure) => {
    POST(`Customer/Chat`, data, res => {
        onSuccess && onSuccess(res)
    }, err => {
        // Do something special if this request fails or ignore
        onFailure && onFailure(err)
    })
}

export const SendFile = (customerId, file, onSuccess, onFailure, onUpoadFile) => {
    let formData = new FormData();

    formData.append('sc', {
        uri: file.uri,
        name: file.name,
        type: file.type
    });

    IMG(`Customer/Chat/File?customerId=${customerId}`, formData, (res) => {

        onSuccess && onSuccess(res)

    }, err => {

        onFailure && onFailure(err)

    }, (pro) => {

        onUpoadFile && onUpoadFile(pro)

    })
}

export const GetAppUrl = (onSucces, onFailure) => {
    GET('AppUrl', res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}


export const TestNotifcationForUsers = (onSuccess, onFailure) => {
    POST(`Customer/notification/test`, {}, res => {
        onSuccess && onSuccess(res)
    }, err => {
        // Do something special if this request fails or ignore
        onFailure && onFailure(err)
    })
}

export const GetAdressForCustomerWithLocation = (cutmoerId, latitude, longitude, onSucces, onFailure) => {
    const d = {
        cutmoerId, latitude, longitude
    }
    GET(`Address/New?customerId=${cutmoerId}&lat=${latitude}&lng=${longitude}`, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}

export const RedeemNow = (Code, onSuccess, onFailure) => {
    POST(`Customer/redeem`, { Code }, res => {
        onSuccess && onSuccess(res)
    }, err => {
        // Do something special if this request fails or ignore
        onFailure && onFailure(err)
    })
}

export const GetAffiliate = (onSucces, onFailure) => {
    GET(`Customer/affiliate`, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}


export const GetMyCode = (onSucces, onFailure) => {
    GET(`Customer/MyCode`, res => {
        onSucces && onSucces(res)
    }, err => {
        onFailure && onFailure(err)
    })
}