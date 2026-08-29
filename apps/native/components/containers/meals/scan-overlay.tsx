import React from "react";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";

const ScanFrameOverlay = () => {
  const scanLineY = useSharedValue(0);

  React.useEffect(() => {
    scanLineY.value = withRepeat(
      withSequence(
        withTiming(288, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineY.value }],
  }));

  return (
    <>
      <View className="absolute inset-0 items-center justify-center pointer-events-none">
        <View className="w-72 h-72 relative">
          {/* Top Left */}
          <View className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-3xl" />
          {/* Top Right */}
          <View className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-3xl" />
          {/* Bottom Left */}
          <View className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-3xl" />
          {/* Bottom Right */}
          <View className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-3xl" />

          {/* Scanning Line */}
          <Animated.View
            style={[
              {
                position: "absolute",
                left: -8,
                right: -8,
                height: 4,
                backgroundColor: "transparent",
                shadowColor: "#2ab3b1",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 15,
                elevation: 10,
              },
              scanLineStyle,
            ]}
          >
            <View className="w-full h-full opacity-60 bg-linear-to-r from-transparent via-primary-light to-transparent" />
          </Animated.View>
        </View>
      </View>

      {/* Hint Badge */}
      <View className="absolute bottom-48 left-0 right-0 items-center pointer-events-none">
        <View className="bg-black/30 backdrop-blur-md px-6 py-2 rounded-full">
          <Text className="text-white/90 text-[16px] font-medium font-inter tracking-tight">
            Point at your food to scan
          </Text>
        </View>
      </View>
    </>
  );
};

export default ScanFrameOverlay;
