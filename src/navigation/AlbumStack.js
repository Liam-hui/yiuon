import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AlbumScreen from '@/pages/Album';
import AlbumOpenScreen from '@/pages/Album/AlbumOpen';
import AddPhotoScreen from '@/pages/Album/AddPhoto';
import App from '@/pages/Chat/audio_sample'

const Stack = createStackNavigator();

export default function AlbumStack() {
    return (
        <Stack.Navigator 
          initialRouteName='main' 
        >
          <Stack.Screen name='main' initialParams={{ title: "活動相簿" }}  component={AlbumScreen} />
          <Stack.Screen name='album-open' component={AlbumOpenScreen} />
          <Stack.Screen name='add-photo' initialParams={{ title: "提交照片" }}  component={AddPhotoScreen} />
          {/* <Stack.Screen name='add-member' options={{headerTitle: ''}} component={AddMemberScreen} /> */}
        </Stack.Navigator>
    );
  }