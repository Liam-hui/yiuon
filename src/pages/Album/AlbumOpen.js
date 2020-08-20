import React, {useState, useEffect } from 'react';
import { Text, View, StyleSheet,ImageBackground,TouchableOpacity,Image,SafeAreaView,FlatList} from 'react-native';
import { IconButton } from 'react-native-paper';
import Lightbox from '@/components/Lightbox';

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

function AlbumOpenScreen({ route, navigation}) {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    navigation.setParams({
      color_mode: 1,
      right: renderHeaderRight,
    });
  }, []);

  const renderHeaderRight = () => (
    <TouchableOpacity
          // onPress={() => {navigation.dispatch(DrawerActions.openDrawer());}}
          // onPress={navigation.goBack}
          
        >
        <IconButton
          icon="plus"
          color={'#000000'}
          size={30}
          onPress={() => navigation.navigate('add-photo')}
        />
    </TouchableOpacity>
  )

  const renderItem  = ({ item, onPress, style }) => (
    // <TouchableOpacity onPress={onPress} style={styles.item} >
    <Lightbox 
      style={styles.item}
      activeProps={{
        style: styles.imageActive,
      }} 
    >
      <Image 
            source={require('@/img/photo_test.jpg')}
            style={{width:'100%', height:'100%'}}
            // style={{width:20, height:20}}
            // resizeMode="contain"
      />
      </Lightbox>
    // </TouchableOpacity>
  );

  return (
    <ImageBackground
        style={{width: '100%', height: '100%'}}
        resizeMode='cover' 
        source={require('@/img/background-6.png')}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />


      </SafeAreaView>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  item: {
    width: '100%',
    height:230,
    marginBottom: 3,
  },
  imageActive: {
    // flex: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: '#342733',
  },
});

export default AlbumOpenScreen;