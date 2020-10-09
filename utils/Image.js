import ImagePicker from 'react-native-image-picker';
import ImagePickerCrop from 'react-native-image-crop-picker';
import { store } from '../App';

const options = {
	title: 'Select',
	cancelButtonTitle: 'Cancel',
	takePhotoButtonTitle: 'Camera',
	chooseFromLibraryButtonTitle: 'Library',
	storageOptions: {
		skipBackup: true,
		path: 'RoxiitAdmin',
	},
	noData: true,
	mediaType: 'photo',
	allowsEditing: true
};

const openImageInCropper = (image, callback) => {
	const {
		path,
		width: imageWidth,
		height: imageHeight,
	} = image

	let width, height

	if (Platform.OS === 'ios') {
		width = imageWidth
		height = imageHeight
	}

	ImagePickerCrop.openCropper({
		path,
		includeBase64: true,
		width,
		height,
		cropperToolbarWidgetColor: store.getState().runtime_config.runtime_config.colors.mainColor,
		cropperActiveWidgetColor: store.getState().runtime_config.runtime_config.colors.mainColor
	}).then(res => {
		callback && callback({
			...res,
			uri: getBase64FormattedUri(res),
			width: imageWidth,
			height: imageHeight
		})
	}).catch(() => {
		callback && callback(undefined)
	})
}

export const OpenCamera = (onSuccess, onFailure) => {
	ImagePickerCrop.openCamera({ cropping: false, includeBase64: true })
		.then(image => {
			openImageInCropper(image, onSuccess)
			// onSuccess && onSuccess({ ...images, uri: getBase64FormattedUri(images) })
		}).catch(() => {
			onFailure && onFailure()
		})
}


const getBase64FormattedUri = (response) => {
	return `data:${response.mime};base64,${response.data}`
}

const openImagesInCropper = (images, callback, current = 0, res = []) => {
	if (current === images.length) {
		callback && callback(res)
	}
	else {
		openImageInCropper(images[current], cropped_image_res => {
			openImagesInCropper(images, callback, current + 1, [...res, cropped_image_res])
		})
	}
}

export const OpenMultiSelectImagePicker = (onSuccess, onFailure) => {
	ImagePickerCrop.openPicker({ mediaType: 'photo', multiple: true }).then(images => {
		openImagesInCropper(images, cropped_images => {
			onSuccess && onSuccess(cropped_images)
		})
	})
}

export const showImagePicker = (onSuccess, onFailure) => {
	ImagePicker.showImagePicker(options, response => {
		if (response.didCancel) {
			onFailure && onFailure(null)
		} 
		else if (response.error) {
			onFailure && onFailure(response.error)
		} 
		else if (response.customButton) {
			// todo when needed
			onFailure && onFailure(response.customButton)
		} 
		else if (response) {
			onSuccess && onSuccess(response)
		}
		else {
			onFailure && onFailure(response)
		}
	})
}