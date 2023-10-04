import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ReactMarkdown from "react-markdown";
import AppTwo from "./AppTwo";
import AppThree from "./AppThree";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppFour from "./AppFour";

export default AppFour;

function AppOne() {
  const text = `
  # Header
  ## Header two
  
  Some text
  
  *italic*
  
  **bold**
  `;

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>
          <ReactMarkdown
            children={text}
            components={{ p: Text, h1: Hone, h2: Htwo, strong: Htwo, em: Htwo }}
          />
        </Text>
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

function Hone({ children }) {
  return <Text style={{ fontSize: 30 }}>{children}</Text>;
}

function Htwo({ children }) {
  return <Text style={{ fontSize: 20 }}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
