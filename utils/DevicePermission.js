import { PERMISSIONS, check, request, openSettings } from 'react-native-permissions';
import { Platform } from 'react-native';

export const LocationPermission = (onSuccess, onFailuer) => {

    const PermissionName = Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    })

    check(PermissionName).then(result => {
        if (result != 'authorized') {
            request(PermissionName).then((value) => {
                if (value == 'authorized') {
                    onSuccess && onSuccess()
                }
            }).catch((e) => {
                onFailuer && onFailuer(e)
            })

        } else {
            onSuccess && onSuccess()
        }
    }).catch((e) => {
        onFailuer && onFailuer(e)
        openSettings().then(() => {
            LocationPermission(onSuccess)
        })
    })
}