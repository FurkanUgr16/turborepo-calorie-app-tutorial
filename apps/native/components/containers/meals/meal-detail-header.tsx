import React from "react";
import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "heroui-native";

export interface MealDetailHeaderProps {
  title: string;
  isFromAnalysis: boolean;
  onBack: () => void;
  onShare: () => void;
}

export const MealDetailHeader: React.FC<MealDetailHeaderProps> = ({
  title,
  isFromAnalysis,
  onBack,
  onShare,
}) => {
  return (
    <View className="px-6 mb-5 flex-row items-center justify-between">
      <Pressable
        onPress={onBack}
        className="h-11 w-11 items-center justify-center rounded-full bg-surface"
      >
        <Ionicons name="arrow-back" size={22} color="#2ab3b1" />
      </Pressable>

      <Typography type="h2" className="font-bold text-heading font-inter">
        {isFromAnalysis ? "AI Result" : "Meal Details"}
      </Typography>

      <Pressable
        onPress={onShare}
        className="h-11 w-11 items-center justify-center rounded-full bg-surface"
      >
        <Ionicons name="share-social-outline" size={20} color="#2ab3b1" />
      </Pressable>
    </View>
  );
};
