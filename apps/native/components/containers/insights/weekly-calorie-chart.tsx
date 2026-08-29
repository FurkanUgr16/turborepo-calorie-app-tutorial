import React from "react";
import { View } from "react-native";
import { Typography } from "heroui-native";
import { SectionHeader } from "@/components/base/section-header";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return DAY_LABELS[d.getDay()];
}

export interface WeeklyCalorieChartProps {
  data: Array<{ date: string; calories: number }>;
  maxCalories: number;
}

export const WeeklyCalorieChart: React.FC<WeeklyCalorieChartProps> = ({
  data,
  maxCalories,
}) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <View className="px-5 mt-5">
      <SectionHeader title="Weekly Calories" iconName="bar-chart" />
      <View className="bg-surface p-5 rounded-3xl border border-border/40">
        <View className="flex-row items-end justify-between gap-2">
          {data.map((day) => {
            const heightPercent =
              maxCalories > 0 ? (day.calories / maxCalories) * 100 : 0;
            const isToday = day.date === today;

            return (
              <View key={day.date} className="flex-1 items-center gap-2">
                <Typography
                  type="body-xs"
                  className="text-foreground font-inter"
                >
                  {day.calories > 0
                    ? Math.round((day.calories / 1000) * 10) / 10 + "k"
                    : "-"}
                </Typography>
                <View className="w-full h-30 justify-end items-center">
                  <View
                    className={`w-full rounded-t-md ${
                      isToday ? "bg-primary-light" : "bg-primary-light/30"
                    }`}
                    style={{
                      height: `${Math.max(heightPercent, day.calories > 0 ? 8 : 4)}%`,
                    }}
                  />
                </View>
                <Typography
                  type="body-xs"
                  className={`font-inter ${
                    isToday
                      ? "text-primary-light font-semibold"
                      : "text-foreground"
                  }`}
                >
                  {formatShortDate(day.date)}
                </Typography>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
