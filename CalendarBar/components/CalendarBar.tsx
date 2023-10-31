import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { CalendarDay } from "./CalendarDay";
import { CalendarMonth } from "./CalendarMonth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createCalendar } from "../helpers";

interface ICalendarBarContext {
  startDate?: Date | undefined;
  endDate?: Date | undefined;

  selectedDate?: Date | undefined;
  setSelectedDate?: React.Dispatch<SetStateAction<Date>> | undefined;

  dayColor?: string | undefined;
  selectedDayColor?: string | undefined;
  pressedDayColor?: string | undefined;

  textColor?: string | undefined;
  selectedTextColor?: string | undefined;
}

const CalendarBarContext = React.createContext<ICalendarBarContext>({
  startDate: undefined,
  endDate: undefined,

  selectedDate: undefined,
  setSelectedDate: undefined,

  dayColor: undefined,
  selectedDayColor: undefined,
  pressedDayColor: undefined,

  textColor: undefined,
  selectedTextColor: undefined,
});

export const useCalendarBar = () => React.useContext(CalendarBarContext);

interface IProps {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  totalDays?: number | undefined;

  dayColor?: string | undefined;
  selectedDayColor?: string | undefined;
  pressedDayColor?: string | undefined;

  textColor?: string | undefined;
  selectedTextColor?: string | undefined;
}

const keyExtractor = (item: Date, index: number) => index.toString();

export function CalendarBar({ startDate, endDate, totalDays }: IProps) {
  const days = useMemo(() => {
    return createCalendar({
      startDate,
      endDate,
      totalDays,
    });
  }, [startDate, endDate, totalDays]);

  const [selectedDate, setSelectedDate] = useState<Date>(days[0]);

  const renderItem = useCallback((item: ListRenderItemInfo<Date>) => {
    return <CalendarDay date={item.item} />;
  }, []);

  return (
    <GestureHandlerRootView>
      <CalendarBarContext.Provider
        value={{
          startDate: startDate,
          endDate: endDate,

          selectedDate: selectedDate,
          setSelectedDate: setSelectedDate,

          dayColor: "#F2F2F2",
          selectedDayColor: "#FF5A5F",
          pressedDayColor: "#803134",

          textColor: "#000000",
          selectedTextColor: "#FFFFFF",
        }}
      >
        <View style={styles.container}>
          <CalendarMonth />
          <FlashList
            horizontal
            data={days}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            estimatedItemSize={60}
            style={styles.list}
          />
        </View>
      </CalendarBarContext.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    height: 60,
  },

  list: {
    width: "100%",
  },
});
