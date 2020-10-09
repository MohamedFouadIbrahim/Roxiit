import { GET, POST, DELETE, IMG } from '../utils/Network';
import { formatDate, formatTime } from '../utils/Date';
export const GetProduct = (id, onSuccess, onFailure) => {
	GET(`Product/FD?Id=${id}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const GetProductCartInfo = (id, onSuccess, onFailure) => {
	GET(`Product/CartInfo?Id=${id}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const GetProductHtmlDescription = (data, onSuccess, onFailure) => {

	const {
		Id,
		languageId = null,
		seeMore = false,
		levelsSelectedProductOption = null
	} = data

	const langQuery = `${languageId ? `&languageId=${languageId}` : ''}`
	const seeMoreQuery = `${`&seeMore=${seeMore}`}`
	const levelsSelectedProductOptionQuery = `${levelsSelectedProductOption ? `&levelsSelectedProductOption=${levelsSelectedProductOption}` : ''}`

	GET(`Product/HtmlDescription?Id=${Id}${langQuery}${seeMoreQuery}${levelsSelectedProductOptionQuery}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const GetProductOptions = (id, onSuccess, onFailure) => {
	GET(`Product/Options?Id=${id}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const DeleteProduct = (id, onSuccess, onFailure) => {
	DELETE(`ProductMng?id=${id}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

/////////// Home /////////////

export const GetProductHome = (id, onSuccess, onFailure) => {
	GET(`ProductMng/Home?productId=${id}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const GetProductValidityExtend = (id, onSuccess, onFailure) => {
	GET(`Product/Validity/Extend?productId=${id}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const GetProductTypesList = (onSuccess, onFailure) => {
	GET(`ProductMng/TypesList`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}


export const GetProductStatusList = (onSuccess, onFailure) => {
	GET(`ProductMng/StatusList`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const GetProductVisibilityList = (onSuccess, onFailure) => {
	GET(`ProductMng/VisibilityList`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const EditProductStatus = (data, onSuccess, onFailure) => {
	POST(`ProductMng/Status?productId=${data.productId}&statusId=${data.statusId}`, {}, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const EditProductVisibility = (data, onSuccess, onFailure) => {
	POST(`ProductMng/Visibility?productId=${data.productId}&visibilityId=${data.visibilityId}`, {}, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

/////////// Pricing Progress ///////////

export const GetProductPricing = (Id, onSuccess, onFailure) => {
	GET(`ProductMng/Pricing?productId=${Id}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

// export const GetProductPricing = (Id, onSuccess, onFailure) => {
// 	POST(`ProductMng/Pricing?productId=${Id}`, {}, res => {
// 		onSuccess && onSuccess(res)
// 	}, err => {
// 		// Do something special if this request fails or ignore
// 		onFailure && onFailure(err)
// 	})
// }

export const EditProductPricing = (data, onSuccess, onFailure) => {
	POST(`ProductMng/Pricing`, data, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

////////////// Settings ////////////

export const GetProductSettings = (Id, onSuccess, onFailure) => {
	GET(`ProductMng/Settings?productId=${Id}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}
export const EditProductSettings = (data, onSuccess, onFailure) => {
	POST(`ProductMng/Settings`, data, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

///////////// Description ////////////

export const GetProductDescription = (Id, languageId, onSuccess, onFailure) => {
	GET(`ProductMng/Description?productId=${Id}&languageId=${languageId}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}
export const EditProductDescription = (data, onSuccess, onFailure) => {
	POST(`ProductMng/Description`, data, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const AddProduct = ({ Status, Visibility, Type, Name, ShortDescription, Description, Price, RealPrice, selectedCategories, languageId, Images }, onSuccess, onFailure, onUpoadImag) => {
	return POST(`ProductMng/New`, {
		Status,
		Visibility,
		Type,
		Name,
		ShortDescription,
		Description,
		Price,
		RealPrice,
		selectedCategories,
		languageId
	}, res => {
//POST /v1/ProductMng/Image/Many
		if (Images.length > 0) {

			let formData = new FormData();

			for (let i = 0; i < Images.length; i++) {
				formData.append('sc', {
					uri: Images[i].picker_image_Path,
					name: `brand_img_${+ new Date()}.jpg`,
					type: 'image/jpg'
				});
			}

			IMG(`ProductMng/Image/Many?productId=${res.data}`,
				formData,
				() => {
					onSuccess && onSuccess(res)
				},
				err => {
					onFailure && onFailure(err)
				}, (pro) => {
					onUpoadImag && onUpoadImag(pro)
				})

		} else {
			onSuccess && onSuccess(res)
		}

		// if (Image) {
		// 	let formData = new FormData();

		// 	formData.append('sc', {
		// 		uri: Image,
		// 		name: `brand_img_${+ new Date()}.jpg`,
		// 		type: 'image/jpg'
		// 	});

		// 	IMG(`ProductMng/Image?productId=${res.data}`,
		// 		formData,
		// 		() => {
		// 			onSuccess && onSuccess(res)
		// 		},
		// 		err => {
		// 			onFailure && onFailure(err)
		// 		}, (pro) => {
		// 			onUpoadImag && onUpoadImag(pro)
		// 		})
		// } else {
		// 	onSuccess && onSuccess(res)
		// }
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})


}

/////////// Media ////////////

export const AddProductMedia = ({ Image, productId }, onSuccess, onFailure, onProessUpload) => {
	let formData = new FormData();
	formData.append('sc', {
		uri: Image,
		name: `product_media_${+ new Date()}.jpg`,
		type: 'image/jpg'
	});

	return IMG(`ProductMng/Image?productId=${productId}`,
		formData,
		(res) => {
			onSuccess && onSuccess(res)
		},
		err => {
			onFailure && onFailure(err)
		}, (porss) => {
			onProessUpload && onProessUpload(porss)
		})
}

export const ReorderProductMedia = (productId, Ids, onSuccess, onFailure) => {
	return POST(`ProductMng/OrderImages?productId=${productId}`, Ids, res => {
		onSuccess && onSuccess(res)
	}, err => {
		onFailure && onFailure(res)
	})
}

export const DeleteProductMedia = ({ productId, imageId }, onSuccess, onFailure) => {
	return DELETE(`ProductMng/Image?productId=${productId}&imageId=${imageId}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}

export const ProductLike = (product_id, like_status, onSuccess, onFailure) => {
	POST(`Product/${like_status ? 'Like' : 'RemoveLike'}?productId=${product_id}`, {},
		res => {
			onSuccess && onSuccess(res)
		}, err => {
			// Do something special if this request fails or ignore
			onFailure && onFailure(err)
		})
}


export const GETRichTextDescription = (productId, languageId, onSuccess, onFailure) => {
	return GET(`Product/Description/RichText?productId=${productId}&languageId=${languageId}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		onFailure && onFailure(err)
	})
}

export const AddRichTextDescription = (data, onSuccess, onFailure) => {
	return POST(`Product/Description/RichText`, data, res => {
		onSuccess && onSuccess(res)
	}, err => {

		if (onFailure) {
			return onFailure(err)
		}

	})
}

export const GetSelectedProductMembers = (productId, selectedMemberIds, languageId, seeMore, onSuccess, onFailure) => {

	const langQuery = `${languageId ? `&languageId=${languageId}` : ''}`
	const seeMoreQuery = `${`&seeMore=${seeMore}`}`

	return GET(`Product/ProductOptions?Id=${productId}&levelsSelectedProductOption=${selectedMemberIds}${langQuery}${seeMoreQuery}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		onFailure && onFailure(err)
	})
}

export const GetStatusHistory = (productId, mainColor, onSuccess, onFailure) => {
	return GET(`Product/Status/History?productId=${productId}`, res => {

		if (onSuccess) {
			const formatted_data = res.data.Data.map(({ Status: { Id, Name }, Date, Note }) => ({
				Id,
				title: Name,
				description: `${formatDate(Date)} ${formatTime(Date)}`,
				dotColor: mainColor,
				circleColor: mainColor,
				Note
			}))

			onSuccess(res, formatted_data)
		}

		// onSuccess && onSuccess(res)
	}, err => {
		onFailure && onFailure(err)
	})
}