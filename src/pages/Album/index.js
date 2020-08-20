import React, {useState, useEffect } from 'react';
import { Text, View, StyleSheet,ImageBackground,TouchableOpacity,Image,SafeAreaView,FlatList} from 'react-native';
import { Avatar,IconButton } from 'react-native-paper';

const DATA = [
  {
    id: "1",
    title: "唱遊小組_1",
    date: "27/10/2016",
    content: "消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容"
  },
  {
    id: "2",
    title: "唱遊小組_2",
    date: "27/10/2016",
    content: "消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容"
  },
  {
    id: "3",
    title: "唱遊小組_3",
    date: "27/10/2016",
    content: "消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容消息內容"
  },
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={styles.item} >
    <Image 
          source={require('@/img/photo_test.jpg')}
          style={{width:'100%', height:'100%'}}
          resizeMode="cover"
    />
    <View style={styles.title}>
      <Text style={{color: '#A24982',fontSize:20}}>sfsf</Text>
    </View>
  </TouchableOpacity>
);


function AlbumScreen({ navigation,route}) {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    navigation.setParams({
      // color_mode: 2,
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

  const renderItem = ({ item }) => {

    return (
      <Item
        item={item}
        onPress={() => navigation.navigate('album-open',  {title:item.title, item: item})}
        // onPress={() =>
        //   {
        //     navigation.setParams({
        //     title:"abc"
        //   });
        //   // console.log(route.params);
        // }
        // }
        // onPress={() => setSelectedId(item.id)}
        // style={{ backgroundColor }}
      />
    );
  };

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
    marginBottom: 5,
  },
  title: {
    marginTop: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
});

export default AlbumScreen;