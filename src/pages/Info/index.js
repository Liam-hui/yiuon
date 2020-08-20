import React, { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, View, ImageBackground, StyleSheet, Text, TouchableOpacity,TouchableWithoutFeedback,AsyncStorage } from "react-native";

const DATA = [
  {
    id: "1",
    title: "活動名稱",
    start_date: "2007-08-13T10:42:16.061Z",
    date_for_display: "23-27/10/07",
    time: "12:00-16:00",
    // liked: true,
    detail: "活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容",
  },
  {
    id: "2",
    title: "活動名稱活動名稱活動名稱活動名稱",
    start_date: "2020-08-13T10:42:16.061Z",
    date_for_display: "23-27/10/20",
    time: "12:00-16:00",
    // liked: true,
    detail: "活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容",
  },
  {
    id: "3",
    title: "活動名稱",
    start_date: "2040-08-13T10:42:16.061Z",
    date_for_display: "23-27/10/40",
    time: "12:00-16:00",
    detail: "活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容",
  },
  {
    id: "4",
    title: "活動名稱",
    start_date: "2000-08-13T10:42:16.061Z",
    date_for_display: "23-27/10/00",
    time: "12:00-16:00",
    detail: "活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容",
  },
  {
    id: "5",
    title: "活動名稱",
    start_date: "2019-08-13T10:42:16.061Z",
    date_for_display: "23-27/10/19",
    time: "12:00-16:00",
    detail: "活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容活動內容",
  },
];

function InfoScreen({navigation}) {
  const [like_stored, setLike] = useState([]);
  const [data_orig,setDataOrig] = useState([]);
  const [data,setData] = useState([]);

  useEffect(() => {
    const DATA_sort = DATA.slice(0);
    DATA_sort.sort(function(a,b){
      return new Date(b.start_date) - new Date(a.start_date);
    });
    setDataOrig(DATA_sort);
    setData(DATA_sort);
    _retrieveData();
    return () => {
      // _storeData();
    }
  }, [])

  useEffect(() => {
    _storeData();
  }, [like_stored]);

  const _storeData = async () => {
    // console.log(like_stored);
    const data_str = JSON.stringify(like_stored);
    try {
      await AsyncStorage.setItem('@activity_info', data_str);
    } catch (error) {
      // Error saving data
    }
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@activity_info');
      if (value !== null) {
        setLike(JSON.parse(value));
      }
     } catch (error) {
       // Error retrieving data
     }
  };

  const sort_by_like = () => {
    let data_ = JSON.parse(JSON.stringify(data_orig));
    for(i=0;i<like_stored.length;i++){
      if( data_.find(x => x.id === like_stored[i])) data_.find(x => x.id === like_stored[i]).liked = true;
    }
    data_.sort(function(x, y) {
      return (x.liked === y.liked)? 0 : x.liked? -1 : 1;
    });
    setData(data_);
    // console.log(data);
  }

  const change_like = (item,like) => {
    if(!like) setLike(like_stored.concat(item.id));
      else setLike(like_stored.filter(x => x != item.id));
  }

  const renderItem = ({item}) => {
    let like = false;
    let like_url = require("@/img/icon_like-3.png") ;
    if(like_stored.length>0 && like_stored.find(x => x === item.id)) { 
      like_url = require("@/img/icon_like-2.png");
      like = true;
    }
    if(like) like_url = require("@/img/icon_like-2.png");
    return(
      <TouchableOpacity 
        onPress={() => navigation.navigate('detail',  {item: item, like_pass:like, change_like:change_like})} 
        style={[styles.item]}
      >
        <Image 
          source={require('@/img/photo_test.jpg')}
          style={styles.image}
        />
        <View style={styles.content}>
          <View style={styles.line}>
            <Text numberOfLines={1} style={styles.title}>{item.title}</Text> 
            <TouchableWithoutFeedback
              onPress={() => {
                change_like(item,like);
                like=!like;
              }}
            >
              <Image 
                source={like_url}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.text}>活動日期： {item.date_for_display}</Text>
          <Text style={styles.text}>活動時間： {item.time}</Text>
        </View>
        
      </TouchableOpacity>
  )};

  return (
     <ImageBackground
        style={{width: '100%', height: '100%'}}
        resizeMode='cover' 
        source={require('@/img/background-6.png')}
      >
      <SafeAreaView style={styles.container}> 
        
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          sort_by_like();
          setLike(like_stored.concat(-1));
          setTimeout(() => {
            setLike(like_stored.filter(x => x != -1));
          }, 100);
        }}
      >
        <Text style={styles.buttonText}>以</Text>
        <Image 
          source={require('@/img/icon_like-1.png')}
          style={{width:20, height:20, marginHorizontal:4}}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>優先</Text>
      </TouchableOpacity>         
        
        <FlatList
          data={data}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id}
          extraData={data}
          style={{width:'100%'}}
        />

      </SafeAreaView>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width:'70%',
    height: 40,
    marginVertical: 10,
    backgroundColor: '#A24982',
    flex:0,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  item: {
    flex:1,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#eef4f7',
    marginBottom: 8,
    alignItems: 'center',
  },
  content: {
    width: '60%',
    marginLeft: 'auto',
    // backgroundColor: 'red',
  },
  title: {
    width: '90%',
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
    // alignItems: 'center',
  },
  image: {
    width: '35%',
    height: 90,
    resizeMode: 'cover',
    // backgroundColor: 'red'
  },
  icon: {
    position: 'absolute',
    right:0,
    height: 18,
    width: 18,
    marginRight: 5,
  },
});

export default InfoScreen;
