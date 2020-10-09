import { store } from "../App";
import { Platform, LogBox } from 'react-native';

export const hideVirtualizedListWarning = () => {
    LogBox.ignoreLogs([
        // Remove when issue resolved https://github.com/GeekyAnts/NativeBase/issues/2947
        'VirtualizedLists should never be nested',
        'Non-serializable values were found in the navigation state' ,// this is from upgrading React-navigation its just warn for best way to pass functions as a params so no worries about it 
    ])
}

export const getStatusBarStyle = () => {
    const { statusBarStyle, statusBarStyleIos } = store.getState().runtime_config.runtime_config.screens.Top_Header_10_2
    return Platform.OS === 'ios' ? statusBarStyleIos.Value : statusBarStyle.Value
}