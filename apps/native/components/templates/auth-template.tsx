import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "heroui-native";
import { BlurView } from "expo-blur";
import AuthHeader from "../containers/auth/auth-header";
import { Typography } from "heroui-native";

type AuthTemplateProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBackButton?: boolean;
  headerTitle?: string;
  className?: string;
};

const AuthTemplate = ({
  children,
  title,
  subtitle,
  onBack,
  headerTitle,
  className,
  showBackButton = true,
}: AuthTemplateProps) => {
  const inset = useSafeAreaInsets();
  return (
    <View
      className={cn("flex-1 bg-background", className)}
      style={{ paddingTop: inset.top }}
    >
      <View className="absolute top-0 right-0 h-75 w-75 overflow-hidden rounded-full">
        <BlurView
          intensity={50}
          tint="light"
          className="absolute inset-0 bg-primary/5"
        />
      </View>

      <View className="absolute bottom-0 left-0 h-62.5 w-62.5 overflow-hidden rounded-full">
        <BlurView
          intensity={40}
          tint="light"
          className="absolute inset-0 bg-primary-light/5"
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <AuthHeader
          onBack={onBack}
          showBack={showBackButton}
          title={headerTitle}
        />
        <ScrollView
          className="flex-1 px-6 pt-10"
          contentContainerClassName="pb-10"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-10 items-center gap-2">
            <Typography type="h1" className="text-center">
              {title}
            </Typography>
            {subtitle && (
              <Typography type="body" className="text-center text-neutral-400">
                {subtitle}
              </Typography>
            )}
          </View>

          <View className="flex-1">{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AuthTemplate;
