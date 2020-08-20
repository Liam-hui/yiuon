import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text} from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';

export default function Password() {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      resizeMode='cover' 
      source={require('@/img/background-3.png')}
    > 
      <View style={styles.container}>
        <View style={styles.loginWrapper}>
          <Title style={styles.inputText}>登入編號</Title>
          <Text style={{fontSize:20,marginBottom: 16}}>LWY00812 </Text>
          <Title style={styles.inputText}>輸入舊密碼</Title>
          <FormInput
            // labelName='Password'
            // value={password}
            secureTextEntry={true}
            onChangeText={userPassword => setOldPassword(userPassword)}
          />
          <Title style={styles.inputText}>輸入新密碼</Title>
          <FormInput
            // labelName='Password'
            // value={password}
            secureTextEntry={true}
            onChangeText={userPassword => setNewPassword(userPassword)}
          />
          <Title style={styles.inputText}>再次輸入新密碼</Title>
          <FormInput
            // labelName='Password'
            // value={password}
            secureTextEntry={true}
            onChangeText={userPassword => setConfirmPassword(userPassword)}
          />
          <FormButton
            title='提交'
            addStyle={{marginTop:30}}
            modeValue='contained'
            labelStyle={{fontSize: 20}}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 18
  },
  loginWrapper:{
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