import { Typography } from "heroui-native";
import { View, Text } from "react-native";

interface MacroCardProps {
  label: string;
  value: string;
  unit: string;
}

const MacroCard = ({ label, value, unit }: MacroCardProps) => {
  return (
    <View className="flex-1 bg-surface rounded-xl py-3 px-3 items-center border-b-2 border-primary-light">
      <Typography type="h4" className="text-foreground mb-1.5">
        {label}
      </Typography>
      <Typography
        type="h3"
        className="text-heading text-[18px] font-bold font-inter"
      >
        {value}
        <Typography
          type="body-xs"
          className="text-foreground text-[11px] font-normal"
        >
          {" "}
          {unit}
        </Typography>
      </Typography>
    </View>
  );
};

export default MacroCard;
