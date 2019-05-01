import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimations,
  ViroARPlaneSelector,
  ViroARSceneNavigator,
  ViroARScene,
  ViroConstants,
  ViroQuad,
  ViroSpotLight,
  ViroText
} from 'react-viro';
import BackButton from './BackButton';
import { API_KEY } from '../config';

export default class extends Component {
  state = { loading: false, runAnimation: false, tracking: false };

  onInitialized = (state, reason) => {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({ tracking: true });
    }
  };

  renderARScene = () => {
    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        <ViroAmbientLight color="#FFFFFF" intensity={150} />
        {this.state.tracking && (
          <ViroARPlaneSelector>
            <ViroSpotLight
              innerAngle={5}
              outerAngle={45}
              direction={[0, -1, -0.2]}
              position={[0, 3, 1]}
              color="#ffffff"
              castsShadow={true}
              shadowMapSize={2048}
              shadowNearZ={2}
              shadowFarZ={5}
              shadowOpacity={0.5}
            />
            <Viro3DObject
              source={require('./res/dino.vrx')}
              position={[0, 0, 0]}
              scale={[0.1, 0.1, 0.1]}
              type="VRX"
              onClick={() => this.setState({ runAnimation: true })}
              animation={{
                name: 'move',
                run: this.state.runAnimation,
                loop: true
              }}
              onLoadStart={() => this.setState({ loading: true })}
              onLoadEnd={() => this.setState({ loading: false })}
            />
            {this.state.loading && (
              <ViroText
                text="Loading..."
                extrusionDepth={3}
                position={[0, 0, 0]}
              />
            )}
            <ViroQuad
              position={[0, 0, 0]}
              rotation={[-90, 0, 0]}
              width={4}
              height={4}
              arShadowReceiver={true}
            />
          </ViroARPlaneSelector>
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

ViroAnimations.registerAnimations({
  move: {
    properties: {
      positionZ: '+=0.2'
    },
    duration: 1000
  }
});
