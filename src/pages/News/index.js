import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, ImageBackground, StyleSheet, Text, TouchableOpacity } from "react-native";

const DATA = [
  {
    id: "1",
    title: "消息名稱",
    date: "27/10/2016",
    content: "消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容"
  },
  {
    id: "2",
    title: "消息名稱",
    date: "27/10/2016",
    content: "消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容"
  },
  {
    id: "3",
    title: "消息名稱",
    date: "27/10/2016",
    content: "消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容"
  },
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.date}>{item.date}</Text>
    <Text numberOfLines={3} style={styles.content}>{item.content}</Text>
    
  </TouchableOpacity>
);

function NewsScreen({navigation}) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {

    return (
      <Item
        item={item}
        onPress={() => navigation.push('detail',  {item: item})}
        // onPress={() => setSelectedId(item.id)}
        // style={{ backgroundColor }}
      />
    );
  };

  return (

    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        resizeMode='cover' 
        source={require('@/img/background-6.png')}
      >
        
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />

      </ImageBackground>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  item: {
    padding: 20,
    backgroundColor: '#eef4f7',
    marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
    color: '#994278',
  },
  date: {
    fontSize: 12,
    marginBottom: 8,
    color: '#5f5f5f',
  },
  content: {
    fontSize: 17,
    color: '#5f5f5f',
  },
});

export default NewsScreen;