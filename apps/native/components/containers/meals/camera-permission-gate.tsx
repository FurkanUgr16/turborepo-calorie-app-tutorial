import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, BUTTON_LABEL_CLASSNAME } from "@/components/ui/button";
import { Typography } from "heroui-native";

export interface CameraPermissionGateProps {
  isLoading: boolean;
  isGranted: boolean;
  onRequestPermission: () => void;
}

export const CameraPermissionGate: React.FC<CameraPermissionGateProps> = ({
  isLoading,
  isGranted,
  onRequestPermission,
}) => {
  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#2ab3b1" />
      </View>
    );
  }

  if (!isGranted) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <View className="w-20 h-20 rounded-full bg-surface items-center justify-center mb-6">
          <Ionicons name="camera-outline" size={36} color="#2ab3b1" />
        </View>
        <Typography
          type="h4"
          className="text-heading font-bold font-inter text-center mb-2"
        >
          Camera Access Required
        </Typography>
        <Typography
          type="body"
          className="text-foreground mb-8 font-inter text-center leading-5"
        >
          Calorie AI needs access to your camera to scan and analyze your meals.
        </Typography>
        <Button onPress={onRequestPermission}>
          <Button.Label className={BUTTON_LABEL_CLASSNAME}>
            Enable Camera
          </Button.Label>
        </Button>
      </View>
    );
  }

  return null;
};
