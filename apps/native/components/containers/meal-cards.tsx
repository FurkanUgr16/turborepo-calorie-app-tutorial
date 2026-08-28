import { Ionicons } from "@expo/vector-icons";
import { Typography, useThemeColor } from "heroui-native";
import { View, Text, TouchableOpacity } from "react-native";

interface MealCardProps {
  name: string;
  mealType: string;
  time: string;
  calories: string;
  onPress?: () => void;
}

const MealCard = ({
  name,
  mealType,
  time,
  calories,
  onPress,
}: MealCardProps) => {
  const surfaceColor = useThemeColor("surface");

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-center bg-surface rounded-xl p-3.5 mb-2"
    >
      <View
        className="w-11 h-11 rounded-xl items-center justify-center mr-3"
        style={{ backgroundColor: surfaceColor }}
      >
        <Ionicons name="restaurant" size={18} color="#2ab3b1" />
      </View>
      <View className="flex-1">
        <Typography
          type="h4"
          className="text-heading text-[14px] font-semibold font-inter"
        >
          {name}
        </Typography>
        <Typography type="body-xs" className="text-foreground mt-0.5">
          {mealType} • {time}
        </Typography>
      </View>
      <Typography
        type="body-sm"
        className="text-heading font-semibold font-inter"
      >
        {calories}
      </Typography>
    </TouchableOpacity>
  );
};

export default MealCard;
