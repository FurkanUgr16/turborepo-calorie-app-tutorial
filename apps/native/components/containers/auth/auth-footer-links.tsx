import { Typography } from "heroui-native";
import { View, Text, Pressable } from "react-native";

interface AuthFooterLinkProps {
  question: string;
  linkText: string;
  onPress: () => void;
  className?: string;
}

const AuthFooterLink: React.FC<AuthFooterLinkProps> = ({
  question,
  linkText,
  onPress,
  className = "",
}) => {
  return (
    <View className={`flex-row justify-center gap-1 mt-4 ${className}`}>
      <Typography className="text-neutral-400">{question}</Typography>
      <Pressable onPress={onPress}>
        <Typography className="text-primary">{linkText}</Typography>
      </Pressable>
    </View>
  );
};

export default AuthFooterLink;
