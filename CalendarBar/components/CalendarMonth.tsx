import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useCalendarBar } from "./CalendarBar";

export function CalendarMonth() {
  const calendarBar = useCalendarBar();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {calendarBar.selectedDate.toLocaleString("en-us", {
          month: "long",
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
