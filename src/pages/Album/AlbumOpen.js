import React, {useState, useEffect } from 'react';
import { View, StyleSheet,ImageBackground,TouchableOpacity,Image,SafeAreaView,FlatList} from 'react-native';
import { IconButton } from 'react-native-paper';
import Lightbox from '@/components/Lightbox';
import { Services } from '@/services/';
import { useFocusEffect } from '@react-navigation/native';

function AlbumOpenScreen({ route, navigation}) {

  const {item} = route.params;
  const [data, setData] = useState([]);
  const [end, setEnd] = useState(false);
  const [page, setPage] = useState(2);

  useFocusEffect(
    React.useCallback(() => {
      Services.get('album/'+item.id+'?page=1',(data)=>setData(data.photos.data) );
      setPage(2);
      setEnd(false);

      return () => {};
    }, [])
  );

  useEffect(() => {
    navigation.setParams({
      color_mode: 1,
      right: renderHeaderRight,
    });
  }, []);

  const addToData = (newData) => {
    if(newData.photos.data.length>0) {
      setData(data.concat(newData.photos.data) );
      setPage(page+1);
    }
      else setEnd(true);
  }

  const renderHeaderRight = () => (
    <TouchableOpacity
        onPress={() => navigation.push('add-photo',  {item: item, newAlbum: false})}
    >
      <IconButton
        icon="plus"
        color={'#000000'}
        size={30}
      />
    </TouchableOpacity>
  )

  const renderItem  = ({ item }) => (
    // <TouchableOpacity onPress={onPress} style={styles.item} >
    <Lightbox 
      style={styles.item}
      activeProps={{
        style: styles.imageActive,
      }} 
    >
      <Image 
            source={{ uri: item.pic}}
            style={{width:'100%', height:'100%'}}
            // style={{width:20, height:20}}
            // resizeMode="contain"
      />
      </Lightbox>
    // </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <ImageBackground
          style={{width: '100%', height: '100%'}}
          resizeMode='cover' 
          source={require('@/img/background-6.png')}
      >
        <View style={styles.container}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              onEndReached={(e) => {
                if(!end) Services.get('album/'+item.id+'?page='+page,addToData);
              }}
              // extraData={selectedId}
            />

        </View>
      </ImageBackground>
    </SafeAreaView>

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