import React from 'react';
import { View, Text, StyleSheet, Dimensions,Modal,TouchableOpacity  } from 'react-native';

export default function MessageMediaFull({content,close}) {

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={true}
        >
            <View style={styles.container}>
                {content}
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={()=>close()}>
                <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.downloadButtonText}>下載</Text>
            </TouchableOpacity>

        </Modal>
    );
  }
  
const styles = StyleSheet.create({
container: {
    position:'absolute',
    top:0,
    left:0,
    // paddingVertical:50,
    height:Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(64,40,61,1)',
    justifyContent: 'center',
    alignItems: 'center'
},
downloadButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginBottom:10,
    marginLeft:10,
  },
downloadButtonText: {
    fontSize: 25,
    color: 'white',
    lineHeight: 40,
    textAlign: 'center',
},
closeButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop:10,
    marginLeft:15,
},
closeButtonText: {
    fontSize: 35,
    color: 'white',
    lineHeight: 40,
    textAlign: 'center',
},
});


