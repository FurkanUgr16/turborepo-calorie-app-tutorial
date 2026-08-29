import React from "react";
import { View } from "react-native";

import { Typography } from "heroui-native";
import { capitalizeFirst } from "@/lib/format";

export interface MealInfoSectionProps {
  mealType: string;
  portionEstimate: string;
  healthNotes: string;
  foodItems: Array<{ name: string; confidence: number }>;
  dietaryTags: string[];
}

export const MealInfoSection: React.FC<MealInfoSectionProps> = ({
  mealType,
  portionEstimate,
  healthNotes,
  foodItems,
  dietaryTags,
}) => {
  return (
    <View className="gap-4">
      <View className="flex-row gap-3">
        <View className="flex-1 rounded-[28px] bg-surface px-5 py-5">
          <Typography type="h4" className="mb-3 text-primary-light">
            Meal Type
          </Typography>
          <Typography type="body" className="font-bold text-heading font-inter">
            {capitalizeFirst(mealType)}
          </Typography>
        </View>

        <View className="flex-1 rounded-[28px] bg-surface px-5 py-5">
          <Typography type="h4" className="mb-3 text-primary-light">
            Portion Estimate
          </Typography>
          <Typography
            type="body"
            className="leading-5.5 text-heading font-inter"
          >
            {portionEstimate}
          </Typography>
        </View>
      </View>

      <View className="rounded-[28px] bg-surface px-5 py-5">
        <Typography type="h4" className="mb-3 text-primary-light">
          Vitality Impact
        </Typography>
        <Typography
          type="body"
          className="text-[16px] leading-[24px] text-foreground font-inter"
        >
          {healthNotes}
        </Typography>
      </View>

      <View className="rounded-[28px] bg-surface px-5 py-5">
        <Typography
          type="h4"
          className="mb-4 font-bold text-heading font-inter"
        >
          Detected Ingredients
        </Typography>
        <View className="flex-row flex-wrap gap-3">
          {foodItems.map((item) => (
            <View
              key={item.name}
              className="min-w-35 rounded-[22px] bg-background px-4 py-4"
            >
              <View className="mb-2 h-2.5 w-2.5 rounded-full bg-primary-light" />
              <Typography
                type="body"
                className="font-semibold leading-5.5 text-heading font-inter"
              >
                {item.name}
              </Typography>
            </View>
          ))}
        </View>
      </View>

      {dietaryTags.length > 0 ? (
        <View className="rounded-[28px] bg-surface px-5 py-5">
          <Typography
            type="h4"
            className="mb-4 font-bold text-heading font-inter"
          >
            Dietary Tags
          </Typography>
          <View className="flex-row flex-wrap gap-3">
            {dietaryTags.map((tag) => (
              <View
                key={tag}
                className="rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-2.5"
              >
                <Typography
                  type="body-xs"
                  className="font-semibold capitalize text-primary-light font-inter"
                >
                  {tag}
                </Typography>
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
};
