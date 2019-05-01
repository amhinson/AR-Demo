import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  ViroAnimations,
  ViroARObjectMarker,
  ViroARSceneNavigator,
  ViroARScene,
  ViroARTrackingTargets,
  ViroConstants,
  ViroNode,
  ViroText
} from 'react-viro';
import BackButton from './BackButton';
import { API_KEY } from '../config';

const TARGETS = [
  { displayText: 'TV', targetName: 'tvRemote' },
  { displayText: 'DVD', targetName: 'dvdRemote' }
];

export default class extends Component {
  renderARScene = () => {
    return (
      <ViroARScene>
        {TARGETS.map(target => (
          <ViroARObjectMarker target={target.targetName}>
            <ViroText
              text={target.displayText}
              extrusionDepth={2}
              scale={[0.15, 0.15, 0.15]}
              position={[0, 0.1, 0]}
              textAlign="center"
              style={{
                fontFamily: 'Roboto',
                color: 'white',
                fontWeight: '600'
              }}
            />
          </ViroARObjectMarker>
        ))}
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

ViroARTrackingTargets.createTargets({
  tvRemote: {
    source: require('./res/tvRemote.arobject'),
    type: 'Object'
  },
  dvdRemote: {
    source: require('./res/dvdRemote.arobject'),
    type: 'Object'
  }
});
