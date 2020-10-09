import { GET } from "../utils/Network"


export const readAllNotifications = (onSuccess, onFailure) => {
    GET('Notification/ReadAll', res => {
        onSuccess && onSuccess(res)
    }, err => {
        onFailure && onFailure(err)
    })
}

export const readNotification = (NotificationId, onSuccess, onFailure) => {
    GET(`Notification/Read?notificationId=${NotificationId}`, res => {
        onSuccess && onSuccess(res)
    }, err => { onFailure && onFailure(err) })
}