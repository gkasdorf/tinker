import React, { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useCalendarBar } from "./CalendarBar";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface IProps {
  date: Date;
}

export function CalendarDay({ date }: IProps) {
  const calendarBar = useCalendarBar();

  const boxBackgroundColor = useSharedValue(calendarBar.dayColor);
  const textColor = useSharedValue(calendarBar.textColor);

  useEffect(() => {
    if (
      calendarBar.selectedDate !== date &&
      boxBackgroundColor.value !== calendarBar.dayColor
    ) {
      boxBackgroundColor.value = calendarBar.dayColor;
      textColor.value = calendarBar.textColor;
    }
  }, [calendarBar.selectedDate]);

  const onPress = useCallback(() => {
    console.log(date);

    if (calendarBar.selectedDate === date) {
      return;
    }

    calendarBar.setSelectedDate(date);
  }, [date]);

  const onTapBegin = () => {
    "worklet";

    boxBackgroundColor.value = withTiming(calendarBar.pressedDayColor, {
      duration: 100,
    });
  };

  const onTapCancelled = () => {
    "worklet";

    boxBackgroundColor.value = withTiming(calendarBar.dayColor, {
      duration: 100,
    });
  };

  const onTapEnd = () => {
    "worklet";

    boxBackgroundColor.value = withTiming(calendarBar.selectedDayColor, {
      duration: 50,
    });
    textColor.value = withTiming(calendarBar.selectedTextColor, {
      duration: 50,
    });

    runOnJS(onPress)();
  };

  const pressGesture = Gesture.Tap()
    .onBegin(onTapBegin)
    .onTouchesCancelled(onTapCancelled)
    .maxDuration(60 * 1000)
    .onEnd(onTapEnd);

  const boxStyle = useAnimatedStyle(() => ({
    backgroundColor: boxBackgroundColor.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: textColor.value,
  }));

  return (
    <GestureDetector gesture={pressGesture}>
      <View style={styles.container}>
        <Animated.View style={[styles.box, boxStyle]}>
          <Animated.Text style={textStyle}>
            {date.toLocaleString("en-US", { day: "numeric" })}
          </Animated.Text>
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 3,
  },

  box: {
    borderRadius: 100,

    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
