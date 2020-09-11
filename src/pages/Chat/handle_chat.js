import io from "socket.io-client";
import storage from '@/utils/storage';
import store from '@/store';
import actions from '@/store/ducks/actions';
import * as FileSystem from 'expo-file-system';
import * as mime from 'react-native-mime-types';

const API_URL = "http://yiuonsocketio.itisdemo.com"

const SOCKET_EVENT =  {
    initSuccess:'init success',
    initFail:'init fail',
    serverReceivedMsg:'server-received-msg',
    clientReceivedMsg:'client-received-msg',
    notInGroup:'not-in-group',
    messageReceived:'message-received',
    sendMessageFail:'send-message-fail',
    updateList:'update-rooms-list',
    joinRoomSuccess:'join-room-success',
    joinRoomFail:'join-room-fail',
    leaveRoomSuccess:'leave-room-success',
    leaveRoomFail:'leave-room-fail',
}
  
const SOCKET_ACTION = {
    connection:'connection',
    disconnect:'disconnect',
    reconnect:'reconnect',
    joinRoom:'join-room',
    leaveRoom:'leave-room',
    init:'init',
    messageText:'message-text',
    messageVideoID:'message-videoID',
    messageImage:'message-image',
    messageVideo:'message-video',
    messageAudio:'message-audio',
    kickMember:'kick-member',
    messageSystem:'message-system',
}

export const Chat = {
   runSocket,
   joinRooms,
   sendMsg,
   sendFile,
   uniqueId,
   kickMember,
   messageSystem,
};

let socket;

function uniqueId() {
    // return '_'+ id + moment().format('YYYYMMDD_HHmmss');
    return '_' + Math.random().toString(36).substr(2, 9);
}

function joinRooms (rooms){
    socket.emit(SOCKET_ACTION.joinRoom, rooms.map(obj=>obj.id));
}

async function runSocket(rooms,refreshRooms) {
    const auth = await storage.getAuth();
    const token = JSON.parse(auth).token;

    socket = io(API_URL, {query: "token="+token});

    socket.on(SOCKET_EVENT.initSuccess, ()=>{
        console.log('initSuccess');
        joinRooms(rooms);
    })

    socket.on(SOCKET_EVENT.joinRoomSuccess, ()=>{
        console.log('joinRoomSuccess');
    })
   
    socket.on(SOCKET_EVENT.joinRoomFail, ()=>{
        console.log('joinRoomFail');
        joinRooms(rooms);
    })
    socket.on(SOCKET_EVENT.serverReceivedMsg, (uniqueId)=>{
        console.log(SOCKET_EVENT.serverReceivedMsg,uniqueId);
    })
    socket.on(SOCKET_EVENT.clientReceivedMsg, (uniqueId)=>{
        console.log(SOCKET_EVENT.clientReceivedMsg,uniqueId);
        store.dispatch(actions.msgResponseAction({sent:true,device_uniqid:uniqueId}));
    })
    socket.on(SOCKET_EVENT.sendMessageFail, (data)=>{
        console.log(SOCKET_EVENT.sendMessageFail,data);
    })
    socket.on(SOCKET_EVENT.messageReceived, (data)=>{
        console.log(SOCKET_EVENT.messageReceived, data);
        store.dispatch(actions.msgResponseAction(data));
    })
    socket.on(SOCKET_EVENT.updateList, ()=>{
        console.log(SOCKET_EVENT.updateList);
        refreshRooms();
    })
}

function sendMsg(id,text,uniqueId){
    if(text != ""){ 
      socket.emit(SOCKET_ACTION.messageText, id, text, uniqueId);
    }
}

async function sendFile(mode,id,uri,uniqueId){

    const type = mime.lookup(uri.split('.').pop()); 
    const name = uri.split('/').pop();
    const file = await FileSystem.readAsStringAsync(uri,{ encoding: FileSystem.EncodingType.Base64 });
    let action;

    switch(mode) {
        case 'image':
            action = SOCKET_ACTION.messageImage;
            break;
        case 'video':
            action = SOCKET_ACTION.messageVideo;
            break;
        case 'audio':
            action = SOCKET_ACTION.messageAudio;
            break;
      }

    socket.emit(action, id, name, type, 'data:'+type+';base64,'+file, uniqueId);
}

function kickMember(users){
    users.forEach(user=>{
        console.log(user.id);
        socket.emit(SOCKET_ACTION.kickMember,user.id);
    })
}

function messageSystem(group){
    group.users.forEach(user=>{
        console.log(user.id);
        socket.emit(SOCKET_ACTION.messageSystem,group.id,user.id);
    })
}
