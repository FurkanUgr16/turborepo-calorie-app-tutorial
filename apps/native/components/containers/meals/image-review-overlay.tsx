import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ImageReviewOverlayProps {
  imageUri: string;
  isAnalyzing: boolean;
  onAnalyze: () => void;
  onRetake: () => void;
}

const ImageReviewOverlay: React.FC<ImageReviewOverlayProps> = ({
  imageUri,
  isAnalyzing,
  onAnalyze,
  onRetake,
}) => {
  return (
    <View className="absolute inset-0 z-20 bg-black">
      {/* Captured Image */}
      <Image
        source={{ uri: imageUri }}
        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
        resizeMode="cover"
      />

      {/* Top bar with Retake button */}
      <View className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-5 pt-16 pb-6 bg-linear-to-b from-black/70">
        <TouchableOpacity
          onPress={onRetake}
          className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md items-center justify-center"
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-[16px] font-bold font-inter">
          Review your photo
        </Text>

        <View className="w-12" />
      </View>

      {/* Bottom controls */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-16 pt-8 bg-linear-to-t from-black/80">
        <Text className="text-white/70 text-[13px] font-inter text-center mb-6">
          Make sure the food is clearly visible and in focus for best results.
        </Text>

        <View className="flex-row gap-4">
          {/* Retake */}
          <TouchableOpacity
            onPress={onRetake}
            className="flex-1 h-14 rounded-2xl bg-white/15 backdrop-blur-md items-center justify-center border border-white/10"
          >
            <Text className="text-white font-semibold text-[16px] font-inter">
              Retake
            </Text>
          </TouchableOpacity>

          {/* Analyze */}
          <TouchableOpacity
            onPress={onAnalyze}
            disabled={isAnalyzing}
            className="flex-2 h-14 rounded-2xl overflow-hidden"
          >
            <LinearGradient
              colors={["#006a68", "#2ab3b1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="flex-1 items-center justify-center shadow-[0_0_25px_#2ab3b160]"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons
                  name={isAnalyzing ? "hourglass" : "sparkles"}
                  size={20}
                  color="white"
                />
                <Text className="text-white font-bold text-[16px] font-inter">
                  {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ImageReviewOverlay;
