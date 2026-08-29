import React from "react";
import { View } from "react-native";
import { Card, useThemeColor } from "heroui-native";

import { Typography } from "heroui-native";

function MacroMiniCard({
  label,
  value,
  tint,
}: {
  label: string;
  value: string;
  tint: string;
}) {
  return (
    <View className="flex-1 items-center rounded-[26px] bg-background py-4">
      <View
        className="mb-3 h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: `${tint}22` }}
      >
        <View
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: tint }}
        />
      </View>
      <Typography type="body-xs" className="mb-2 tracking-[1.2px]">
        {label}
      </Typography>
      <Typography type="h4" className="font-bold text-heading font-inter">
        {value}
      </Typography>
    </View>
  );
}

export interface MealNutritionCardProps {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  confidence: number;
}

export const MealNutritionCard: React.FC<MealNutritionCardProps> = ({
  calories,
  proteinG,
  carbsG,
  fatG,
  confidence,
}) => {
  const borderColor = useThemeColor("border");

  return (
    <Card className="rounded-[30px] border border-border/40 bg-background">
      <Card.Body className="gap-5 p-5">
        <View className="flex-row items-end justify-between">
          <View>
            <Typography type="body-xs" className="mb-2 text-primary-light">
              Total Energy
            </Typography>
            <Typography className="text-[56px] font-bold leading-14 text-primary-light font-inter">
              {Math.round(calories)}
            </Typography>
            <Typography className="mt-1 text-[16px] font-semibold uppercase tracking-[1.2px] text-foreground font-inter">
              kcal
            </Typography>
          </View>

          <View className="h-20 w-20 items-center justify-center rounded-full border-[6px] border-primary-light/25">
            <Typography type="h4" className="font-bold text-heading font-inter">
              {confidence}
            </Typography>
            <Typography
              type="body-xs"
              className="uppercase tracking-[1.2px] text-foreground font-inter"
            >
              AI
            </Typography>
          </View>
        </View>

        <View
          className="h-px"
          style={{ backgroundColor: borderColor as string }}
        />

        <View className="flex-row gap-3">
          <MacroMiniCard
            label="Protein"
            value={`${Math.round(proteinG)}g`}
            tint="#ef4444"
          />
          <MacroMiniCard
            label="Carbs"
            value={`${Math.round(carbsG)}g`}
            tint="#2563eb"
          />
          <MacroMiniCard
            label="Fat"
            value={`${Math.round(fatG)}g`}
            tint="#f59e0b"
          />
        </View>
      </Card.Body>
    </Card>
  );
};
