import { Ionicons } from "@expo/vector-icons";
import { Typography, useThemeColor } from "heroui-native";
import { View, TouchableOpacity } from "react-native";

interface HomeHeaderProps {
  onNotificationsPress?: () => void;
  onProfilePress?: () => void;
}

const HomeHeader = ({
  onNotificationsPress,
  onProfilePress,
}: HomeHeaderProps) => {
  const mutedColor = useThemeColor("muted");
  return (
    <View className="flex-row items-center justify-between py-2">
      <Typography type="h2">Calorie AI</Typography>

      <View className="flex-row items-center gap-4">
        <TouchableOpacity onPress={onNotificationsPress}>
          <Ionicons
            name="notifications-outline"
            size={21}
            color={mutedColor as string}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onProfilePress}>
          <View className="w-8 h-8 rounded-full bg-surface items-center justify-center">
            <Ionicons name="person" size={15} color="#2ab3b1" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
