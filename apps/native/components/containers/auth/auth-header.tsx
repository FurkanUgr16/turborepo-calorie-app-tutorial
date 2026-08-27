import { View, Text, Pressable } from "react-native";
import { cn, Typography, useThemeColor } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";

interface AuthHeaderProps {
  onBack?: () => void;
  showBack?: boolean;
  className?: string;
  title?: string;
}

const AuthHeader = ({
  onBack,
  showBack,
  className,
  title,
}: AuthHeaderProps) => {
  const mutedColor = useThemeColor("muted");
  const accentForegroundColor = useThemeColor("accent-foreground");
  return (
    <View
      className={cn(
        "w-full flex-row items-center justify-between h-20 px-6 bg-transparent",
        className,
      )}
    >
      {showBack ? (
        <Pressable
          onPress={onBack}
          className="h-10 w-10 items-center justify-center rounded-full bg-neutral-100/10 dark:bg-neutral-800/50"
        >
          <Ionicons name="arrow-back" size={20} color={mutedColor as string} />
        </Pressable>
      ) : (
        <View className="h-10 w-10" />
      )}

      <View className="flex-row items-center gap-2">
        <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Ionicons
            name="restaurant"
            size={16}
            color={accentForegroundColor as string}
          />
        </View>
        <Typography type="h3" className="text-primary text-[20px] font-bold">
          {title}
        </Typography>
      </View>

      {/* <View className="h-10 w-10" /> */}
    </View>
  );
};

export default AuthHeader;
