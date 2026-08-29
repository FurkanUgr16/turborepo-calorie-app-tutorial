import { MealAnalysisResponse } from "@calorie-ai-app/auth/schemas";
import { View, Text, ScrollView } from "react-native";
import { BottomSheet } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui/button";

interface AnalysisResultsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  analysis: MealAnalysisResponse | null;
  isSaving?: boolean;
  isSaved?: boolean;
  onSave: () => void;
}

const AnalysisResultsSheet = ({
  isOpen,
  onOpenChange,
  analysis,
  isSaving,
  isSaved,
  onSave,
}: AnalysisResultsSheetProps) => {
  if (!analysis) return null;

  const totalConfidence =
    analysis.food_items.length > 0
      ? Math.round(
          (analysis.food_items.reduce((acc, item) => acc + item.confidence, 0) /
            analysis.food_items.length) *
            100,
        )
      : 0;

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content
          snapPoints={["85%", "95%"]}
          backgroundClassName="bg-background"
        >
          <BottomSheet.Close />

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="px-5 pb-8 pt-2"
          >
            {/* Header Section */}
            <View className="mb-6 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="bg-primary-light/10 p-2.5 rounded-full">
                  <Ionicons name="sparkles" size={24} color="#2ab3b1" />
                </View>
                <View>
                  <Text className="text-heading text-[20px] font-bold font-inter leading-tight">
                    AI detected {analysis.food_items.length} items
                  </Text>
                  <Text className="text-foreground text-[14px] font-inter mt-0.5">
                    Your meal has been analyzed.
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-foreground text-[12px] font-inter">
                  Confidence
                </Text>
                <Text className="text-primary-light text-[18px] font-bold font-inter">
                  {totalConfidence}%
                </Text>
              </View>
            </View>

            {/* Food items */}
            <View className="mb-6">
              <Text className="text-heading text-[16px] font-semibold font-inter mb-3">
                Identified Items
              </Text>
              <View className="gap-3">
                {analysis.food_items.map((item, i) => (
                  <View
                    key={i}
                    className="flex-row justify-between items-center bg-surface p-4 rounded-2xl shadow-sm border border-border/40"
                  >
                    <View className="flex-row items-center gap-3">
                      <View className="w-10 h-10 rounded-full bg-primary-light/10 items-center justify-center">
                        <Ionicons name="restaurant" size={18} color="#2ab3b1" />
                      </View>
                      <View>
                        <Text className="text-foreground text-[16px] font-semibold font-inter">
                          {item.name}
                        </Text>
                        <Text className="text-foreground text-[13px] font-inter mt-0.5">
                          {Math.round(item.confidence * 100)}% Match
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Nutrition macros */}
            <View className="mb-6 bg-surface p-5 rounded-3xl border border-border/40 shadow-sm">
              <View className="flex-row justify-between items-center mb-6">
                <View>
                  <Text className="text-foreground text-[13px] font-semibold font-inter uppercase tracking-wider mb-1">
                    Total Energy
                  </Text>
                  <View className="flex-row items-baseline gap-1">
                    <Text className="text-primary-light text-[36px] font-bold font-inter leading-none">
                      {Math.round(analysis.nutrition.calories)}
                    </Text>
                    <Text className="text-foreground text-[16px] font-semibold font-inter mb-1">
                      kcal
                    </Text>
                  </View>
                </View>
                <View className="w-16 h-16 rounded-full border-4 border-primary-light items-center justify-center">
                  <Text className="text-foreground text-[16px] font-bold font-inter">
                    {totalConfidence}%
                  </Text>
                  <Text className="text-foreground text-[10px] font-inter uppercase">
                    Score
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between border-t border-default-soft pt-4">
                <View className="items-center flex-1">
                  <Text className="text-foreground text-[18px] font-bold font-inter">
                    {Math.round(analysis.nutrition.protein_g)}g
                  </Text>
                  <Text className="text-foreground text-[13px] font-inter mt-1">
                    Protein
                  </Text>
                </View>
                <View className="items-center flex-1 border-x border-default-soft">
                  <Text className="text-foreground text-[18px] font-bold font-inter">
                    {Math.round(analysis.nutrition.carbs_g)}g
                  </Text>
                  <Text className="text-foreground text-[13px] font-inter mt-1">
                    Carbs
                  </Text>
                </View>
                <View className="items-center flex-1">
                  <Text className="text-foreground text-[18px] font-bold font-inter">
                    {Math.round(analysis.nutrition.fat_g)}g
                  </Text>
                  <Text className="text-foreground text-[13px] font-inter mt-1">
                    Fat
                  </Text>
                </View>
              </View>
            </View>

            {/* Health notes & Dietary tags */}
            {(analysis.health_notes || analysis.dietary_tags.length > 0) && (
              <View className="mb-6 bg-surface p-4 rounded-2xl border border-border/40">
                {analysis.health_notes && (
                  <View className="mb-3">
                    <View className="flex-row items-center gap-2 mb-2">
                      <Ionicons name="fitness" size={16} color="#2ab3b1" />
                      <Text className="text-heading text-[14px] font-semibold font-inter">
                        Vitality Impact
                      </Text>
                    </View>
                    <Text className="text-foreground text-[13px] font-inter leading-5">
                      {analysis.health_notes}
                    </Text>
                  </View>
                )}

                {analysis.dietary_tags.length > 0 && (
                  <View className="flex-row flex-wrap gap-2 mt-2 pt-3 border-t border-border/40">
                    {analysis.dietary_tags.map((tag) => (
                      <View
                        key={tag}
                        className="bg-primary-light/10 px-3 py-1.5 rounded-full"
                      >
                        <Text className="text-primary-light text-[12px] font-semibold font-inter">
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}

            {/* Actions */}
            <View className="flex-row gap-3 mt-2 pb-6">
              <Button
                variant="outline"
                onPress={() => onOpenChange(false)}
                className="flex-1 border-default-soft"
              >
                <Button.Label className="text-foreground font-semibold text-[16px] font-inter">
                  Discard
                </Button.Label>
              </Button>
              <Button
                onPress={onSave}
                isDisabled={isSaving || isSaved}
                className="flex-1 bg-primary-light shadow-[0_0_15px_#2ab3b140]"
              >
                <Button.Label className="text-white font-semibold text-[16px] font-inter">
                  {isSaved
                    ? "Saved to Diary"
                    : isSaving
                      ? "Saving..."
                      : "Log All Items"}
                </Button.Label>
              </Button>
            </View>
          </ScrollView>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
};

export default AnalysisResultsSheet;
