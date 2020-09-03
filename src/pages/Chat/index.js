import React, {useState, useEffect } from 'react';
import { Text, View, StyleSheet,ImageBackground,TouchableOpacity,Image,SafeAreaView,FlatList} from 'react-native';
import { Avatar,IconButton } from 'react-native-paper';
import { Services } from '@/services/';
import { useFocusEffect } from '@react-navigation/native';
import{ useSelector,useDispatch } from 'react-redux';
import { AsyncStorage } from 'react-native';

function ChatScreen({navigation}) {
  const userData = useSelector(state => state.auth_state.userData);
  const [data,setData] = useState([]);
  const [update,setUpdate] = useState(0);

  useEffect(() => {
    navigation.setParams({
      // color_mode: 2,
      right: renderHeaderRight,
    });
  }, []);

  useEffect(() => {
    if(data.length>0){
      let data_ = data;
      data_.sort(function (a, b) {
        return (b.message_id) - (a.message_id);
      });
      setData(data_);
      AsyncStorage.setItem('room', JSON.stringify(data_));
      setUpdate(update+1);
    }
  }, [data]);

  useFocusEffect(
    React.useCallback(() => {
      Services.get('chat/getRooms',setData,get_data_from_storage);

      return () => {};
    }, [])
  );
  
  const get_data_from_storage = async() => {
    const data_stored = await AsyncStorage.getItem('room');
    if(data_stored) setData(JSON.parse(data_stored));
  } 

  const renderHeaderRight = () => (
    <TouchableOpacity
      // onPress={() => {navigation.push('search_user_list')} }
      onPress={() => {console.log(data) }}
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

  const renderItem = ({item}) => {
    let pic,title,bg,textColor,status; 
    let other = 0; 

    if(item.isPrivate){
      if (item.users.length>1 && item.users[other].id == userData.id) other = 1;
      pic = item.users[other].pic;
      title = item.users[other].name;

      if(item.users[other].online_status=='online' ){
        bg = 'white'; 
        textColor='#a7589c';
        status='';
      }
      else{
        bg = '#cbcbcb';
        textColor='#606060';
        status='離線中';
      }
    }
    else {
      pic = item.pic;
      title = item.title;
      bg = '#a7589c';
      textColor='#FFFFFF';
      status='';
    }

    return(
      <TouchableOpacity onPress={()=>{navigation.push('chatroom',  {group:item})}} style={[styles.item,{backgroundColor: bg}]}>
        <Avatar.Image size={40} style={{backgroundColor:'rgba(0,0,0,0.1)'}} source={{ uri: pic }} />
        <Text style={[styles.title,{color: textColor}]}>{title}</Text>
        {status!=''? <Text style={[styles.status,{color: textColor}]}>{status}</Text> : null }
        {status=='' && item.unread>0 ? <View style={styles.number}><Text style={{fontSize: 20}}>{item.unread}</Text></View> : null }
      </TouchableOpacity>
    );
  };

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
            // keyExtractor={(item) => item.id}
            extraData={update}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>

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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2.88,
    elevation: 6,
  },
  title: {
    marginLeft: 12,
    fontSize: 20,
  },
  status: {
    marginLeft: 'auto',
    fontSize: 20,
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