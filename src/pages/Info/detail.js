import React, { useState, useEffect } from 'react';
import {Image, SafeAreaView, View, ImageBackground, StyleSheet, Text, TouchableOpacity,TouchableWithoutFeedback } from "react-native";

const DATA = [
  {
    id: "1",
    title: "活動名稱",
    date: "23-27/10/16",
    time: "12:00-16:00"
  },
  {
    id: "2",
    title: "活動名稱活動名稱活動名稱活動名稱",
    date: "23-27/10/16",
    time: "12:00-16:00" 
  },
  {
    id: "3",
    title: "活動名稱",
    date: "23-27/10/16",
    time: "12:00-16:00"  
  },
  {
    id: "4",
    title: "活動名稱",
    date: "23-27/10/16",
    time: "12:00-16:00"  
  },
  {
    id: "5",
    title: "活動名稱",
    date: "23-27/10/16",
    time: "12:00-16:00"  
  },
];

function InfoDetail({route, navigation}) {
  const {item,like_pass,change_like} = route.params;
  const [like, setLike] = useState(like_pass);
  console.log(like);
  let like_url = require("@/img/icon_like-3.png") ;
  if(like) like_url = require("@/img/icon_like-2.png");

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
          <Text numberOfLines={1} style={styles.title}>{item.title}</Text> 
          <TouchableWithoutFeedback
            style={styles.icon}
            onPress={() => {
              change_like(item,like);
              setLike(!like);
            }}
           >
            <Image 
                      source={like_url}
                      style={styles.icon}
                      resizeMode="center"
            />
          </TouchableWithoutFeedback>
          </View>
          <Text style={styles.text}>活動日期： {item.date}</Text>
          <Text style={styles.text}>活動時間： {item.time}</Text>
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
    marginBottom: 20,
    color: '#994278',
  },
  text: {
    fontSize: 18,
    marginVertical: 2,
    color: '#5f5f5f',
  },
  line: {
    flex:0,
    flexDirection: 'row',
  },
  icon: {
    position: 'absolute',
    right:0,
    height: 18,
    width: 18,
    marginRight: 5,
  },
});

export default InfoDetail;
