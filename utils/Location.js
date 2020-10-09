import Permissions from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { Platform, Linking } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';

export const GetCurrentPosition = (onSuccess, onError) => {
    request(
        Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
    ).then(result => {
        Geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords

            onSuccess && onSuccess({
                latitude,
                longitude
            })
        }, err => {
            onError && onError(err)
        }, { enableHighAccuracy: false, timeout: 20000 })
    })
}

// broken
export const RequestPermision = (AcceptPermition, DeclinePermition) => {

    Permissions.request('location').then((value) => {
        if (value == 'authorized') {
            AcceptPermition && AcceptPermition()
        } else if (value == 'denied') {
            DeclinePermition && DeclinePermition()
        }
    }).catch((e) => {
        //  alert(e)
    })

}

export const GpsPermisiton = (haveApermission, haveNotPermissions, NEVER_ASK_AGAIN) => {

    Permissions.check('location').then(value => {
        switch (value) {
            case 'authorized':
                haveApermission && haveApermission()
            case 'denied':
                haveNotPermissions && haveNotPermissions()
            case 'restricted':
                //he Cant Get Permision For Ios (Never ask Me Again)
                Platform.OS == 'ios' ?
                    Permissions.canOpenSettings().then((IsCan) => {
                        if (IsCan) {
                            Permissions.openSettings().then(() => {
                                haveApermission && haveApermission()
                            })
                        } else {
                            RequestPermision(() => {
                                haveApermission && haveApermission()
                            }, () => {
                                haveNotPermissions && haveNotPermissions()
                            })
                        }
                    }) : NEVER_ASK_AGAIN && NEVER_ASK_AGAIN()
            case 'undetermined':
                RequestPermision(() => {
                    haveApermission && haveApermission()
                }, () => {
                    haveNotPermissions && haveNotPermissions()
                })
            default: return null
        }
    })


    // PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    //     .then((ok) => {
    //         if (!ok) {
    //             PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    //                 title: 'Gps Permmission',
    //                 message: 'Roxiit Want Your Permission To Acess Loaction ',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             }).then((granted) => {
    //                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                     haveApermission && haveApermission()
    //                 } else if (granted === PermissionsAndroid.RESULTS.DENIED) {

    //                 } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {

    //                 }
    //             })
    //         }
    //         else {
    //             haveApermission && haveApermission()
    //         }
    //     })
    //     .catch((e) => { alert(e) })

}

export const OpenGoogleMaps = (latitude, longitude) => {
    if (Platform.OS === 'ios') {
        Linking.openURL(`http://maps.apple.com/?ll=${latitude},${longitude}`)
    }
    else {
        Linking.openURL(`google.navigation:q=${latitude}+${longitude}`)
    }
}