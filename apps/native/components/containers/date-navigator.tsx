import { formatDisplayDate } from "@/lib/format";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

interface DateNavigatorProps {
  selectedDate: string;
  onPrev: () => void;
  onNext: () => void;
}

const DateNavigator = ({
  selectedDate,
  onPrev,
  onNext,
}: DateNavigatorProps) => {
  return (
    <View className="flex-row items-center justify-between py-3">
      <TouchableOpacity
        onPress={onPrev}
        className="w-10 h-10 items-center justify-center"
      >
        <Ionicons name="chevron-back" size={22} color="#2ab3b1" />
      </TouchableOpacity>

      <Text className="text-heading text-[16px] font-semibold font-inter">
        {formatDisplayDate(selectedDate)}
      </Text>

      <TouchableOpacity
        onPress={onNext}
        className="w-10 h-10 items-center justify-center"
      >
        <Ionicons name="chevron-forward" size={22} color="#2ab3b1" />
      </TouchableOpacity>
    </View>
  );
};

export default DateNavigator;
