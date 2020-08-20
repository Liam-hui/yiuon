import React, {useState, useEffect } from 'react';
import { Text, View, StyleSheet,ImageBackground,TouchableOpacity,Image,SafeAreaView,FlatList,TextInput,ScrollView } from 'react-native';
import { Avatar} from 'react-native-paper';
import FormButton from '@/components/FormButton';

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
     <Avatar.Image size={35} source={require('@/img/avatar.jpg')} />
    <Text style={styles.name}>李婆婆</Text>
    <Text style={styles.status}>管理員</Text>
    {/* <Text style={styles.date}>{item.date}</Text> */}
    {/* <Text numberOfLines={3} style={styles.content}>{item.content}</Text> */}
  </TouchableOpacity>
);


function AdminChatSettingScreen({navigation}) {
  const [selectedId, setSelectedId] = useState(null);

  const [value, onChangeText] = React.useState('唱遊小組 - 2');
  const renderItem = ({ item }) => {

    return (
      <Item
        item={item}
        // onPress={() => navigation.navigate('chatroom',  {item: item})}
        // onPress={() => setSelectedId(item.id)}
        // style={{ backgroundColor }}
      />
    );
  };

  return (
    <ImageBackground
        style={{width: '100%', height: '100%'}}
        resizeMode='cover' 
        source={require('@/img/background-1.png')}
    >
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.top}>
                <View style={{flex:0, flexDirection:'row', alignItems:'center'}}>
                    <Avatar.Image size={130} source={require('@/img/avatar.jpg')} />
                    <Text style={styles.changeIcon}>更改頭像</Text>
                </View>
                <View style={styles.changeName}>
                        <TextInput 
                            style={styles.changeNameText}
                            onChangeText={text => onChangeText(text)}
                            value={value}
                        />
                        <Text style={styles.changeNameButton}>確定</Text>
                </View>
            </View>

            <View style={styles.toggle}>
                <Text style={{color: '#A24982',fontSize:18}}>信息提示</Text>
                <Text style={styles.toggleRight}>開></Text>
            </View>

            <Text style={{marginLeft:20, color: '#A24982',fontSize:18}}>群組成員：4人</Text>
            <View style={{paddingHorizontal:15, backgroundColor:'#f5f9e8', marginTop:8}}>
                <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
                />
            </View>
            <Text style={[styles.item,styles.add]}>+增加成員</Text>

            <View style={styles.bottom}>
                <FormButton
                    title='退出群組'
                    // addStyle={{marginTop:30}}
                    modeValue='contained'
                    labelStyle={{fontSize: 18}}
                />
                <FormButton
                    title='刪除群組'
                    addStyle={{marginTop:19}}
                    modeValue='contained'
                    labelStyle={{fontSize: 18}}
                />
            </View>

        </ScrollView>       
        </SafeAreaView>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    
  },
  memberwrapper: {
    paddingHorizontal: 15,
    backgroundColor: '#f5f9e8',
  },
  item: {
    fontSize: 18,
    width: '100%',
    flex:0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#ccaebf'
  },
  name: {
    fontSize: 18,
    marginLeft: 12,
    color: '#994278',
  },
  status: {
    fontSize: 18,
    marginLeft: 'auto',
    color: '#994278',
  },
  add: {
    textAlign: 'center',
    color: '#994278',
    backgroundColor: 'white',
    marginTop: -1,
  },
  toggle:{
    flex:0,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#994278',
    backgroundColor:'#f5f9e8',
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  toggleRight:{
    fontSize:18,
    color:'black',
    marginLeft: 'auto'
  },
  top: {
    paddingHorizontal:40,
    marginVertical: 20,
  },
  changeIcon: {
    color: 'white',
    backgroundColor: '#A24982',
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 18,
    fontWeight: '600',
    borderRadius: 5,
    overflow: 'hidden',
    marginLeft: 'auto',
  },
  changeName: {
    flex:0,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 15,
  },
  changeNameText: {
    fontSize: 18,
    margin: 0,
    padding: 0,
    height: 22,
    color: '#A24982',
    marginLeft: 10,
    borderWidth: 0,
  },
  changeNameButton: {
    color: 'white',
    backgroundColor: '#A24982',
    paddingVertical: 8,
    paddingHorizontal: 30,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 'auto',
  },
  bottom:{
      paddingHorizontal:30,
      marginTop: 40,
      marginBottom:30,
  }
});

export default AdminChatSettingScreen;