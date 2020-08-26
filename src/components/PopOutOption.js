import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions  } from 'react-native';
import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';

export default function PopOutOption({text,butTextTop,butTextBot,butFuncTop,butFuncBot}) {

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.text}>{text}</Text>
                <FormButton
                title={butTextTop}
                addStyle={{marginTop:18}}
                modeValue='contained'
                labelStyle={{fontSize: 20}}
                onPress={() => {
                    if(butFuncTop)butFuncTop();
                }}
                />
                <FormButton
                title={butTextBot}
                addStyle={{marginTop:20}}
                modeValue='contained'
                labelStyle={{fontSize: 20}}
                onPress={() => {
                    if(butFuncBot)butFuncBot();
                }}
                />
            </View>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:0,
        left:0,
        height:Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        // backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        backgroundColor: 'white',
        width: '86%',
        borderWidth: 1.5,
        borderColor: '#ad7e9f',
        borderRadius: 15,
        height: 200,
        marginBottom: 100,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    text: {
        color: '#ad7e9f',
        fontSize: 23,
    }
  
  });