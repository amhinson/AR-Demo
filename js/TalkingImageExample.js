import React, { Component } from "react";
import { Text, View } from "react-native";
import {
  ViroARImageMarker,
  ViroARSceneNavigator,
  ViroARScene,
  ViroARTrackingTargets,
  ViroConstants,
  ViroNode,
  ViroText,
  ViroVideo
} from "react-viro";
import BackButton from "./BackButton";
import { API_KEY } from "../config";

export default class extends Component {
  renderARScene = () => {
    return (
      <ViroARScene>
        <ViroARImageMarker target="cc">
          <ViroVideo
            source={require("./res/cc.mp4")}
            loop={true}
            rotation={[-90, 0, 0]}
            height={0.12}
            width={0.1534}
          />
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
  cc: {
    source: require("./res/cc_screenshot.png"),
    physicalWidth: 0.1524
  }
});
