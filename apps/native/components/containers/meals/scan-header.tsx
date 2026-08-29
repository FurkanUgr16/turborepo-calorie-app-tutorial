import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

interface ScanHeaderProps {
  topInset: number;
  onClose: () => void;
}

const ScanHeader = ({ topInset, onClose }: ScanHeaderProps) => {
  return (
    <View
      style={{ paddingTop: topInset }}
      className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-6 pt-4 pb-2 z-10"
    >
      <TouchableOpacity
        onPress={onClose}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md items-center justify-center border border-white/10"
      >
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>

      <View className="flex-row items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
        <View className="w-2 h-2 rounded-full bg-primary-light shadow-[0_0_12px_#2ab3b1]" />
        <Text className="text-white text-[14px] font-semibold font-inter tracking-wide">
          AI Analyzing...
        </Text>
      </View>
    </View>
  );
};

export default ScanHeader;
