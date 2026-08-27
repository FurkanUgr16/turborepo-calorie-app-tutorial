import { cn, useThemeColor } from "heroui-native";
import { View, Text } from "react-native";
import { Button } from "../../ui/button";

interface SocialAuthGroupProps {
  onGooglePress?: () => void;
  onApplePress?: () => void;
  className?: string;
}

const SocialAuthGroup: React.FC<SocialAuthGroupProps> = ({
  onGooglePress,
  onApplePress,
  className = "",
}) => {
  const foregroundColor = useThemeColor("foreground");
  return (
    <View className={cn("flex-row justify-between gap-4 w-full", className)}>
      <Button
        variant="social"
        onPress={onGooglePress}
        className="flex-1"
        color={foregroundColor}
        iconName="logo-google"
      >
        Google
      </Button>
      <Button
        variant="social"
        onPress={onApplePress}
        className="flex-1"
        color={foregroundColor}
        iconName="logo-apple"
      >
        Apple
      </Button>
    </View>
  );
};

export default SocialAuthGroup;
