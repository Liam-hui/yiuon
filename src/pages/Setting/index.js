import React, { useState, useEffect } from 'react';
import { Avatar } from 'react-native-paper';
import { Text, View, StyleSheet,ImageBackground,TouchableOpacity,Image,SafeAreaView,FlatList} from 'react-native';
import FormButton from '@/components/FormButton';
import {PickImage} from '@/components/PickImage';

function SettingScreen({navigation}) {
  const [message, setMessage] = useState('');
  const [icon, setIcon] = useState('https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png');

  useEffect(() => {
    setMessage('Setting page!');
  }, []);

  const code = 'LWY00812';

  return (
    <ImageBackground
        style={{width: '100%', height: '100%'}}
        resizeMode='cover' 
        source={require('@/img/background-5.png')}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.upper}>
          <Text style={{fontSize:19, marginBottom:8}}>李泳兒</Text>
          <Text style={{fontSize:17, marginBottom:30}}>會員編號：{code}</Text>
          <Avatar.Image size={160} source={{ uri: icon }} />
          {/* source={require(icon) */}
        </View>

        <View style={styles.wrapper}>
          <FormButton
            title='更改頭像'
            addStyle={{marginTop:60}}
            modeValue='contained'
            labelStyle={{fontSize: 20}}
            onPress = {() => {
              PickImage(setIcon);
            }}
          />
          <FormButton
            onPress={() => navigation.navigate('password')}
            title='更改密碼'
            addStyle={{marginTop:18}}
            modeValue='contained'
            labelStyle={{fontSize: 20}}
          />
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  upper:{
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height:'60%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
  wrapper:{
    width: '80%',
  },
});