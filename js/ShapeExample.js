import React, { Component } from 'react';
import { View } from 'react-native';
import {
  ViroAmbientLight,
  ViroAnimations,
  ViroARSceneNavigator,
  ViroARScene,
  ViroBox,
  ViroConstants,
  ViroDirectionalLight,
  ViroMaterials,
  ViroSphere
} from 'react-viro';
import BackButton from './BackButton';
import { API_KEY } from '../config';

export default class extends Component {
  state = {
    x: 0,
    y: 0,
    z: -0.75,
    tracking: false
  };

  onInitialized = (state, reason) => {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({ tracking: true });
    }
  };
  renderARScene = () => {
    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        <ViroAmbientLight color="#FFFFFF" intensity={150} />
        <ViroDirectionalLight
          color="#FFFFFF"
          direction={[0.5, -1, 0.5]}
          shadowOrthographicPosition={[0, 3, -5]}
          shadowOrthographicSize={10}
          shadowNearZ={2}
          shadowFarZ={9}
          castsShadow={true}
        />
        {this.state.tracking && (
          <ViroSphere
            radius={0.2}
            onDrag={position =>
              this.setState({ x: position[0], y: position[1], z: position[2] })
            }
            position={[this.state.x, this.state.y, this.state.z]}
            materials={['moon']}
            animation={{ name: 'spin', run: true, loop: true }}
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

ViroMaterials.createMaterials({
  white: {
    lightingModel: 'Blinn',
    diffuseColor: 'rgb(231,231,231)'
  },
  moon: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    diffuseTexture: require('./res/moon.jpg')
  }
});

ViroAnimations.registerAnimations({
  spin: {
    properties: {
      rotateY: '+=45'
    },
    duration: 2000
  }
});
