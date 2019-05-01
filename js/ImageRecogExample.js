import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  ViroAnimations,
  ViroARImageMarker,
  ViroARSceneNavigator,
  ViroARScene,
  ViroARTrackingTargets,
  ViroConstants,
  ViroNode,
  ViroText
} from 'react-viro';
import BackButton from './BackButton';
import { API_KEY } from '../config';

export default class extends Component {
  state = { runAnimation: false };

  renderARScene = () => {
    return (
      <ViroARScene>
        <ViroARImageMarker
          target="airshipLogo"
          onAnchorFound={() =>
            this.setState({
              runAnimation: true
            })
          }
        >
          <ViroNode
            opacity={0}
            position={[0, -0.01, 0.05]}
            animation={{
              name: 'slideUp',
              run: this.state.runAnimation
            }}
          >
            <ViroText
              text="Airship"
              extrusionDepth={2}
              scale={[0.1, 0.1, 0.1]}
              rotation={[-90, 0, 0]}
              textAlign="center"
              animation={{
                name: 'rotate',
                run: this.state.runAnimation,
                loop: true
              }}
              style={{ fontFamily: 'proxima-nova', color: '#FF2A13' }}
            />
          </ViroNode>
        </ViroARImageMarker>
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
  airshipLogo: {
    source: require('./res/mark_with_bg.png'),
    orientation: 'Up',
    physicalWidth: 0.03
  }
});

ViroAnimations.registerAnimations({
  slideUp: {
    properties: {
      positionZ: 0,
      opacity: 1.0
    },
    easing: 'Bounce',
    duration: 700
  },
  rotate: {
    properties: {
      rotateZ: '+=45'
    },
    duration: 200
  }
});
