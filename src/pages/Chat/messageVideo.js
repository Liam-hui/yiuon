import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import Lightbox from '@/components/Lightbox';
import {Video} from 'expo-av';
const max_height = 120;
const max_width = 150;
const styles = StyleSheet.create({
    container: {
        marginBottom:5,
    },
    image: {
        borderRadius: 13,
        margin: 3,
        resizeMode: 'contain'
    },
    imageActive: {
        flex: 1,
        resizeMode: 'contain',
        backgroundColor: '#342733',
    },
});
export default class MessageVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openen: false,
            width: 1,
            height: 1,
          };
    }

    set_size(data) {
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
            this.setState({
                width: w,
                height: h,
            });
    }

    update(data){
        // console.log(data);
    }

    render() {
        let width, height;
        const { currentMessage } = this.props;
        if (!!currentMessage) {
            return (
                <View style={[styles.container]}>
                    <Lightbox 
                        // style={{backgroundColor:'red'}}
                        activeProps={{
                            style: styles.imageActive,
                        }} 
                        onOpen={() => {
                            this.setState({
                                opened: true,
                            });
                            this.player_opened.setStatusAsync({ useNativeControls: true, shouldPlay: true });
                        }}
                        willClose={() => {
                            this.player_opened.stopAsync();
                            // this.player.setPositionAsync(1000);
                        }}

                        onClose={() => {
                            this.player.unloadAsync();
                            this.player.loadAsync({ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },  {}, false)
                        }}
                    >
                        <Video
                            // source={{ uri: currentMessage.image }
                            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                            ref={(ref) => {
                                if(this.state.opened) this.player_opened = ref;
                                    else this.player = ref;
                              }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            // resizeMode='Video.RESIZE_MODE_CONTAIN'
                            resizeMode="contain"
                            shouldPlay={false}
                            // useNativeControls={true}
                            // onPlaybackStatusUpdate={data => this.update(data)}
                            onReadyForDisplay={data => this.set_size(data)}
                            style={[styles.image,{ width:this.state.width, height:this.state.height}]}
                        />
                    </Lightbox>
                </View>
            );
        }
        return null;
    }
}
