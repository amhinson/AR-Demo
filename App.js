import React from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { createStackNavigator } from "react-navigation";

import TextExample from "./js/TextExample";
import ShapeExample from "./js/ShapeExample";
import ObjectExample from "./js/ObjectExample";
import PortalExample from "./js/PortalExample";
import ImageRecogExample from "./js/ImageRecogExample";
import TalkingImageExample from "./js/TalkingImageExample";
import ObjectRecogExample from "./js/ObjectRecogExample";
import MoneyMachine from "./js/MoneyMachine";

console.ignoredYellowBox = ["Warning"];

const EXAMPLES = [
  { name: "Text", screen: "TextExample" },
  { name: "Shapes", screen: "ShapeExample" },
  { name: "3d Object", screen: "ObjectExample" },
  { name: "Portal", screen: "PortalExample" },
  { name: "Image Recognition", screen: "ImageRecogExample" },
  { name: "Talking Image", screen: "TalkingImageExample" },
  { name: "Object Recognition", screen: "ObjectRecogExample" },
  { name: "Money Machine Game", screen: "MoneyMachine" }
];

class HomeScreen extends React.Component {
  state = {
    logoAnimation: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.logoAnimation, {
          toValue: 15,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(this.state.logoAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Animated.Image
          source={require("./js/res/mark.png")}
          style={[
            styles.logo,
            {
              transform: [{ translateY: this.state.logoAnimation }]
            }
          ]}
        />
        {EXAMPLES.map((example, index) => (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(example.screen)}
            style={styles.buttonRow}
            key={index}
          >
            <Text style={styles.text}>{example.name}</Text>
            <Image
              source={require("./js/res/backArrow.png")}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        ))}
        <Text style={styles.airshipText}>Airship, LLC</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  airshipText: {
    color: "#adb1ba",
    marginTop: 20,
    fontSize: 17,
    fontWeight: "600",
    alignSelf: "center"
  },
  arrowIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    tintColor: "#CFD5DB",
    transform: [{ rotate: "180deg" }]
  },
  buttonRow: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "white",
    borderRadius: 5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#f2f2f2",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container: {
    flex: 1,
    backgroundColor: "#EBEDF2"
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    marginTop: 40,
    marginBottom: 40,
    alignSelf: "center"
  },
  text: {
    color: "#43484E",
    fontSize: 18,
    fontWeight: "600"
  }
});

export default createStackNavigator(
  {
    Home: { screen: HomeScreen },
    TextExample: { screen: TextExample },
    ShapeExample: { screen: ShapeExample },
    ObjectExample: { screen: ObjectExample },
    PortalExample: { screen: PortalExample },
    ImageRecogExample: { screen: ImageRecogExample },
    TalkingImageExample: { screen: TalkingImageExample },
    ObjectRecogExample: { screen: ObjectRecogExample },
    MoneyMachine: { screen: MoneyMachine }
  },
  {
    headerMode: "none"
  }
);
