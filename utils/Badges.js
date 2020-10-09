import { types } from '../redux/BadgesRedux.js';
import { store } from '../App';

export const readBadgesFromResponseHeader = (response_header) => {
	const badges_header = response_header.badges
	
	if (badges_header) {

		const badges_header_JsonFormat = JSON.parse(response_header.badges)
		const badges_data = {
			Inbox: badges_header_JsonFormat.inboxOrdr,
			Notifications: badges_header_JsonFormat.notification,
			Support: badges_header_JsonFormat.inboxCustmr
		}

		store.dispatch({ type: types.SET_BADGES_DATA, badges_data })
	}
}