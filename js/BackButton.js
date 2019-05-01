import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

const BackButton = props => {
  return (
    <TouchableOpacity
      hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
      onPress={() => props.navigation.goBack()}
      style={styles.container}
    >
      <Image source={require('./res/backArrow.png')} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    position: 'absolute',
    top: 30,
    left: 15
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  }
});

export default withNavigation(BackButton);
