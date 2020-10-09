import { Linking } from 'react-native'
import { store } from '../App'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

export const parsePhone = (full_phone_number) => {
	const phoneNumber = parsePhoneNumberFromString(full_phone_number)
	const countries = store.getState().places.countries
	const default_country = store.getState().login.country_id

	let country = null
	let national = null

	if (phoneNumber) {
		const { country: countryCode, nationalNumber } = phoneNumber

		national = nationalNumber

		if (countryCode) {
			country = countries.find(item => item.ISOAlpha_2 === countryCode)

			if (!country) {
				// Default Jordan
				country = countries.find(item => item.Id === default_country)
			}
		}
		else {
			// Default Jordan
			country = countries.find(item => item.Id === default_country)
		}
	}
	else {
		// Default Jordan
		country = countries.find(item => item.Id === default_country)
	}

	return {
		NumberCountry: country,
		NationalNumber: national || (country ? full_phone_number.replace(country.PhoneCode, '') : null),
		NumberCountryTwo: country,
		NationalNumberTwo: national || (country ? full_phone_number.replace(country.PhoneCode, '') : null),
	}
}

export const callPhoneNumber = (phone_number) => {
	Linking.openURL(`tel:${phone_number}`)
}