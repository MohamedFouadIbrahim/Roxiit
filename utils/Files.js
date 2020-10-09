import DocumentPicker from 'react-native-document-picker';

export const ChosseFile = async (onPickFile, fileTypes = []) => {

    try {
        const res = await DocumentPicker.pick({
            type: fileTypes && fileTypes.length ? fileTypes : [DocumentPicker.types.allFiles],
        });

        if (res) {
            onPickFile && onPickFile(res)
        }

    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
        } else {
            throw err;
        }
    }

}