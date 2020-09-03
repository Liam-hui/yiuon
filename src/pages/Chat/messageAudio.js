import React from 'react';
import { View, StyleSheet,TouchableOpacity,Image,Slider} from 'react-native';
import { Audio} from 'expo-av';
import { Asset } from 'expo-asset';

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}
const ICON_THUMB = new Icon(require('./assets/images/thumb_1.png'), 10, 10);

export default class MessageAudio extends React.Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      outed: false,
      send: true,
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
    };
  }

  async _loadAudio() {
    const { sound, status } = await Audio.Sound.createAsync(
      {uri: this.props.currentMessage.audio},
      {shouldPlay: false},
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    // console.log(status);
  }

  _updateScreenForSoundStatus = status => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        isPlaying: status.isPlaying,
        isPlaybackAllowed: true,
        shouldPlay: status.shouldPlay,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _onPlayPausePressed = () => {
      // console.log(this.sound);
      if (this.sound != null) {
          if (this.state.isPlaying) {
          this.sound.pauseAsync();
          } else {
          this.sound.playAsync();
          }
      }
  };

  _getSeekSliderPosition() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  _onSeekSliderValueChange = value => {
    if (this.sound != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.sound.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.sound != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.soundDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.sound.playFromPositionAsync(seekPosition);
      } else {
        this.sound.setPositionAsync(seekPosition);
      }
    }
  };
  
  componentDidMount() {
    this._loadAudio();
  }

  render() {
    return(
        <View style={styles.audioContainer}>
            <Image
                source={require('@/img/voice_icon.png')}
                style={{ width:25, height:25, marginRight:3}}
                resizeMode="contain"
            />
            <TouchableOpacity onPress={ () => {
              this._onPlayPausePressed()
            }}>
                <Image
                  source={this.state.isPlaying ? require('@/img/voice_icon_fail_play.png') : require('@/img/voice_play.png')}
                  style={{ width:15, height:15, marginRight:5}}
                  resizeMode="contain"
                />
            </TouchableOpacity>
            <Slider
              // trackImage={ICON_TRACK_1.module}
              thumbImage={ICON_THUMB.module}
              style={styles.slider}
              value={this._getSeekSliderPosition()}
              onValueChange={this._onSeekSliderValueChange}
              onSlidingComplete={this._onSeekSliderSlidingComplete}
              // disabled={!this.state.isPlaybackAllowed || this.state.isLoading}
            />
        </View>
    );
   }
}

const styles = StyleSheet.create({
  audioContainer:{
      flexDirection:'row',
      alignItems: 'center',
      // backgroundColor: 'black',
    },
    slider:{
      width:80,
    },
});