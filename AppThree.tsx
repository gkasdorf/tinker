import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Video from "react-native-video";

function AppThree() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Video
        source={{
          uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        }}
        controls
        style={{
          height: 250,
          width: "100%",
        }}
        onLoadStart={() => {}}
        paused
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "20%",
  },
});

export default AppThree;
