import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { DrawerItem,DrawerContentScrollView,} from '@react-navigation/drawer';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import{ useSelector,useDispatch } from 'react-redux';
import actions from '@/store/ducks/actions';

export function DrawerContent(props) {
  const isDrawerOpen = useIsDrawerOpen();
  const dispatch = useDispatch();
  if(isDrawerOpen) dispatch(actions.drawer_turnon());
    else dispatch(actions.drawer_turnoff());

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={styles.drawerContent}
      >
    
        {/* <Drawer.Section style={styles.drawerSection}> */}
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
        {/* <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section> */}
      </View>
    </DrawerContentScrollView>
  );
}


const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
  },
  label:{
    color: '#A24982',
    fontSize: 20,
  },
  drawerSection: {
    marginTop: 15,
  },
});