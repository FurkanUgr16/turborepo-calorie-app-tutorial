import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeHeader from "@/components/containers/home-header";
import { Container } from "@/components/container";
import { CalorieRing } from "@/components/base/calorie-ring";
import MacroCard from "@/components/base/macro-card";
import { Typography } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { useGetMealsToday } from "@/hooks/use-meals";
import MealCard from "@/components/containers/meal-cards";
import { capitalizeFirst, formatTime, getMealName } from "@/lib/format";

const HomePage = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data, isLoading } = useGetMealsToday();

  const summary = data?.summary;
  const meals = data?.meals ?? [];

  return (
    <Container className=" bg-background">
      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        <HomeHeader />

        {isLoading && (
          <View className="items-center py-5">
            <ActivityIndicator size={"large"} color={"#2ab3b1"} />
          </View>
        )}

        <View className="items-center py-5">
          <CalorieRing
            consumed={Math.round(summary?.calories ?? 0)}
            goal={2000}
          />
        </View>

        <View className="flex-row gap-2.5">
          <MacroCard
            label="Protein"
            value={String(Math.round(summary?.protein_g ?? 0))}
            unit="g"
          />
          <MacroCard
            label="Fat"
            value={String(Math.round(summary?.fat_g ?? 0))}
            unit="g"
          />
          <MacroCard
            label="Carbs"
            value={String(Math.round(summary?.carbs_g ?? 0))}
            unit="g"
          />
        </View>

        <View className="mt-10">
          <View className="flex-row items-center justify-between mb-3">
            <Typography type="h3" className="font-inter">
              Recent Meals
            </Typography>
            <TouchableOpacity
              onPress={() =>
                router.navigate({
                  pathname: "/(tabs)/diary",
                })
              }
            >
              <Typography
                type="body-sm"
                className="text-primary-light font-semibold font-inter"
              >
                View All
              </Typography>
            </TouchableOpacity>
          </View>

          {meals.length === 0 ? (
            <View className="items-center py-8">
              <View
                className="w-14 h-14 rounded-full items-center justify-center mb-3"
                style={{ backgroundColor: "rgba(42, 179, 177, 0.1)" }}
              >
                <Ionicons name="restaurant-outline" size={24} color="#2ab3b1" />
              </View>
              <Typography
                type="h4"
                className="text-foreground font-inter text-center"
              >
                No meals logged today
              </Typography>
              <Typography
                type="body-sm"
                className="text-foreground font-inter mt-1"
              >
                Scan your first meal to get started
              </Typography>
            </View>
          ) : (
            meals.slice(0, 5).map((meal) => {
              const foodItems = meal.foodItems as Array<{
                name: string;
              }>;
              const nutrition = meal.nutrition as { calories: number };
              return (
                <MealCard
                  key={meal.id}
                  name={getMealName(foodItems)}
                  mealType={capitalizeFirst(meal.mealType)}
                  time={formatTime(meal.createdAt)}
                  calories={`${Math.round(nutrition.calories)} kcal`}
                  onPress={() =>
                    router.push({
                      pathname: "/meal/[id]",
                      params: { id: meal.id },
                    })
                  }
                />
              );
            })
          )}
        </View>
      </ScrollView>
    </Container>
  );
};

export default HomePage;
