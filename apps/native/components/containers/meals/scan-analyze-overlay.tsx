import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface ScanAnalyzingOverlayProps {
  visible: boolean;
}

const ScanAnalyzingOverlay = ({ visible }: ScanAnalyzingOverlayProps) => {
  const rotation = useSharedValue(0);
  const pulseOpacity = useSharedValue(0.4);

  useEffect(() => {
    if (!visible) return;

    rotation.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1,
      false,
    );

    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, [visible]);

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-[#0c0e12]/80 items-center justify-center px-6 backdrop-blur-md">
      {/* Central Processing Container */}
      <View className="items-center w-full max-w-[320px]">
        {/* Spinner */}
        <View className="w-32 h-32 items-center justify-center mb-8 relative">
          <Animated.View
            className="absolute inset-0 rounded-full bg-primary-light/30"
            style={[{ filter: "blur(32px)" }, glowStyle]}
          />
          <Animated.View
            style={spinnerStyle}
            className="absolute inset-0 border-4 border-t-primary-light border-r-primary-light border-b-transparent border-l-transparent rounded-full"
          />
          <Ionicons name="scan-outline" size={32} color="#6fdba6" />
        </View>

        {/* Text */}
        <Text className="text-[#f1f2f4] text-[24px] font-bold font-inter tracking-tight mb-4 text-center">
          Analyzing your meal...
        </Text>
        <Text className="text-[#bdcac0]/80 text-[14px] font-inter text-center mb-12 px-4 leading-5">
          Identifying ingredients and estimating{"\n"}nutritional breakdown.
        </Text>

        {/* Bento Progress Indicators */}
        <View className="w-full gap-4">
          <View className="flex-row justify-between gap-4">
            <View className="flex-1 flex-row items-center gap-3 bg-[#1a1c20]/40 rounded-xl p-4">
              <Animated.View
                style={glowStyle}
                className="w-2 h-2 rounded-full bg-primary-light shadow-[0_0_8px_#2d9f6f]"
              />
              <Text className="text-[#bdcac0] text-[12px] font-bold font-inter tracking-wider uppercase">
                Vision API
              </Text>
            </View>
            <View className="flex-1 flex-row items-center gap-3 bg-[#1a1c20]/40 rounded-xl p-4 opacity-50">
              <View className="w-2 h-2 rounded-full bg-[#3e4942]" />
              <Text className="text-[#bdcac0] text-[12px] font-bold font-inter tracking-wider uppercase">
                Macros
              </Text>
            </View>
          </View>

          <View className="w-full flex-row items-center justify-between bg-[#1a1c20]/40 rounded-xl p-4">
            <View className="flex-row items-center gap-3">
              <Ionicons name="checkmark-circle" size={16} color="#e2e2e8" />
              <Text className="text-[#e2e2e8] text-[12px] font-bold font-inter tracking-wider uppercase">
                Items detected
              </Text>
            </View>
            <View className="bg-primary-light/20 px-2.5 py-1 rounded-full">
              <Text className="text-primary-light text-[10px] font-bold font-inter">
                Processing
              </Text>
            </View>
          </View>
        </View>

        {/* Footer Note */}
        <Text className="text-[#bdcac0]/40 text-[10px] font-bold font-inter tracking-widest uppercase mt-12 text-center">
          Powered by Calorie AI Neural Engine
        </Text>
      </View>
    </View>
  );
};

export default ScanAnalyzingOverlay;
