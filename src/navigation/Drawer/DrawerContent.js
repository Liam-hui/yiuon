import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Drawer } from 'react-native-paper';
import { DrawerItem,DrawerContentScrollView,} from '@react-navigation/drawer';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import{ useSelector,useDispatch } from 'react-redux';
import actions from '@/store/ducks/actions';
import PopOutOption from '@/components/PopOutOption';
import { Services } from '@/services/';

export function DrawerContent(props) {
  const isDrawerOpen = useIsDrawerOpen();
  const dispatch = useDispatch();
  if(isDrawerOpen) dispatch(actions.drawer_turnon());
    else dispatch(actions.drawer_turnoff());

  const [logOutPop, setLogOutPop] = useState(false);

  return (
    // <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        {/* <Drawer.Section style={styles.up}> */}
          <DrawerItem
            icon={() => (
              <Image
              style={styles.icon}
              source={require('@/img/icon_communication.png')}
              />
            )}
            label="留言聊天"
            labelStyle={styles.label}
            onPress={() => props.navigation.navigate('Chat')}
          />
          <DrawerItem
            icon={() => (
              <Image
              style={styles.icon}
              source={require('@/img/icon_album.png')}
              />
            )}
            label="活動相簿"
            labelStyle={styles.label}
            onPress={() => props.navigation.navigate('Album')}
          />
          <DrawerItem
            icon={() => (
              <Image
              style={styles.icon}
              source={require('@/img/icon_news.png')}
              />
            )}
            label="中心消息"
            labelStyle={styles.label}
            onPress={() => props.navigation.navigate('News')}
          />
          <DrawerItem
            icon={() => (
              <Image
              style={styles.icon}
              source={require('@/img/icon_event.png')}
              />
            )}
            label="活動資訊"
            labelStyle={styles.label}
            onPress={() => props.navigation.navigate('Info')}
          />
          <DrawerItem
            icon={() => (
              <Image
              style={styles.icon}
              source={require('@/img/icon_contact.png')}
              />
            )}
            label="聯絡我們"
            labelStyle={styles.label}
            onPress={() => props.navigation.navigate('Contact')}
          />
          <DrawerItem
           icon={() => (
            <Image
            style={styles.icon}
            source={require('@/img/icon_setting.png')}
            />
          )}
            label="會員設定"
            labelStyle={styles.label}
            onPress={() => props.navigation.navigate('Setting')}
          />
        {/* </Drawer.Section> */}

        {/* <Drawer.Section style={styles.bottom}> */}
          <DrawerItem
              style={styles.bottom}
              icon={() => (
                <Image
                style={styles.icon}
                source={require('@/img/icon_logout.png')}
                />
              )}
              label="登出"
              labelStyle={styles.label}
              onPress={() => setLogOutPop(true)}
            />
            {logOutPop? (
              <PopOutOption
              text={'登出？'}
              butTextTop={'確定'}
              butTextBot={'返回'}
              butFuncTop={Services.logOut}
              butFuncBot={()=>setLogOutPop(false)}
              />
            ):(null)
            }
            
        {/* </Drawer.Section> */}
      </View>
    // </DrawerConten/tScrollView>
  );
}


const styles = StyleSheet.create({
  drawerContent: {
    // backgroundColor: 'red',
    marginTop: 10,
    height: '100%',
  },
  icon: {
    width: 40,
    height: 40,
  },
  label:{
    color: '#A24982',
    fontSize: 20,
  },
  up: {
    marginTop: -10,
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    
  },
});