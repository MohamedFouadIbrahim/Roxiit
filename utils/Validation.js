import { parsePhoneNumberFromString as parseMobile } from 'libphonenumber-js/max'

export const isValidEmail = (email) => {
	return /(.+)@(.+){2,}\.(.+){2,}/.test(email);
}

export const isValidURL = (url) => {
	const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + //port
		'(\\?[;&amp;a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', 'i');
		
	return pattern.test(url)
}

export const isValidMobileNumber = (number_with_code) => {
	const parsedMobile = parseMobile(number_with_code)
	return parsedMobile ? parsedMobile.isValid() : false
}

export const isValidPassword = (password) => {
	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(password);
}

export const isValidSearchKeyword = (keyword) => {
	return keyword && keyword.length && keyword.replace(/\s/g, '').length;
}