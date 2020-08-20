import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableHighlight} from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';
import { userService } from '@/services/user_service';


function handleLogin(number,password) {
  userService.login(number,password);
}

export default function LoginScreen({navigation}) {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      resizeMode='cover' 
      source={require('@/img/background-1.png')}
    > 
      <View style={styles.container}>
        <Text style={styles.titleText}>
          基督教聖約教會{"\n"}
          耀安長者鄰舍中心
        </Text>
        <Image
          style={{height:90}}
          resizeMode='contain'
          source={require('@/img/logo.png')}
        />
        <View style={styles.loginWrapper}>
          <Title style={styles.inputText}>登入編號</Title>
          <FormInput
            // labelName=''
            // value={email}
            autoCapitalize='none'
            onChangeText={userNumber => setNumber(userNumber)}
          />
          <Title style={styles.inputText}>密碼</Title>
          <FormInput
            // labelName='Password'
            // value={password}
            secureTextEntry={true}
            onChangeText={userPassword => setPassword(userPassword)}
          />
          <FormButton
            title='登入'
            addStyle={{marginTop:30}}
            modeValue='contained'
            labelStyle={{fontSize: 20}}
            onPress={() => {
              handleLogin(number,password);
              // console.log(navigation);
              // navigation.navigate('Main');
            }}
          />
        </View>
        <FormButton
            title='忘記密碼'
            addStyle={{marginTop:15}}
            modeValue='text'
            uppercase={false}
            labelStyle={{fontSize: 16}}
            onPress={() => {navigation.push('ForgetPassword')}}
          />
          <View style={styles.bottomButtonWrapper}>
            <TouchableHighlight 
              style={[styles.bottomButton,{left:0}]}
              onPress={() => {navigation.push('Contact')}}
            >
              <Image
                style={{height:'100%', width:'100%'}}
                source={require('@/img/Btn_contact.png')}
              />
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.bottomButton,{right:0}]}
              onPress={() => {navigation.push('News')}}
            >
              <Image
                style={{height:'100%', width:'100%'}}
                source={require('@/img/Btn_news.png')}
              />
            </TouchableHighlight>
          </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 18
  },
  loginWrapper:{
    marginTop:30,
    width: '80%',
  },
  inputText: {
    color: '#A24982',
    fontSize: 20,
    marginBottom: 2
  },
  bottomButtonWrapper: {
    // backgroundColor: 'red',
    marginTop: 10,
    width: '90%',
    height: 110
  },
  bottomButton: {
    height: '100%', 
    width: '47%',
    position: 'absolute',
    top: 0
    // right: 0
  }

});