import React, {useState, useEffect } from 'react';
import { Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import MessageMediaFull from '@/pages/Chat/messageMediaFull';
import {Video} from 'expo-av';
const max_height = 120;
const max_width = 150;
const styles = StyleSheet.create({
    container: {
        margin: 0,
        alignItems:'center',
        justifyContent:'center',
    },
    empty: {
        position:'absolute',
        top:0,
        backgroundColor:'rgba(0,0,0,0.2)',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent: 'center',
    }
});

export default function MessageVideo(props){
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const [widthFull, setWidthFull] = useState(null);
    const [heightFull, setHeightFull] = useState(null);
    const [full, setFull] = useState(false);
    
    const {currentMessage} = props;

    const set_size = (data) => {
        console.log('running');
        let w=data.naturalSize.width;
        let h=data.naturalSize.height;
        let ratio = w/h;
        if(w>h) {
            h = max_width/ratio;
            w = max_width;
        }
        else{
            w = max_height*ratio;
            h = max_height;
        }
        setWidth(w);
        setHeight(h);
        // if(ratio>1) {
        //     setWidthFull('100%')
        // }
    }

    if (!!currentMessage) {
        return (
            <>
            {full?(
                <MessageMediaFull
                    content={(
                        <View style={{height:'50%',width:'100%'}}>
                            <Video
                                source={{ uri: currentMessage.video }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="contain"
                                shouldPlay={false}
                                useNativeControls={true}
                                // onReadyForDisplay={data => set_size(data)}
                                // resizeMode='Video.RESIZE_MODE_CONTAIN'
                                style={[styles.image,{ width:'100%', height:'100%'}]}
                            />
                        </View>
                    )}
                    close={()=>setFull(false)}
                />
            ):(
                <View style={[styles.container,{ width:width, height:height}]}>
                    <Video
                        source={{ uri: currentMessage.video }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="contain"
                        shouldPlay={false}
                        useNativeControls={false}
                        onReadyForDisplay={data => set_size(data)}
                        style={[styles.image,{ width:'100%', height:'100%'}]}
                    />
                    <TouchableOpacity onPress={()=>setFull(true)} style={styles.empty}>
                        <Image
                            source={require('@/img/video-play.png')}
                            style={{ width:'100%', height:'60%'}}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            )}
            </>
        );
    }
    return null;

}