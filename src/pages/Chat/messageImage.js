import React, { Component } from 'react';
import { Image, StyleSheet, View, } from 'react-native';
import Lightbox from '@/components/Lightbox';
const max_height = 120;
const max_width = 150;
const styles = StyleSheet.create({
    container: {},
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
export default class MessageImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
          };
    }

    render() {
        const { currentMessage } = this.props;
        Image.getSize(currentMessage.image, (w, h) => { 
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
         });
        //  console.log(this.state.width,this.state.height);
        if (!!currentMessage) {
            return (
                <View style={[styles.container]}>
                <Lightbox activeProps={{
                        style: styles.imageActive,
                    }} >
                    <Image style={[styles.image,{ width:this.state.width, height:this.state.height}]} source={{ uri: currentMessage.image }}/>
                </Lightbox>
                </View>
            );
        }
        return null;
    }
}
