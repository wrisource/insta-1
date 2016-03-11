export default {
    api : 'http://yourIpAddress:3000', // 'localhost' doesn't work on iOS simulator
    imagePicker : {
        cancelButtonTitle            : 'Cancel',
        takePhotoButtonTitle         : 'Take Photo...',
        chooseFromLibraryButtonTitle : 'Choose from Library...',
        cameraType                   : 'back',
        mediaType                    : 'photo',
        videoQuality                 : 'high',
        maxWidth                     : 1200,
        maxHeight                    : 1200,
        quality                      : 0.8,
        angle                        : 0,
        allowsEditing                : false,
        noData                       : false,
        storageOptions : {
            skipBackup : true,
            path       : 'images'
        }
    }
}