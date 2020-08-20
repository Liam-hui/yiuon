import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity, SafeAreaView,ScrollView,Dimensions,FlatList} from 'react-native';
import { Title,Button } from 'react-native-paper';
import FormInput from '@/components/FormInput';
import FormButton from '@/components/FormButton';
import {PickImage} from '@/components/PickImage';
import DatePicker from 'react-native-datepicker'

const screenWidth = Math.round(Dimensions.get('window').width);

export default function AddPhotoScreen({navigation}) {
    const [cover, setCover] = useState(null);
    const [smallPhotos, setSmallPhotos] = useState([]);  
    const [name, setName] = useState('');
    const [datePicker, setDatePicker] = useState(null);

    const getCurrentDate=()=>{
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      return date + '/' + month + '/' + year;
}
    const [date, setDate] = useState( getCurrentDate() );

    const addSmallPhotos = (newPhoto) => {
      setSmallPhotos(smallPhotos.concat(newPhoto));
    }
  
    const CoverPhoto = () => {
      if(cover) return(
        <Image 
          source={{ uri: cover }}
          style={{width:screenWidth*0.8, height:screenWidth*0.55}}
          resizeMode="cover"
        /> 
      );
      else return null;
    }

    const renderSmallPhoto = (item) => {
      return (
        <View style={styles.smallPhoto}>
          <Image 
              source={{ uri: item.item}}
              style={{width:'100%', height:'100%'}}
              resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => {
              console.log(item.index);
              setSmallPhotos(smallPhotos.filter((x,i) => i != item.index));
            }}
          >
            <View style={styles.closeButton}>
              <Image 
                source={require('@/img/del_photo.png')}
                style={{width:'100%', height:'100%'}}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    };

  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      resizeMode='cover' 
      source={require('@/img/background-1.png')}
    > 
        <ScrollView>
        <SafeAreaView style={styles.container}>

        <View style={styles.top}>

          <Title style={styles.inputText}>相簿名稱</Title>
          <FormInput
            // labelName=''
            // value={email}
            autoCapitalize='none'
            onChangeText={name => setName(name)}
          />
          <Title style={styles.inputText}>活動日期</Title>
          <TouchableOpacity
            onPress={()=> {
              console.log('pressed');
              datePicker.onPressDate();
            }}
          >
            <FormInput
              pointerEvents='none'
              value={date}
              editable={false}
            />
          </TouchableOpacity>
          <DatePicker
            ref={(ref) => {
              setDatePicker(ref);
            }}
            style={{width: 0, height:0}}
            showIcon={false}
            hideText={true}
            confirmBtnText='Enter'
            cancelBtnText='Cancel'
            mode="date"
            format="DD/MM/YYYY"
            minDate="01/01/2000"
            maxDate="31/12/2050"
            onDateChange={(date) => {setDate(date)}}
            customStyles={{
              btnTextCancel: {
                color: 'black'
              },
              btnTextConfirm: {
                color: 'black'
              }
            }}
          />
          <Title style={styles.inputText}>相簿封面</Title>
          <FormButton
            title='＋上傳相片'
            addStyle={{marginTop:5,marginBottom:10}}
            modeValue='contained'
            labelStyle={{fontSize: 20}}
            onPress = {() => {
              PickImage(setCover);
            }}
          />
          <CoverPhoto/>
        


          <Title style={styles.inputText}>活動相片</Title>
          <FormButton
            title='＋上傳相片'
            addStyle={{marginTop:5,marginBottom:10}}
            modeValue='contained'
            labelStyle={{fontSize: 20}} 
            onPress = {() => {
              PickImage(addSmallPhotos);
            }}      
          />  
            <FlatList
            data={smallPhotos}
            style={{marginTop: 10}}
            renderItem={renderSmallPhoto}
            keyExtractor={(item) => item.id}
            numColumns='2'
            extraData={smallPhotos}
            columnWrapperStyle={{flex:0,justifyContent: 'space-between',marginBottom:15}}
            />
        </View>

        <View style={{width: '80%',marginTop:'auto'}}>
            <FormButton
                    title='提交'
                    addStyle={{marginTop:20}}
                    modeValue='contained'
                    labelStyle={{fontSize: 20}}
            />  
        </View>
        
        </SafeAreaView>
        </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 40,
    // justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 18
  },
  top:{
    marginTop:30,
    width: '80%',
  },
  smallPhoto:{
    width:screenWidth*0.38,
    height:screenWidth*0.38,
  },
  closeButton:{
    backgroundColor: '#97407f',
    width:40,
    height:40,
    position: 'absolute',
    right: 0,
  },
  inputText: {
    color: '#A24982',
    fontSize: 20,
    marginBottom: 2
  },
  bottomButtonWrapper: {
    // backgroundColor: 'red',
    marginTop: 10,
    width: '90%',
    height: 110
  },
  bottomButton: {
    height: '100%', 
    width: '47%',
    position: 'absolute',
    top: 0
    // right: 0
  }

});