import { store } from "../App";
import { Linking } from 'react-native';

export const getActiveRouteName = state => {
	if (!state) {
		return null;
	}

	const route = state.routes[state.index];

	if (route.state) {
		// Dive into nested navigators
		return getActiveRouteName(route.state);
	}

	return route.name;
}

export const getInitialRouteName = () => {
	const { Navigation_Bar_10_2 } = store.getState().runtime_config.runtime_config.screens
	return Navigation_Bar_10_2.Items.Value[0]
}

export const NavigateWithUrl = async (navigation) => {
	const url = await Linking.getInitialURL()

	if (url && url.includes('/p/')) { // Navigate To Product 
		const IdStart = url.indexOf('/p/') + 3

		//git the only part after /p/
		const IdPart = url.substring(IdStart, url.length)
		let IdEnd = IdPart.length;

		// check if it's contains / or ? => split it
		const nextSlashIndex = IdPart.indexOf('/')
		const nextQMarkIndex = IdPart.indexOf('?')
		if (nextSlashIndex != -1 && nextSlashIndex < IdEnd)
			IdEnd = nextSlashIndex
		if (nextQMarkIndex != -1 && nextQMarkIndex < IdEnd)
			IdEnd = nextQMarkIndex

		const Id = IdPart.substring(0, IdEnd)
		var NumberId = TryParseInt(Id, 0);
		if (NumberId > 0) {
			navigation.navigate('Product', {
				screen: 'Product',
				params: { Id },
			})
		}
	} else if (url && url.includes('/r/')) { // Navigate To Redeem
		const CodeStart = url.indexOf('/r/') + 3

		//git the only part after /p/
		const CodePart = url.substring(CodeStart, url.length)
		let CodeEnd = CodePart.length;

		// check if it's contains / or ? => split it
		const nextSlashIndex = CodePart.indexOf('/')
		const nextQMarkIndex = CodePart.indexOf('?')
		if (nextSlashIndex != -1 && nextSlashIndex < CodeEnd)
			CodeEnd = nextSlashIndex
		if (nextQMarkIndex != -1 && nextQMarkIndex < CodeEnd)
			CodeEnd = nextQMarkIndex

		const Code = CodePart.substring(0, CodeEnd)

		if (Code && Code.length > 0) {
			navigation.navigate('Profile', {
				screen: 'Profile',
				params: { Code },
			})
		}
	} else if (url && url.includes('/s/')) { // Navigate To Redeem
		const IdStart = url.indexOf('/s/') + 3

		//git the only part after /p/
		const IdPart = url.substring(IdStart, url.length)
		let IdEnd = IdPart.length;

		// check if it's contains / or ? => split it
		const nextSlashIndex = IdPart.indexOf('/')
		const nextQMarkIndex = IdPart.indexOf('?')
		if (nextSlashIndex != -1 && nextSlashIndex < IdEnd)
			IdEnd = nextSlashIndex
		if (nextQMarkIndex != -1 && nextQMarkIndex < IdEnd)
			IdEnd = nextQMarkIndex

		const Id = IdPart.substring(0, IdEnd)
		var NumberId = TryParseInt(Id, 0);
		if (NumberId > 0) {
			navigation.navigate('SubStores', {
				screen: 'SubStore',
				params: { Id },
			})
		}
	}
}

function TryParseInt(str, defaultValue) {
	var retValue = defaultValue;
	if (str !== null) {
		if (str.length > 0) {
			if (!isNaN(str)) {
				retValue = parseInt(str);
			}
		}
	}
	return retValue;
}