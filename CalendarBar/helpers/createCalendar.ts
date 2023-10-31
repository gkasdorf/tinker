export interface CreateCalendarOptions {
  totalDays?: number;
  startDate?: Date | string | number;
  endDate?: Date | string | number;
}

const createBaseDate = (date: Date | string | number) => {
  const baseDate = new Date(date);
  baseDate.setHours(0, 0, 0, 0);
  return baseDate;
};

export const createCalendar = (options: CreateCalendarOptions) => {
  const calendar: Date[] = [];
  let totalDays: number = options.totalDays;

  const startDate = options.startDate
    ? new Date(options.startDate)
    : new Date();

  if (!totalDays) {
    if (!options.endDate) {
      totalDays = 60;
    } else {
      const end = new Date(options.endDate);

      totalDays = (end.getTime() - startDate.getTime()) / 86400000;
    }
  }

  for (let i = 0; i < totalDays; i++) {
    if (i === 0) {
      calendar.push(createBaseDate(startDate));
      continue;
    }
    calendar.push(createBaseDate(startDate.getTime() + i * 86400000));
  }

  return calendar;
};
