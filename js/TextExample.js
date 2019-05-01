import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroConstants,
  ViroText
} from 'react-viro';
import BackButton from './BackButton';
import { API_KEY } from '../config';

export default class extends Component {
  state = { tracking: false };

  onInitialized = (state, reason) => {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({ tracking: true });
    }
  };

  renderARScene = () => {
    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        {this.state.tracking && (
          <ViroText
            text="Airship"
            position={[0, 0, -1]}
            extrusionDepth={3}
            style={{ fontFamily: 'proxima-nova', color: '#FF2A13' }}
          />
        )}
      </ViroARScene>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ViroARSceneNavigator
          apiKey={API_KEY}
          initialScene={{ scene: this.renderARScene }}
        />
        <BackButton />
      </View>
    );
  }
}
