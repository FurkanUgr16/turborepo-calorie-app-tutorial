import { View, Text, TouchableOpacity } from "react-native";
import { FlashMode } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

interface ScanBottomControlsProps {
  isTakingPicture: boolean;
  onTakePicture: () => void;
  onPickImage: () => void;
  flash: FlashMode;
  onToggleFlash: () => void;
}

const ScanBottomControls: React.FC<ScanBottomControlsProps> = ({
  isTakingPicture,
  onTakePicture,
  onPickImage,
  flash,
  onToggleFlash,
}) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 items-center pb-12 pt-8 px-8 bg-black/40 backdrop-blur-xl z-10">
      <View className="flex-row items-center justify-between w-full max-w-87.5">
        <TouchableOpacity
          onPress={onPickImage}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md items-center justify-center border border-white/10"
        >
          <Ionicons name="images" size={24} color="white" />
        </TouchableOpacity>

        {/* Shutter Button */}
        <TouchableOpacity
          onPress={onTakePicture}
          disabled={isTakingPicture}
          className="w-20 h-20 rounded-full border-4 border-white items-center justify-center p-1 overflow-hidden"
        >
          <Ionicons name="camera" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onToggleFlash}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md items-center justify-center border border-white/10"
        >
          <Ionicons
            name={flash === "on" ? "flash" : "flash-off"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScanBottomControls;
