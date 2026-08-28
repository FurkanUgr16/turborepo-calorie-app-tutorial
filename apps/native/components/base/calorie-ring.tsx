import React from "react";
import { View } from "react-native";
import { Typography, useThemeColor } from "heroui-native";
import Svg, { Circle } from "react-native-svg";

export interface CalorieRingProps {
  consumed: number;
  goal: number;
  size?: number;
}

export const CalorieRing: React.FC<CalorieRingProps> = ({
  consumed,
  goal,
  size = 170,
}) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const remaining = Math.max(goal - consumed, 0);
  const progress = Math.min(consumed / goal, 1);
  const strokeDashoffset = circumference * (1 - progress);

  const trackColor = useThemeColor("surface");

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2ab3b1"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(${-90}, ${size / 2}, ${size / 2})`}
        />
      </Svg>
      <View className="absolute items-center justify-center">
        <Typography
          type="h3"
          className="text-[34px] leading-normal font-bold text-heading font-inter"
        >
          {remaining.toLocaleString()}
        </Typography>
        <Typography type="body-sm" className="text-foreground mt-1">
          KCAL LEFT
        </Typography>
      </View>
    </View>
  );
};
