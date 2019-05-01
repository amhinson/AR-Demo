import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  ViroAmbientLight,
  ViroARScene,
  ViroARSceneNavigator,
  ViroBox,
  ViroConstants,
  ViroMaterials
} from 'react-viro';
import BackButton from './BackButton';
import { API_KEY } from '../config';

export default class HelloWorldSceneAR extends Component {
  state = {
    dollarBills: [],
    interval: null,
    score: 0,
    tracking: false
  };

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  startGame = () => {
    let interval = setInterval(this.addRandomBill, 1000);
    this.setState({ interval });
  };

  addRandomBill = () => {
    this.setState(({ dollarBills }) => ({
      dollarBills: [
        ...dollarBills,
        {
          position: [
            this.randomDecimalNumber(-2, 2),
            this.randomDecimalNumber(-2, 2),
            this.randomDecimalNumber(-2, 2)
          ],
          rotation: [
            this.randomDecimalNumber(-45, 45),
            this.randomDecimalNumber(-45, 45),
            this.randomDecimalNumber(-45, 45)
          ]
        }
      ]
    }));
  };

  randomDecimalNumber = (min, max) =>
    Math.random() * (Math.random() < 0.5 ? min : max);

  bumpScore = () => {
    this.setState(({ score }) => {
      return { score: score + 1 };
    });
  };

  onDollarSelect = index => {
    this.setState(({ dollarBills }) => {
      const newDollarBills = [...dollarBills];
      newDollarBills.splice(index, 1);
      this.bumpScore();
      return { dollarBills: newDollarBills };
    });
  };

  onInitialized = (state, reason) => {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({ tracking: true });
      this.startGame();
    }
  };

  renderARScene = () => {
    const { dollarBills, tracking } = this.state;
    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        <ViroAmbientLight color="#ffffff" />
        {tracking &&
          dollarBills.map((item, index) => (
            <ViroBox
              key={index}
              position={item.position}
              rotation={item.rotation}
              onClick={() => this.onDollarSelect(index)}
              height={0.2}
              length={0.01}
              width={0.6}
              materials={['face']}
            />
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
        <Text style={styles.score}>Score: {this.state.score}</Text>
        <TouchableOpacity
          onPress={() => this.setState({ score: 0 })}
          style={styles.restartContainer}
        >
          <Text style={styles.restart}>Restart</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ViroMaterials.createMaterials({
  face: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    diffuseTexture: require('./res/DollarFront.JPG')
  }
});

const styles = StyleSheet.create({
  score: {
    position: 'absolute',
    alignSelf: 'center',
    color: 'white',
    fontSize: 50,
    marginTop: 30
  },
  restart: {
    color: 'white',
    fontSize: 30
  },
  restartContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 30
  }
});

module.exports = HelloWorldSceneAR;
