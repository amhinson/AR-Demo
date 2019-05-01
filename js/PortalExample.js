import React, { Component } from "react";
import { View } from "react-native";
import {
  Viro360Image,
  Viro360Video,
  Viro3DObject,
  ViroAmbientLight,
  ViroARSceneNavigator,
  ViroARScene,
  ViroConstants,
  ViroPortal,
  ViroPortalScene,
  ViroText
} from "react-viro";
import BackButton from "./BackButton";
import { API_KEY } from "../config";

export default class extends Component {
  state = { loading: false, tracking: false };

  onInitialized = (state, reason) => {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({ tracking: true });
    }
  };

  renderARScene = () => {
    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        {this.state.loading && (
          <ViroText
            text="Loading..."
            extrusionDepth={3}
            position={[0, 0, 0 - 1]}
          />
        )}
        {this.state.tracking && (
          <ViroPortalScene passable={true}>
            <ViroPortal position={[0, 0, -1]} scale={[0.1, 0.1, 0.1]}>
              <Viro3DObject
                source={require("./res/portal_ship/portal_ship.vrx")}
                resources={[
                  require("./res/portal_ship/portal_ship_diffuse.png"),
                  require("./res/portal_ship/portal_ship_normal.png"),
                  require("./res/portal_ship/portal_ship_specular.png")
                ]}
                type="VRX"
                onLoadStart={() => this.setState({ loading: true })}
                onLoadEnd={() => this.setState({ loading: false })}
              />
            </ViroPortal>
            {/* <Viro360Image source={require('./res/joshua_tree.jpg')} /> */}
            <Viro360Video source={require("./res/ski.mp4")} loop={true} />
          </ViroPortalScene>
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
