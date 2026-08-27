import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "heroui-native";

export interface SectionHeaderProps {
  title: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  iconName,
}) => {
  return (
    <View className="flex-row items-center gap-2 mb-3">
      <Ionicons name={iconName} size={14} color="#2ab3b1" />
      <Typography
        type="body-sm"
        className="text-primary-light tracking-[1.5px]"
      >
        {title}
      </Typography>
    </View>
  );
};
