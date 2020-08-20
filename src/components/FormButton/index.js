import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export default function FormButton({ title, modeValue, addStyle, ...rest }) {
  return (
    <Button
      mode={modeValue}
      {...rest}
      style={[styles.buttons, addStyle]}
      color={'#A24982'}
      contentStyle={styles.buttonContainer}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    // marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    height: height / 17,
  }
});