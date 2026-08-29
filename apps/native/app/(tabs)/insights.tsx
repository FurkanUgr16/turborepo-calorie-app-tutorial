import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWeeklyInsights } from "@/hooks/use-insights";
import { Ionicons } from "@expo/vector-icons";
import { SectionHeader } from "@/components/base/section-header";
import { StreakCard } from "@/components/containers/insights/streak-card";
import { Typography } from "heroui-native";
import { WeeklyCalorieChart } from "@/components/containers/insights/weekly-calorie-chart";
import MacroCard from "@/components/base/macro-card";
import { MealDistribution } from "@/components/containers/insights/meal-distrubition";

const Insights = () => {
  const insets = useSafeAreaInsets();
  const { data, isLoading } = useWeeklyInsights();

  const maxCalories = useMemo(() => {
    if (!data?.dailyCalories?.length) return 2000;
    const max = Math.max(...data.dailyCalories.map((d) => d.calories));
    return max || 2000;
  }, [data?.dailyCalories]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#2ab3b1" />
      </View>
    );
  }

  const hasData =
    data?.dailyCalories?.some((d) => d.calories > 0) ||
    (data?.mealTypes?.length ?? 0) > 0;

  if (!hasData) {
    return (
      <View className="flex-1 bg-background">
        <ScrollView
          contentContainerStyle={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5 pt-4 pb-2">
            <Text className="text-heading text-[24px] font-bold font-inter">
              Insights
            </Text>
          </View>
          <View className="items-center py-16">
            <View
              className="w-16 h-16 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: "rgba(42, 179, 177, 0.1)" }}
            >
              <Ionicons name="stats-chart" size={28} color="#2ab3b1" />
            </View>
            <Text className="text-muted-foreground text-[15px] font-inter text-center">
              Start logging meals to see your insights
            </Text>
            <Text className="text-muted-foreground text-[12px] font-inter mt-1">
              We'll show trends after a few days of tracking
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  const { dailyCalories, macros, streak, mealTypes } = data!;

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4 pb-2">
          <Typography type="h2" className="text-heading font-bold font-inter">
            Insights
          </Typography>
          <Typography type="body-sm" className="font-inter mt-0.5">
            Your nutrition trends from the past 7 days
          </Typography>
        </View>

        <View className="px-5 mt-3">
          <SectionHeader title="Streak" iconName="flame" />
          <StreakCard current={streak.current} longest={streak.longest} />
        </View>

        <WeeklyCalorieChart data={dailyCalories} maxCalories={maxCalories} />

        <View className="mt-5 px-5">
          <SectionHeader title="Daily Averages" iconName="nutrition" />
          <View className="flex-row gap-2.5">
            <MacroCard
              label="Protein"
              value={String(macros.avgProtein)}
              unit="g"
            />
            <MacroCard label="Carbs" value={String(macros.avgCarbs)} unit="g" />
            <MacroCard label="Fat" value={String(macros.avgFat)} unit="g" />
          </View>
          <View className="bg-surface mt-3 p-4 rounded-2xl border border-border/40 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Ionicons name="flash" size={16} color="#2ab3b1" />
              <Typography type="body-sm" className="text-foreground font-inter">
                Avg. daily calories
              </Typography>
            </View>
            <Text className="text-heading text-[17px] font-bold font-inter">
              {macros.avgCalories} kcal
            </Text>
          </View>
        </View>

        <MealDistribution mealTypes={mealTypes} />
      </ScrollView>
    </View>
  );
};

export default Insights;
