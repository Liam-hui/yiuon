import React from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { DrawerContent} from './DrawerContent';



import ChatStack from '@/navigation/ChatStack';
import InfoStack from '@/navigation/InfoStack';
import NewsStack from '@/navigation/NewsStack';
import AlbumStack from '@/navigation/AlbumStack';
import SettingStack from '@/navigation/SettingStack';
import ContactScreen from '@/pages/Contact';
import FrontPageScreen from '@/pages/FrontPage';



const Drawer = createDrawerNavigator();
 // screenOptions={{ gestureEnabled: false }}

export const DrawerNavigator = (navigation) => {
  return (
    <Drawer.Navigator initialRouteName='FrontPage'  drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="FrontPage" initialParams={{ headerShown: false }} component={FrontPageScreen} /> 
        <Drawer.Screen name="Chat" initialParams={{ title: "留言聊天" }}  component={ChatStack} />
        <Drawer.Screen name="Album" initialParams={{ title: "活動相簿" }} component={AlbumStack} />
        <Drawer.Screen name="News" initialParams={{ title: "中心消息" }} component={NewsStack} />
        <Drawer.Screen name="Info" initialParams={{ title: "活動資訊" }} component={InfoStack} />
        <Drawer.Screen name="Contact" initialParams={{ title: "聯絡我們" }} component={ContactScreen} />
        <Drawer.Screen name="Setting" initialParams={{ title: "會員設定" }} component={SettingStack} />
    </Drawer.Navigator>
  );
};

