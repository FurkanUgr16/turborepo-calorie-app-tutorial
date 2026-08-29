import { SectionHeader } from "@/components/base/section-header";
import DailySummaryCard from "@/components/containers/daily-summary-card";
import DateNavigator from "@/components/containers/date-navigator";
import MealCard from "@/components/containers/meal-cards";
import { ThemeToggle } from "@/components/theme-toggle";
import { useGetMealByDate } from "@/hooks/use-meals";
import {
  capitalizeFirst,
  formatDate,
  formatTime,
  getMealName,
} from "@/lib/format";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Typography } from "heroui-native";
import { useMemo, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MEAL_ORDER = ["breakfast", "lunch", "dinner", "snack", "unknown"];

const Diary = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const { data, isLoading } = useGetMealByDate(selectedDate);
  const insets = useSafeAreaInsets();

  const meals = data?.meals ?? [];

  const changeDate = (direction: number) => {
    const current = new Date(selectedDate + "T00:00:00");
    current.setDate(current.getDate() + direction);
    setSelectedDate(formatDate(current));
  };

  const totals = useMemo(() => {
    return meals.reduce(
      (acc, m) => {
        const n = m.nutrition as {
          calories: number;
          protein_g: number;
          carbs_g: number;
          fat_g: number;
        };
        return {
          calories: acc.calories + (n?.calories ?? 0),
          protein_g: acc.protein_g + (n?.protein_g ?? 0),
          carbs_g: acc.carbs_g + (n?.carbs_g ?? 0),
          fat_g: acc.fat_g + (n?.fat_g ?? 0),
        };
      },
      { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 },
    );
  }, [meals]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof meals> = {};
    for (const m of meals) {
      const type = m.mealType || "unknown";
      if (!groups[type]) groups[type] = [];
      groups[type].push(m);
    }
    return MEAL_ORDER.filter((t) => groups[t]).map((t) => ({
      type: t,
      meals: groups[t],
    }));
  }, [meals]);

  return (
    <View
      className="flex-1 bg-background px-6"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between pb-4">
          <Typography type="h2" className="text-heading font-bold font-inter">
            Profile
          </Typography>
          <ThemeToggle />
        </View>

        <DateNavigator
          selectedDate={selectedDate}
          onPrev={() => changeDate(-1)}
          onNext={() => changeDate(1)}
        />

        {isLoading ? (
          <View className="items-center py-10">
            <ActivityIndicator size="large" color="#2ab3b1" />
          </View>
        ) : meals.length === 0 ? (
          <View className="items-center py-16">
            <View
              className="w-16 h-16 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: "rgba(42, 179, 177, 0.1)" }}
            >
              <Ionicons name="book-outline" size={28} color="#2ab3b1" />
            </View>
            <Typography type="body" className="text-foreground">
              No meals logged this day
            </Typography>
          </View>
        ) : (
          <>
            <DailySummaryCard
              calories={totals.calories}
              proteinG={totals.protein_g}
              carbsG={totals.carbs_g}
              fatG={totals.fat_g}
            />

            {grouped.map(({ type, meals: groupMeals }) => (
              <View key={type} className="mt-4">
                <SectionHeader
                  title={capitalizeFirst(type)}
                  iconName="restaurant"
                />
                {groupMeals.map((m) => {
                  const foodItems = m.foodItems as Array<{ name: string }>;
                  const nutrition = m.nutrition as { calories: number };

                  return (
                    <MealCard
                      key={m.id}
                      name={getMealName(foodItems)}
                      mealType={capitalizeFirst(type)}
                      time={formatTime(m.createdAt)}
                      calories={`${Math.round(nutrition.calories)} kcal`}
                      onPress={() =>
                        router.push({
                          pathname: "/meal/[id]",
                          params: { id: m.id },
                        })
                      }
                    />
                  );
                })}
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Diary;
