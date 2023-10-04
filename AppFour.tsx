import React from "react";
import { CalendarBar } from "./CalendarBar";
import { View, StyleSheet } from "react-native";

function AppFour() {
  return (
    <View style={styles.container}>
      <CalendarBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 100,
    flex: 1,
  },
});

export default AppFour;
