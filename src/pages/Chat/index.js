import React, {useState, useEffect } from 'react';
import { Text, View, StyleSheet,ImageBackground,TouchableOpacity,Image,SafeAreaView,FlatList} from 'react-native';
import { Avatar,IconButton } from 'react-native-paper';

const DATA = [
  {
    id: "1",
    title: "唱遊小組1",
    type: "group",
    online: true,
    newMsg: 5,
  },
  {
    id: "2",
    title: "唱遊小組2",
    type: "group",
    online: false,
    newMsg: 5,
  },
  {
    id: "3",
    title: "唱遊小組3",
    type: "single",
    online: true,
    newMsg: 0,  
  },
];

const Item = ({ item, onPress, style }) => {
  let bg_color = '#cbcbcb';
  let text_color = '#606060';
  if(item.online) {
    if(item.type=='group') {
      bg_color = '#a7589c';
      text_color = '#FFFFFF';
    }
    else {
      bg_color = '#FFFFFF';
      text_color = '#a7589c';
    }
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item,{backgroundColor: bg_color}]}>
      <Avatar.Image size={35} source={require('@/img/avatar.jpg')} />
      <Text style={[styles.title,{color: text_color}]}>{item.title}</Text>
      {!item.online ? <Text style={styles.status}>離線中</Text> : null }
      { item.online && item.newMsg>0 ? <View style={styles.number}><Text style={{fontSize: 20}}>{item.newMsg}</Text></View> : null }
    </TouchableOpacity>
)};

const renderHeaderRight = () => (
  <TouchableOpacity
        // onPress={() => {navigation.dispatch(DrawerActions.openDrawer());}}
        // onPress={navigation.goBack}
      >
     <IconButton
        icon={({ size}) => (
          <Image
            source={require('@/img/Btn_add_chat.png')}
            style={{ width: size, height: size, resizeMode:'contain'}}
          />
        )}
        size={30}
      />
  </TouchableOpacity>
)

function ChatScreen({navigation}) {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    navigation.setParams({
      // color_mode: 2,
      right: renderHeaderRight,
    });
  }, []);

  const renderItem = ({ item }) => {
    let color_mode = 2;
    if(item.type=='single') color_mode = 3;
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate('chatroom',  {title:item.title, color_mode:color_mode, item: item})}
        // onPress={() => setSelectedId(item.id)}
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
          // style={{width: '90%'}}
        />


      </SafeAreaView>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    
  },
  item: {
    width: '100%',
    flex:0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 8,
    borderRadius: 10,
    // marginHorizontal: 16,
  },
  title: {
    marginLeft: 12,
    fontSize: 20,
  },
  status: {
    marginLeft: 'auto',
    fontSize: 20,
    color: '#606060',
  },
  number: {
    marginLeft: 'auto',
    width: 30,
    height: 30,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bbe1f8',
    color: '#606060',
  },
});

export default ChatScreen;