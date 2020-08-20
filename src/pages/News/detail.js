import React, { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, View, ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";

function NewsDetail({route, navigation}) {

  const {item} = route.params;

  return (
     <ImageBackground
        style={{width: '100%', height: '100%'}}
        resizeMode='cover' 
        source={require('@/img/background-6.png')}
      >
      <SafeAreaView style={styles.container}>
        <Image 
                    source={require('@/img/icon_like-2.png')}
                    style={styles.photo}
                    resizeMode="cover"
        />
        <View style={styles.content}>
          <View style={styles.line}>
            <Text style={styles.title}>{item.title}</Text> 
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <Text style={styles.text}>{item.detail}</Text>
        </View>

      </SafeAreaView>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  photo: {
    width:'100%',
    height: 150,
    backgroundColor: 'red',
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    color: '#994278',
  },
  text: {
    fontSize: 18,
    color: '#5f5f5f',
  },
  line: {
    width: '100%',
    flex:0,
    flexDirection: 'row',
    // alignItems: 'baseline',
  },
  date: {
    position: 'absolute',
    right:0,
    bottom:0,
  },
});

export default NewsDetail;
