import { View, Text } from "react-native";
import { SectionHeader } from "../base/section-header";
import { Typography } from "heroui-native";

interface DailySummaryCardProps {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

const DailySummaryCard = ({
  calories,
  proteinG,
  carbsG,
  fatG,
}: DailySummaryCardProps) => {
  const proteinPercent =
    calories > 0 ? Math.round(((proteinG * 4) / calories) * 100) : 0;

  return (
    <View className="py-3">
      <SectionHeader title="Daily Summary" iconName="stats-chart" />

      <View className="mt-3 bg-surface p-5 rounded-3xl border border-border/40 shadow-sm">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Typography
              type="body-sm"
              className="text-foreground uppercase tracking-wider mb-1"
            >
              Total Energy
            </Typography>
            <View className="flex-row items-baseline gap-1">
              <Typography type="h3" className="text-primary-light leading-none">
                {Math.round(calories)}
              </Typography>
              <Typography className="text-foreground font-semibold font-inter mb-1">
                kcal
              </Typography>
            </View>
          </View>
          <View className="w-16 h-16 rounded-full border-4 border-primary-light items-center justify-center">
            <Typography className="text-foreground font-bold font-inter">
              {proteinPercent}%
            </Typography>
            <Typography className="text-foreground text-[10px] font-inter uppercase">
              Protein
            </Typography>
          </View>
        </View>

        <View className="flex-row justify-between border-t border-default-soft pt-4">
          <View className="items-center flex-1">
            <Typography
              type="h4"
              className="text-foreground font-bold font-inter"
            >
              {Math.round(proteinG)}g
            </Typography>
            <Typography
              type="body-xs"
              className="text-foreground font-inter mt-1"
            >
              Protein
            </Typography>
          </View>
          <View className="items-center flex-1 border-x border-default-soft">
            <Typography
              type="h4"
              className="text-foreground font-bold font-inter"
            >
              {Math.round(carbsG)}g
            </Typography>
            <Typography
              type="body-xs"
              className="text-foreground font-inter mt-1"
            >
              Carbs
            </Typography>
          </View>
          <View className="items-center flex-1">
            <Typography
              type="h4"
              className="text-foreground font-bold font-inter"
            >
              {Math.round(fatG)}g
            </Typography>
            <Typography
              type="body-xs"
              className="text-foreground font-inter mt-1"
            >
              Fat
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DailySummaryCard;
