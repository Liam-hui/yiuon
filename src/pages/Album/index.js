import React, {useState, useEffect } from 'react';
import { Text, View, StyleSheet,ImageBackground,TouchableOpacity,Image,SafeAreaView,ScrollView,FlatList} from 'react-native';
import { IconButton } from 'react-native-paper';
import { Services } from '@/services/';

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={styles.item} >
    <Image 
          source={{ uri: item.pic}}
          style={{width:'100%', height:'100%'}}
          resizeMode="cover"
    />
    <View style={styles.title}>
      <Text style={{color: '#A24982',fontSize:20}}>{item.title}</Text>
    </View>
  </TouchableOpacity>
);


function AlbumScreen({ navigation,route}) {
  const [data, setData] = useState([]);
  const [end, setEnd] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    Services.get('albums?page=1',addToData);

    navigation.setParams({
      right: renderHeaderRight,
    });
  }, []);

  const addToData = (newData) => {
    if(newData.data.length>0) {
      setData(data.concat(newData.data) );
      setPage(page+1);
    }
      else setEnd(true);
  }

  const handleScroll = (event) => {
    if(!end && (event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height - event.nativeEvent.contentOffset.y) < 10 ) {
      Services.get('albums?page='+(page),addToData);
    };
  }

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('add-photo',  {newAlbum: true})}
    >
        <IconButton
          icon="plus"
          color={'#000000'}
          size={30}
        />
    </TouchableOpacity>
  )

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('album-open',  {title:item.title, item: item})} style={styles.item} >
        <Image 
              source={{ uri: item.pic}}
              style={{width:'100%', height:'100%'}}
              resizeMode="cover"
        />
        <View style={styles.title}>
          <Text style={{color: '#A24982',fontSize:20}}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
        style={{width: '100%', height: '100%'}}
        resizeMode='cover' 
        source={require('@/img/background-6.png')}
    >
      <SafeAreaView style={styles.container}>
        
        <ScrollView onScroll={event=> {handleScroll(event);}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            // extraData={selectedId}
          />
        </ScrollView>


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