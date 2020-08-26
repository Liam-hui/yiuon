import React, {useState, useEffect } from 'react';
import { Text, View, StyleSheet,ImageBackground,TouchableOpacity,Image,SafeAreaView,FlatList,TextInput,ScrollView } from 'react-native';
import { Avatar} from 'react-native-paper';
import { Services } from '@/services/';

function CreateSingleChatScreen({navigation}) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    Services.get_user_list_chat(setData);
  }, []);

  const search_list = () => {
    let data_ = data;
    for(let i=0;i<data_.length;i++){
      if(data_[i].name.startsWith(search)) data_[i].hide = true; 
        else data_[i].hide = false;
    }
    setData(data_);
    // setUpdate(update+1);
  }

  const renderItem = ({item}) => {
    console.log(item.hide);
    if(!item.hide) return (
      <TouchableOpacity onPress={()=>{a();}} style={styles.item}>
        <Avatar.Image size={35} source={{ uri: item.pic }} />
        <Text style={styles.name}>{item.name}</Text>
        {!item.online ? <Text>離線中</Text> : null }
        {/* { item.online && item.newMsg>0 ? <View style={styles.number}><Text style={{fontSize: 20}}>{item.newMsg}</Text></View> : null } */}
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
        
            <View style={{paddingHorizontal:20, marginBottom:20}}>
                <View style={styles.search}>
                        <TextInput 
                            style={styles.searchText}
                            placeholder="搜尋名稱"
                            onChangeText={text => {setSearch(text);search_list();}}
                            // value={value}
                        />
                        <TouchableOpacity style={styles.searchButton} onPress={()=>{a();}}>
                          <Text style={styles.searchButtonText}>搜尋</Text>
                        </TouchableOpacity>
                </View>
            </View>

            <View style={{paddingHorizontal:15, marginTop:8}}>
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={search}
                />
            </View>
      
        </SafeAreaView>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: 'white',
  },
  name: {
    marginLeft: 12,
    fontSize: 20,
    color: '#a7589c',
  },
  number: {
    fontSize: 16,
    marginLeft: 12,
    color: '#994278',
  },
  status: {
    fontSize: 18,
    marginLeft: 'auto',
    color: '#994278',
  },
  top: {
    paddingHorizontal:40,

  },
  search: {
    flex:0,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 15,
  },
  searchText: {
    fontSize: 18,
    margin: 0,
    padding: 0,
    height: 22,
    color: '#A24982',
    marginLeft: 10,
    borderWidth: 0,
  },
  searchButton: {
    backgroundColor: '#A24982',
    marginLeft: 'auto',
  },
  searchButtonText: {
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 30,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreateSingleChatScreen;