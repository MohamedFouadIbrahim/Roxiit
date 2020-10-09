import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { POST } from '../utils/Network';

const Internal_ReportException = (source, name, message, extra1, onSuccess, onFailure) => {
	try {
		//avoid any extra error
		POST(`Exception`, {
			source,
			name,
			message,
			exc1: extra1,
			exc2: navigation_logs,
			exc3: `${Platform.OS}/${DeviceInfo.getVersion()}/${DeviceInfo.getBuildNumber()}`
		}, res => {
			onSuccess && onSuccess(res)
		}, err => {
			onFailure && onFailure(err)
		})
	} catch{ }
}

export const ReportJSException = (name, message, is_fatal, onSuccess, onFailure) => {
	Internal_ReportException("JSException", name, message, `${is_fatal ? 'fatal' : null}`, onSuccess, onFailure)
}

export const ReportNativeException = (message, onSuccess, onFailure) => {
	Internal_ReportException("NativeException", '', message, null, onSuccess, onFailure)
}

export const ReportModuleException = (module_name, message, onSuccess, onFailure) => {
	Internal_ReportException(module_name, '', message, null, onSuccess, onFailure)
}