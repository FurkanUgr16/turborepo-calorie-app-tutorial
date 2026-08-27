import React from "react";
import { View } from "react-native";
import { Separator, Typography } from "heroui-native";

export interface DividerProps {
  label?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ label, className = "" }) => {
  if (!label) {
    return <Separator className={className} />;
  }

  return (
    <View className={`flex-row items-center gap-4 py-4 ${className}`}>
      <Separator className="flex-1 opacity-30" />
      <Typography
        type="body-xs"
        className="uppercase tracking-[1.2px] text-neutral-400"
      >
        {label}
      </Typography>
      <Separator className="flex-1 opacity-30" />
    </View>
  );
};
