import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

export const PickImage = async (func,cancel_func,the_type) => {
    let type = ImagePicker.MediaTypeOptions.Images;
    // if (the_type=='photo') type = ImagePicker.MediaTypeOptions.Images;
    if (the_type=='video') type = ImagePicker.MediaTypeOptions.Videos,
    getPermissionAsync();
    try {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: type,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });
        if (!result.cancelled) {
            func(result.uri);
            // console.log(result);
        }
        else {
          if(cancel_func)cancel_func();
          // console.log('cancel');
        }

        console.log(result);
    } catch (E) {
        console.log(E);
    }
};