import React from "react";
import { cn, Button as HeroUIButton } from "heroui-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type ButtonVariant = "primary" | "social" | "outline";

export const BUTTON_LABEL_CLASSNAME = "text-white font-semibold text-[18px]";

const GRADIENT_COLORS: readonly [string, string] = ["#006a68", "#2ab3b1"];

export interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  color?: string;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  isDisabled?: boolean;
  isLoading?: boolean;
  isIconOnly?: boolean;
}

const PrimaryButton: React.FC<Omit<ButtonProps, "variant">> = ({
  onPress,
  children,
  className = "",
  isDisabled = false,
  isLoading = false,
  isIconOnly = false,
}) => (
  <HeroUIButton
    onPress={onPress}
    isDisabled={isDisabled || isLoading}
    isIconOnly={isIconOnly}
    feedbackVariant="scale-ripple"
    className={`rounded-full overflow-hidden flex-row items-center justify-center h-14 ${className}`}
    animation={{
      ripple: {
        backgroundColor: { value: "white" },
        opacity: { value: [0, 0.3, 0] },
      },
    }}
  >
    <LinearGradient
      colors={GRADIENT_COLORS}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFill as ViewStyle}
    />
    {children}
  </HeroUIButton>
);

const OutlineButton: React.FC<Omit<ButtonProps, "variant">> = ({
  onPress,
  children,
  className = "",
  isDisabled = false,
  isLoading = false,
  isIconOnly = false,
}) => (
  <HeroUIButton
    onPress={onPress}
    isDisabled={isDisabled || isLoading}
    isIconOnly={isIconOnly}
    feedbackVariant="scale-highlight"
    className={`rounded-full overflow-hidden flex-row items-center justify-center h-14 border border-input-border/30 bg-transparent ${className}`}
  >
    {children}
  </HeroUIButton>
);

const SocialButton: React.FC<Omit<ButtonProps, "variant">> = ({
  onPress,
  children,
  className = "",
  color,
  iconName,
  isDisabled = false,
  isLoading = false,
  isIconOnly = false,
}) => (
  <HeroUIButton
    onPress={onPress}
    isDisabled={isDisabled || isLoading}
    isIconOnly={isIconOnly}
    feedbackVariant="scale-highlight"
    className={cn(
      "rounded-full overflow-hidden flex-row items-center justify-center h-14 border border-input-border/30 bg-transparent dark:bg-figma-dark-surface",
      className,
    )}
  >
    <Ionicons name={iconName} size={20} color={color} />
    <Button.Label className="font-semibold text-[14px] text-heading">
      {children}
    </Button.Label>
  </HeroUIButton>
);

const ButtonBase: React.FC<ButtonProps> = ({
  variant = "primary",
  ...rest
}) => {
  if (variant === "social") {
    return (
      <SocialButton {...(rest as React.ComponentProps<typeof SocialButton>)} />
    );
  }
  if (variant === "outline") {
    return (
      <OutlineButton
        {...(rest as React.ComponentProps<typeof OutlineButton>)}
      />
    );
  }
  return <PrimaryButton {...rest} />;
};

export const Button = Object.assign(ButtonBase, {
  Label: HeroUIButton.Label,
});
