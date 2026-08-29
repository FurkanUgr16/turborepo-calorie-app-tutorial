import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SectionHeader } from "@/components/base/section-header";
import { Typography } from "heroui-native";

const MEAL_ICONS: Record<
  string,
  React.ComponentProps<typeof Ionicons>["name"]
> = {
  breakfast: "sunny-outline",
  lunch: "partly-sunny-outline",
  dinner: "moon-outline",
  snack: "cafe-outline",
  unknown: "restaurant-outline",
};

export interface MealDistributionProps {
  mealTypes: Array<{ type: string; calories: number; count: number }>;
}

export const MealDistribution: React.FC<MealDistributionProps> = ({
  mealTypes,
}) => {
  if (mealTypes.length === 0) return null;

  const totalCal = mealTypes.reduce((s, m) => s + m.calories, 0);

  return (
    <View className="px-5 mt-5">
      <SectionHeader title="Meal Distribution" iconName="pie-chart" />
      <View className="bg-surface p-5 rounded-3xl border border-border/40 gap-3">
        {mealTypes.map((mt) => {
          const percent =
            totalCal > 0 ? Math.round((mt.calories / totalCal) * 100) : 0;
          const iconName = MEAL_ICONS[mt.type] || "restaurant-outline";

          return (
            <View key={mt.type} className="gap-1.5">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <Ionicons name={iconName} size={14} color="#2ab3b1" />
                  <Typography
                    type="body-sm"
                    className="text-foreground font-inter capitalize"
                  >
                    {mt.type}
                  </Typography>
                  <Typography
                    type="body-xs"
                    className="text-foreground font-inter"
                  >
                    ({mt.count})
                  </Typography>
                </View>
                <Typography
                  type="body-sm"
                  className="text-heading font-semibold font-inter"
                >
                  {mt.calories} kcal
                </Typography>
              </View>
              <View className="h-1.5 bg-border/30 rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary-light rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
