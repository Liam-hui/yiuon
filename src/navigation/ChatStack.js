import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '@/pages/Chat';
import Chatroom from '@/pages/Chat/chatroom';
import AdminChatSettingScreen from '@/pages/Chat/admin-setting'
import AddMemberScreen from '@/pages/Chat/add-member'

const Stack = createStackNavigator();

export default function ChatStack() {
    return (
        <Stack.Navigator 
          initialRouteName='main' 
        >
          <Stack.Screen name='main' initialParams={{ title: "留言聊天" }} component={ChatScreen} />
          <Stack.Screen name='chatroom' initialParams={{ title: "活" }} component={Chatroom} />
          <Stack.Screen name='admin-setting' initialParams={{ title: "" }} component={AdminChatSettingScreen} />
          <Stack.Screen name='add-member'initialParams={{ title: "" }} component={AddMemberScreen} />
        </Stack.Navigator>
    );
  }