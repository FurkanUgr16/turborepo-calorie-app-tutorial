import { MealDetailHeader } from "@/components/containers/meals/meal-detail-header";
import { MealInfoSection } from "@/components/containers/meals/meal-info-section";
import { MealNutritionCard } from "@/components/containers/meals/meal-nutrition-card";
import { Button } from "@/components/ui/button";
import { useGetMealById } from "@/hooks/use-meals";
import { capitalizeFirst, formatDateTime, getMealName } from "@/lib/format";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Typography } from "heroui-native";
import { useMemo } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Share,
  Image,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MealDetailsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; source?: string }>();
  const insets = useSafeAreaInsets();
  const { data: meal, isLoading } = useGetMealById(params.id);

  const isFromAnalysis = params.source === "result";

  const derived = useMemo(() => {
    if (!meal) return null;

    const foodItems =
      (meal.meal.foodItems as Array<{ name: string; confidence: number }>) ??
      [];
    const nutrition = meal.meal.nutrition as {
      calories: number;
      protein_g: number;
      carbs_g: number;
      fat_g: number;
    };
    const dietaryTags = (meal.meal.dietaryTags as string[]) ?? [];
    const confidence =
      foodItems.length > 0
        ? Math.round(
            (foodItems.reduce((acc, item) => acc + (item.confidence ?? 0), 0) /
              foodItems.length) *
              100,
          )
        : 0;

    return {
      foodItems,
      nutrition,
      dietaryTags,
      title: getMealName(foodItems),
      confidence,
    };
  }, [meal]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#2ab3b1" />
      </View>
    );
  }

  if (!meal || !derived) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Typography
          type="h3"
          className="text-center font-bold text-heading font-inter"
        >
          Meal not found
        </Typography>
        <Typography className="mt-3 text-center leading-5.5 text-foreground font-inter">
          This meal may have been removed or could not be loaded right now.
        </Typography>
        <Button
          onPress={() => router.replace("/(tabs)/diary")}
          className="mt-8 w-full"
        >
          <Button.Label className="text-[18px] font-bold text-white font-inter">
            Return to Diary
          </Button.Label>
        </Button>
      </View>
    );
  }

  const { nutrition, title, dietaryTags, foodItems, confidence } = derived;
  const imageUri = meal.meal.imageUrl ?? undefined;

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="pb-6">
          <MealDetailHeader
            title={title}
            isFromAnalysis={isFromAnalysis}
            onBack={() => router.back()}
            onShare={async () => {
              await Share.share({
                message: `${title} • ${Math.round(nutrition.calories)} kcal`,
              });
            }}
          />

          <View className="overflow-hidden rounded-[34px] border border-border/40 bg-surface">
            <View className="relative h-90">
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  resizeMode="cover"
                  className="h-full w-full"
                />
              ) : (
                <LinearGradient
                  colors={["#e9f7f6", "#f8f9fa"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ flex: 1 }}
                />
              )}

              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(13,15,18,0.08)",
                  "rgba(13,15,18,0.78)",
                ]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{ position: "absolute", inset: 0 }}
              />

              <View className="absolute inset-x-0 bottom-0 p-5">
                <View className="mb-3 self-start rounded-full bg-primary/85 px-4 py-2">
                  <Text className="text-[11px] font-bold uppercase tracking-[1.8px] text-white font-inter">
                    {isFromAnalysis
                      ? "Analysis complete"
                      : `${capitalizeFirst(meal.meal.mealType)} log`}
                  </Text>
                </View>

                <Text className="max-w-[88%] text-[36px] font-bold leading-[40px] text-white font-inter">
                  {title}
                </Text>
                <Text className="mt-2 text-[14px] text-white/80 font-inter">
                  {formatDateTime(meal.meal.createdAt)} • AI confidence{" "}
                  {confidence}%
                </Text>
              </View>
            </View>

            <View className="gap-5 p-5">
              {isFromAnalysis ? (
                <View className="rounded-[26px] bg-primary-light/10 px-4 py-4">
                  <Typography className="mb-2 text-primary-light">
                    Saved To Diary
                  </Typography>
                  <Typography
                    type="body-sm"
                    className="text-foreground font-inter"
                  >
                    Your meal was analyzed and stored successfully. You can
                    review the nutrition, ingredients, and notes here anytime.
                  </Typography>
                </View>
              ) : null}

              <MealNutritionCard
                calories={nutrition.calories}
                proteinG={nutrition.protein_g}
                carbsG={nutrition.carbs_g}
                fatG={nutrition.fat_g}
                confidence={confidence}
              />

              <MealInfoSection
                mealType={meal.meal.mealType}
                portionEstimate={meal.meal.portionEstimate}
                healthNotes={meal.meal.healthNotes}
                foodItems={foodItems}
                dietaryTags={dietaryTags}
              />

              <Button
                onPress={() => router.replace("/(tabs)/diary")}
                className="mt-2 h-16 w-full"
              >
                <Button.Label className="text-[20px] font-bold text-white font-inter">
                  {isFromAnalysis ? "Open Diary" : "Back to Diary"}
                </Button.Label>
              </Button>

              {isFromAnalysis ? null : (
                <Pressable
                  onPress={() => router.replace("/(tabs)/scan")}
                  className="items-center py-2"
                >
                  <Text className="text-[14px] font-semibold text-foreground font-inter">
                    Scan Another Meal
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MealDetailsScreen;
