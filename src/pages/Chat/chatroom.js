import React, {useState, useEffect } from 'react';
import { Text, View, StyleSheet,ImageBackground,TouchableOpacity,TouchableHighlight,Image,Slider} from 'react-native';
import { GiftedChat,Bubble,Send,Composer,InputToolbar} from 'react-native-gifted-chat';
// import moment from 'moment';
import { PickImage } from '@/components/PickImage';
import { Avatar,IconButton } from 'react-native-paper';
import Gallery from 'react-native-image-gallery';
import Record from '@/pages/Chat/recordAudio'
import MessageAudio from '@/pages/Chat/messageAudio';
import MessageVideo from '@/pages/Chat/messageVideo';
import MessageImage from '@/pages/Chat/messageImage';

export default function Chatroom({navigation}) {
    const [text, setText] = useState('');
    const [showUpload, setShowUpload] = useState(false);
    const [showAudio, setShowAudio] = useState(false);
    const [showimagesChosen, setShowimagesChosen] = useState(false);

    const [imagesChosen, setImagesChosen] = useState([]);
    const [imageUrl, setImageUrl] = useState([]);

    const [audioUrl, setAudioUrl] = useState('');

    const [onSend, setOnSend] = useState(null);

    useEffect(() => {
        navigation.setParams({
        //   color_mode: 2,
          right: renderHeaderRight,
        });
      }, []);

    const renderHeaderRight = () => (
      <TouchableOpacity
            // onPress={() => {navigation.dispatch(DrawerActions.openDrawer());}}
            // onPress={navigation.goBack}
            
          >
          <Avatar.Image size={40} source={require('@/img/avatar.jpg')} style={{marginRight:10}} />
      </TouchableOpacity>
    )

    const Upload = (props) => {
        if(showUpload){
            return (
                <View style={styles.upload}>

                {/* upload video */}
                <TouchableHighlight 
                    onPress={() => {
                        PickImage(null,(() => setShowimagesChosen(false)),'video');
                        if (text=='') setText(' ');
                    }
                }>
                    <View style={styles.uploadItem} >
                        <Image
                            source={require('@/img/icon_share_video.png')}
                            style={{ width:35, height:35, marginRight:10}}
                            resizeMode="contain"
                        />
                        <Text style={styles.uploadText}>上傳影片</Text>
                    </View>
                </TouchableHighlight>

                <View style={{paddingHorizontal:30,backgroundColor:'white'}}>
                    <View style={styles.uploadLine}></View>
                </View>

                {/* upload photo */}
                <TouchableHighlight 
                    onPress={() => {
                        PickImage(addImagesChosen,(() => setShowimagesChosen(false)),'photo');
                        if (text=='') setText(' ');
                    }
                }>
                    <View style={styles.uploadItem}>
                        <Image
                            source={require('@/img/icon_share_photo.png')}
                            style={{ width:35, height:35, marginRight:10}}
                            resizeMode="contain"
                        />
                        <Text style={styles.uploadText}>上傳相片</Text>
                    </View>

                {/* cancel */}
                </TouchableHighlight>
                    <TouchableHighlight onPress={() => {setShowUpload(false)}}>
                        <View style={[styles.uploadItem,{marginTop:8}]}>
                            <Text style={styles.uploadText}>取消</Text>
                        </View>
                    </TouchableHighlight>
                    
                </View>
            );
        }
        else return null;
    }

    const addImagesChosen = (newPhotourl) => {
        setShowUpload(false);
        setShowimagesChosen(true);
        let newPhoto = { source: { uri: newPhotourl } };
        setImageUrl(imageUrl.concat(newPhoto));
        setImagesChosen(imagesChosen.concat(newPhotourl));
        console.log(imageUrl);
    }

    const renderImageChosen= () => {
    // if(imagesChosen.length>0) 
       return(
            <View >
                <Gallery
                    style={{ flex: 1, backgroundColor: 'black' }}
                    images={imageUrl}
                />
            </View>
        )
    }

    const imageSendText = (text) => {
        if(showimagesChosen && text=='') setText(' ');
        else setText(text);
    }
    
    const renderBubble = (props) => { 
        return (
        <View>
        <Bubble {...props} 
            wrapperStyle={{
                left: {
                padding: 6,
                backgroundColor: '#e2a4cc',
                },
                right: {
                padding: 6,
                backgroundColor: '#cbcbcb'
                }
            }} 

            textStyle={{
            left: {
                fontSize: 20,
                color: '#000',
            },
            right: {
                fontSize: 20,
                color: '#000',
            },
            }}
        />
        {/* <Text style={styles.messageTime}>{moment(props.currentMessage.createdAt).format("LT")}</Text> */}
        </View>
        );
    }

    const renderSend = (props) => {

        const SendContent = () => {
            if ((props.text && props.text.trim().length > 0)||showimagesChosen) {
                return (
                    <Text style={{fontSize:18, color:'#993f7e'}}>發送</Text>
                );
            }
            else return (
                <TouchableOpacity 
                    onPress={() => {
                        setShowAudio(!showAudio)
                        if(onSend==null) setOnSend(() => () => props.onSend(''));
                    }}                
                >
                    <Image
                        source={require('@/img/icon_audio.png')}
                        style={{ width:30, height:30, margin:5}}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            );
        }
    // };
    return (
        <Send
            {...props}
            text={text}
            containerStyle={styles.send}
            alwaysShowSend={true}
            children={
                <View>
                <SendContent
                    // {...props}
                />
                </View>
            }
        > 
        </Send>
    );
    }

    const renderActions = (props) => {
        let upload_button;
        if (!showimagesChosen) upload_button = 
            <TouchableOpacity onPress={() => {setShowUpload(true)}}>
            <Image
                source={require('@/img/icon_upload.png')}
                style={{ width:30, height:30, margin:5}}
                resizeMode="contain"
            />
            </TouchableOpacity>
        
        else upload_button =  null;

        return (
        <View style={styles.actions}>
            {upload_button}
            <TouchableOpacity
            onPress={() => {}}
                
            >
            <Image
                source={require('@/img/icon_emoji.png')}
                style={{ width:30, height:30, margin:5}}
            />
            </TouchableOpacity>
        </View>
        );
    }

    const renderComposer = (props) => {
        return (

        <Composer 
            {...props} 
            placeholder={'請輸入訊息...'} 
            placeholderColor={'#BCBCBC'} 
            textInputStyle={styles.textInput}
            
        />
        );
    }

    const renderInputToolbar = (props) => {
        return (
            <InputToolbar {...props} 
            primaryStyle={[styles.InputToolbar]}
            // onSend={props}
            />
        
        );
    }

    const renderMessageAudio = (props) => {
        return (
            <MessageAudio
            {...props}
            />
        )
    }

    const renderMessageVideo = (props) => {
        // console.log(props);
        return (
            <MessageVideo
            {...props}
            />
        )
    }

    const renderMessageImage = (props) => {
        // console.log(props);
        return (
            <MessageImage
            {...props}
            />
        )
    }

  const [messages, setMessages] = useState([
    // example of system message
    {
      _id: 1,
      text: 'd',
      createdAt: new Date(),
      image: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      user: {
        _id: 2,
      },
    },
    {
      _id: 2,
      text: '',
      createdAt: new Date(),
      audio: 'file:///Users/kabaloi/Library/Developer/CoreSimulator/Devices/0AC3C1C3-0A9D-459B-9920-A92B9C9AA697/data/Containers/Data/Application/70963610-F688-4D7B-8D28-2C137BE65413/Library/Caches/ExponentExperienceData/%2540anonymous%252Ftest-buy-8627d5c2-2324-4108-9b45-ac159019abf2/AV/recording-EB6742D1-D104-4194-BB67-0CBC36998535.caf',
      user: {
        _id: 1,
      },
    },
    {
      _id: 3,
      text: '對呀',
      video: '@/video_test.mp4',
      createdAt: new Date(),
      user: {
        _id: 2,
      },
    },  
  ]);


  function handleSend(newMessage = []) {
    setShowimagesChosen(false);
    if(imagesChosen.length>0) {
        // newMessage[0].text = '';
        newMessage[0].image = imagesChosen[0];
        setImageUrl([]);
        setImagesChosen([]);
    }
    if(audioUrl){
        newMessage[0].audio = audioUrl;
        newMessage[0].user._id = 1;
        setAudioUrl('');
    }
    setMessages(GiftedChat.append(messages, newMessage));
    // console.log(messages);
  }

  return (
    <ImageBackground
			style={{width: '100%', height: '100%'}}
			resizeMode='cover' 
			source={require('@/img/background-7.png')}
		>
      <GiftedChat
        messages={messages}
        // onSend={() => console.log('sdf')}
        onSend={newMessage => handleSend(newMessage)}
        user={{ _id: 1 }}
        renderAvatar={null}
        renderTime={() => void 0}
        renderMessage={showimagesChosen? renderImageChosen:null}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderMessageAudio={renderMessageAudio}
        renderMessageVideo={renderMessageVideo}
        renderMessageImage={renderMessageImage}
        minInputToolbarHeight={55}
        onInputTextChanged={imageSendText}
      />
      <Upload/>
      <Record
        onRecordEnd = {(a) => {
            setAudioUrl(a);
            setShowAudio(false);
            onSend('');
        }}
        show={showAudio}
      />
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  InputToolbar: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    // justifyContent: 'flex-end'
    minHeight:55,
    backgroundColor: '#eeeeee',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 1.65,
  },
  actions:{
    // backgroundColor: 'green',
    height:55,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex:1,
    minHeight: 40,
    backgroundColor: 'white',
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
  },
  send: {
    // backgroundColor: 'green',
    width: 50,
    height:55,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upload:{
    position:'absolute',
    width: '100%',
    bottom:0,
    // flex:0,
    // justifyContent: 'flex-end',
  },
  uploadItem:{
    flex:0,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    height:56,
    backgroundColor: 'white',
  },
  uploadText:{
    fontSize: 22,
    color: '#994278',
  },
  uploadLine:{
    // width:'80%',
    height:1,
    backgroundColor: '#994278',
  },
  imageFull:{
    width:'100%',
    height:'100%',
    backgroundColor:'black',
  },
});