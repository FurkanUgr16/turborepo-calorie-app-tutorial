import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "heroui-native";

export interface StreakCardProps {
  current: number;
  longest: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({ current, longest }) => {
  return (
    <View className="flex-row gap-3">
      <View className="flex-1 bg-surface p-4 rounded-2xl border border-border/40 flex-row items-center gap-3">
        <View
          className="w-11 h-11 rounded-full items-center justify-center"
          style={{ backgroundColor: "rgba(42, 179, 177, 0.12)" }}
        >
          <Ionicons name="flame" size={22} color="#2ab3b1" />
        </View>
        <View>
          <Typography
            type="h3"
            className="text-heading font-bold font-inter leading-tight"
          >
            {current}
          </Typography>
          <Typography type="body-sm" className="font-inter">
            day streak
          </Typography>
        </View>
      </View>
      <View className="flex-1 bg-surface p-4 rounded-2xl border border-border/40 flex-row items-center gap-3">
        <View
          className="w-11 h-11 rounded-full items-center justify-center"
          style={{ backgroundColor: "rgba(42, 179, 177, 0.12)" }}
        >
          <Ionicons name="trophy" size={22} color="#2ab3b1" />
        </View>
        <View>
          <Typography
            type="h3"
            className="text-heading font-bold font-inter leading-tight"
          >
            {longest}
          </Typography>
          <Typography type="body-sm" className="font-inter">
            best streak
          </Typography>
        </View>
      </View>
    </View>
  );
};
