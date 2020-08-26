import React, {useState, useEffect } from 'react';
import { ScrollView, StyleSheet,ImageBackground,TouchableOpacity,Image,SafeAreaView,FlatList} from 'react-native';
import { IconButton } from 'react-native-paper';
import Lightbox from '@/components/Lightbox';
import { Services } from '@/services/';

function AlbumOpenScreen({ route, navigation}) {

  const {item} = route.params;
  const [data, setData] = useState([]);
  const [end, setEnd] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    Services.get('album/'+item.id+'?page='+page,addToData);

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

  const handleScroll = (event) => {
    if(!end && (event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height - event.nativeEvent.contentOffset.y) < 10 ) {
      Services.get('album/'+item.id+'?page='+page,addToData);
    };
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