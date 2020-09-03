import React, {useState, useEffect } from 'react';
import { Text, View, StyleSheet,ImageBackground,TouchableOpacity,TouchableHighlight,Image,Slider} from 'react-native';
import { GiftedChat,Bubble,Send,Composer,InputToolbar} from 'react-native-gifted-chat';
import { PickImage } from '@/components/PickImage';
import { Avatar,IconButton } from 'react-native-paper';
import {Video} from 'expo-av';
import Record from '@/pages/Chat/recordAudio'
import MessageAudio from '@/pages/Chat/messageAudio';
import MessageVideo from '@/pages/Chat/messageVideo';
import MessageImage from '@/pages/Chat/messageImage';
import { useFocusEffect } from '@react-navigation/native';
import { Services } from '@/services/';
import { chatDatabase } from '@/services/ChatDatabase';
import{useSelector,useDispatch} from 'react-redux';

export default function Chatroom({navigation,route}) {
    const userData = useSelector(state => state.auth_state.userData);

    const {group} = route.params;
    let group_pic,group_title,other;

    const [messages, setMessages] = useState([]);
    const [end, setEnd] = useState(false);
    const [text, setText] = useState('');

    const [showUpload, setShowUpload] = useState(false);
    const [showAudio, setShowAudio] = useState(false);
    const [showFileChosen, setShowFileChosen] = useState(false);

    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const [onSend, setOnSend] = useState(null);

    const [contentHeight, setContentHeight] = useState(1);
    const [layoutHeight, setLayoutHeight] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            if(group.isPrivate==1) {
                other=0;
                if (group.users.length>1 && group.users[other].id == userData.id) other = 1;
                group_pic = group.users[other].pic;
                group_title = group.users[other].name;
            }
            else{
                group_pic = group.pic;
                group_title = group.title;
            }
            if(group_title=='')group_title=' ';
            navigation.setParams({
                title:group_title,
                right: renderHeaderRight,
            });

            async function set_table() {
                try {
                  await chatDatabase.setupDatabaseAsync();
                } catch (e) {
                  console.warn(e);
                }
            }

            set_table();
            reset_messages();
        return () => {};
    }, [])
    );

    useEffect(() => {
        if( !end && (contentHeight<=layoutHeight) ) update_old_messages();
        // if(messages.length>0) chatDatabase.insertMessages(messages,group.id);

        // let messages_ = messages;
        // let currentUserId = -1;
        // for(let i=messages_.length-1;i>=0;i--){
        //     if(messages_[i].user._id != currentUserId) messages_[i].is_first = true; else messages_[i].is_first = false;
        //     currentUserId = messages_[i].user._id;
        // }
        // setMessages(messages_);

    }, [messages]) 

    const renderHeaderRight = () => (
        <TouchableOpacity
            onPress={() => {navigation.navigate('chat-setting', {group:group, other:other} )} }
        >
            <Avatar.Image size={40} style={{backgroundColor:'rgba(0,0,0,0.1)', marginRight:10}} source={{ uri: group_pic }} />
      </TouchableOpacity>
    )

    const reset_messages = () => {
        setEnd(false);
        Services.get('chat/getMessages?conversationID='+group.id,
            (payload) => {
                setMessages(data_to_messages(payload.data));
                // chatDatabase.dropDatabaseTablesAsync();
                chatDatabase.deleteConversation(group.id);
                chatDatabase.insertMessages(data_to_messages(payload.data),group.id);
            },
            () => {
                chatDatabase.getMessages(group.id,setMessages);
            },
        );
    }


    const update_old_messages = () => { 
        let lastID = '';
        if(messages.length>0) lastID = messages[messages.length-1]._id;
        Services.get('chat/getMessages?conversationID='+group.id+'&before=y&lastID='+lastID,
            (payload) => {
                setMessages(messages.concat(data_to_messages(payload.data)));
                chatDatabase.insertMessages(data_to_messages(payload.data),group.id);
            }
        );
    };

    const data_to_messages = (data) => {
        if(data.length==0) setEnd(true);
        let new_messages = [];
        for(let i=0;i<data.length;i++){
            let new_msg = {user:{}};
            new_msg._id = data[i].message_id;
            new_msg.text = data[i].body;
            new_msg.type = data[i].type;
            new_msg.createdAt = data[i].created_at;
            switch (data[i].type) {
                case 'image': {
                    new_msg.image = data[i].attachment;
                }
                break;
                case 'video': {
                    new_msg.video = data[i].attachment;
                }
                break;
                case 'audio': {
                    new_msg.audio = data[i].attachment;
                }
                break;
             }
            new_msg.is_sender = data[i].is_sender;
            new_msg.user.name = data[i].sender.name;
            new_msg.user._id = data[i].sender.id;
            new_msg.user.pic = data[i].sender.pic;
            new_messages.push(new_msg);
        }
        return new_messages;
    }

    const Upload = (props) => {
        if(showUpload){
            return (
                <View style={styles.upload}>

                {/* upload video */}
                <TouchableHighlight 
                    onPress={() => {
                        PickImage((url)=>addFilesChosen(url,'video'),(() => setShowFileChosen(false)),'video');
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
                        PickImage((url)=>addFilesChosen(url,'photo'),(() => setShowFileChosen(false)),'photo');
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

    const addFilesChosen = (fileurl,type) => {
        setShowUpload(false);
        setShowFileChosen(true);
        if(type=='photo') setImageUrl(fileurl);
        if(type=='video') setVideoUrl(fileurl);
    }

    const renderFileChosen = () => {
       return(
            <View style={{ height:'100%', width:'100%', backgroundColor: 'black' }}>
                {imageUrl!=''?(
                    <Image
                        source={{uri:imageUrl}}
                        style={{ width:'100%', height:'100%'}}
                        resizeMode="contain"
                    />
                ):(null)}
                {videoUrl!=''?(
                    <Video
                        source={{ uri: videoUrl }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        shouldPlay={false}
                        useNativeControls={true}
                        style={{ width:'100%', height:'100%'}}
                        resizeMode="contain"
                    />
                ):(null)}
            </View>
        )
    }

    const imageSendText = (text) => {
        if(showFileChosen && text=='') setText(' ');
        else setText(text);
    }
    
    const renderBubble = (props) => { 
        let bubbleWrapperStyle,bubbleStyle;

        if (props.currentMessage.type=='system'){
            bubbleWrapperStyle = styles.bubbleWrapperMid;
            bubbleStyle = styles.bubbleMid;
        }
        else {
            if (props.currentMessage.is_sender) {
                bubbleWrapperStyle = styles.bubbleWrapperRight;
                bubbleStyle = styles.bubbleRight;
            }
            else {
                bubbleWrapperStyle = styles.bubbleWrapperLeft;
                bubbleStyle = styles.bubbleLeft;
            }
        }
        return (
            <View style={[styles.bubbleWrapper,bubbleWrapperStyle]}>
                {props.currentMessage.is_first? (
                    <View style={styles.bubbleUser}>
                        <Avatar.Image size={40} source={{uri:props.currentMessage.user.pic}}/>
                        <Text style={{fontSize:20,marginLeft:10}}>{props.currentMessage.user.name}</Text>
                    </View>
                    ):(null)
                }
                <View style={[styles.bubble,bubbleStyle]}>
                    {props.currentMessage.type=='image' ? (<MessageImage {...props} />):(null)} 
                    {props.currentMessage.type=='audio' ? (<MessageAudio {...props} />):(null)} 
                    {props.currentMessage.type=='video' ? (<MessageVideo {...props} />):(null)} 
                    {props.currentMessage.text!='' ? (<Text style={styles.bubbleText}>{props.currentMessage.text}</Text>):(null)} 
                </View>
            </View>
        );
    }

    const renderSend = (props) => {

        const SendContent = () => {
            if ((props.text && props.text.trim().length > 0)||showFileChosen) {
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
        if (!showFileChosen) upload_button = 
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
            onPress={() => {console.log(messages);}}
            // onPress={() => {chatDatabase.getMessages();}}
            // onPress={() => {chatDatabase.dropDatabaseTablesAsync();}}
            
                
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

    const renderMessageVideo = (props) => {
        // console.log(props);
        return (
            <MessageVideo
            {...props}
            />
        )
    }

    function handleSend(newMessage = []) {
        setShowFileChosen(false);
        if(imageUrl!='') {
            Services.send_msg(group.id,'image',newMessage[0].text,reset_messages,imageUrl);
            setImageUrl('');
        }
        else if(videoUrl!='') {
            // Services.upload_video(group.id,newMessage[0].text,videoUrl,reset_messages);
            Services.send_msg(group.id,'video',newMessage[0].text,reset_messages,videoUrl);
            setVideoUrl('');
        }
        else if(audioUrl!=''){
            Services.send_msg(group.id,'audio','',reset_messages,audioUrl);
            setAudioUrl('');
        }
        else Services.send_msg(group.id,'text',newMessage[0].text,reset_messages);
        // setMessages(GiftedChat.append(messages, newMessage));
    }

    return (
    <ImageBackground
        style={{width: '100%', height: '100%'}}
        resizeMode='cover' 
        source={require('@/img/background-7.png')}
    >
        <GiftedChat
            listViewProps={{
                scrollEventThrottle: 400,
                onLayout: ({nativeEvent}) => {
                    setLayoutHeight(nativeEvent.layout.height);
                },
                onContentSizeChange: (w,h) => {
                    setContentHeight(h);
                },
                onEndReached: (e) => {
                    update_old_messages();
                },
            }
        }
        // ref={(ref) => setChatRef(ref)}
        messages={messages}
        onSend={newMessage => handleSend(newMessage)}
        user={{ _id: 1 }}
        renderAvatar={null}
        renderTime={() => void 0}
        renderMessage={showFileChosen? renderFileChosen:null}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions}
        renderComposer={renderComposer}
        renderSend={renderSend}
        // renderMessageAudio={renderMessageAudio}
        // renderMessageVideo={renderMessageVideo}
        // renderMessageImage={renderMessageImage}
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
  bubbleWrapper:{
    flex:0,
  },
  bubble:{
    borderRadius: 10,
    maxWidth: 180,
    flex:0,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:10,
    paddingHorizontal:10,
    marginVertical:6,
  },
  bubbleUser:{
    height:50,
    flex:0,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:6,
  },
  bubbleText:{
      fontSize:20,
  },
  bubbleWrapperLeft:{
    marginRight:'auto',
    marginLeft:8,
  },
  bubbleWrapperRight:{
    marginLeft:'auto',
    marginRight:15,
  },
  bubbleWrapperMid:{
    marginLeft:'auto',
    marginRight:'auto',
  },
  bubbleLeft:{
    backgroundColor:'rgb(219,180,211)',
  },
  bubbleRight:{
    backgroundColor:'rgb(203,203,203)',
  },
  bubbleMid:{
    backgroundColor:'rgb(187,225,248)',
    maxWidth: 250,
  },
});