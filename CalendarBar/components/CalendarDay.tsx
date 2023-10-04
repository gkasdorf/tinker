import React, { useCallback, useEffect, useMemo } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
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

  const boxBackgroundColor = useSharedValue(
    calendarBar.selectedDate === date
      ? calendarBar.dayColor
      : calendarBar.selectedDayColor
  );

  useEffect(() => {
    if (
      calendarBar.selectedDate !== date &&
      boxBackgroundColor.value === calendarBar.selectedDayColor
    ) {
      boxBackgroundColor.value = withTiming(calendarBar.dayColor, {
        duration: 100,
      });
    }
  }, [calendarBar.selectedDate]);

  const onPress = useCallback(() => {
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

    runOnJS(onPress)();
  };

  const pressGesture = Gesture.Tap()
    .onBegin(onTapBegin)
    .onTouchesCancelled(onTapCancelled)
    .onEnd(onTapEnd);

  const textStyle = useMemo(
    () => ({
      color:
        calendarBar.selectedDate === date
          ? calendarBar.textColor
          : calendarBar.selectedTextColor,
    }),
    [calendarBar.selectedDate]
  );

  const boxStyle = useAnimatedStyle(() => ({
    backgroundColor: boxBackgroundColor.value,
  }));

  return (
    <GestureDetector gesture={pressGesture}>
      <View style={styles.container}>
        <Animated.View style={[styles.box, boxStyle]}>
          <Text style={textStyle}>{date.getDay()}</Text>
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
