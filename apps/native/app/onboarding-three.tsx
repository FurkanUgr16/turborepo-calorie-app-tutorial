import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "heroui-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, BUTTON_LABEL_CLASSNAME } from "@/components/ui/button";

const OnboardingThree = () => {
  const router = useRouter();
  const inset = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: inset.top }}>
      <View className="absolute top-44.25 -left-20 h-64 w-64 overflow-hidden rounded-full opacity-50">
        <View className="absolute inset-0 bg-primary/20" />
      </View>

      <View className="absolute top-52.5 -right-20 h-80 w-80 overflow-hidden rounded-full">
        <View className="absolute inset-0 bg-primary-light/10" />
      </View>

      <View className="flex-1 items-center justify-center px-8 pt-17.25">
        <View className="w-full max-w-md flex-row gap-4 pb-12">
          {/* Left Column */}
          <View className="flex-1 gap-4">
            <View
              className="rounded-4xl border border-white/5 p-5"
              style={{ backgroundColor: "rgba(28, 33, 38, 0.9)" }}
            >
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text className="text-[10px] font-bold uppercase text-primary-light">
                    Daily Macros
                  </Text>
                  <Text className="text-[18px] font-bold text-heading">
                    Balance
                  </Text>
                </View>
                <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                  <Ionicons name="stats-chart" size={16} color="#2ab3b1" />
                </View>
              </View>

              <View className="items-center justify-center py-2">
                {/* Simplified Donut Chart */}
                <View className="h-28 w-28 items-center justify-center rounded-full border-10 border-figma-dark-bg">
                  <View
                    className="absolute h-28 w-28 rounded-full border-10 border-primary-light"
                    style={{
                      borderBottomColor: "transparent",
                      borderLeftColor: "transparent",
                      transform: [{ rotate: "45deg" }],
                    }}
                  />
                  <Text className="text-[20px] font-bold text-heading">
                    85%
                  </Text>
                </View>
              </View>
            </View>

            <View
              className="rounded-4xl border border-white/5 p-5"
              style={{ backgroundColor: "rgba(28, 33, 38, 0.9)" }}
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-[10px] font-bold uppercase text-neutral-400">
                    Weight Trend
                  </Text>
                  <Text className="text-[14px] font-bold text-primary-light mt-1">
                    -2.4 kg this month
                  </Text>
                </View>
                <View className="flex-row items-end gap-1">
                  <View className="h-4 w-1.5 rounded-full bg-neutral-700" />
                  <View className="h-6 w-1.5 rounded-full bg-neutral-700" />
                  <View className="h-3 w-1.5 rounded-full bg-primary-light" />
                  <View className="h-5 w-1.5 rounded-full bg-primary-light" />
                </View>
              </View>
            </View>
          </View>

          {/* Right Column */}
          <View className="w-30 gap-4">
            {/* Burned Stats Card */}
            <View
              className="flex-1 items-center justify-center rounded-4xl border border-white/5 p-4"
              style={{ backgroundColor: "rgba(28, 33, 38, 0.9)" }}
            >
              <View className="mb-2 h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/10">
                <Ionicons name="flame" size={20} color="#f97316" />
              </View>
              <Text className="text-[12px] font-bold text-neutral-400">
                Burned
              </Text>
              <Text className="text-[20px] font-bold text-heading">1.2k</Text>
            </View>

            {/* Hydration Stats Card */}
            <View
              className="flex-1 items-center justify-center rounded-4xl border border-white/5 p-4"
              style={{ backgroundColor: "rgba(28, 33, 38, 0.9)" }}
            >
              <View className="mb-2 h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10">
                <Ionicons name="water" size={20} color="#3b82f6" />
              </View>
              <Text className="text-[12px] font-bold text-neutral-400">
                Hydration
              </Text>
              <Text className="text-[20px] font-bold text-heading">2.4L</Text>
            </View>
          </View>
        </View>

        {/* Text Content */}
        <View className="items-center gap-4">
          <Typography type="h1" className="text-center text-heading">
            Reach Your Goals
          </Typography>
          <Typography className="text-center text-base leading-7.25 text-neutral-400 font-inter">
            Get personalized insights and track your{"\n"}progress with
            beautiful, easy-to-read{"\n"}charts.
          </Typography>
        </View>

        <View className="absolute left-8 right-8 top-0 flex-row items-center justify-between h-16">
          <Pressable
            className="absolute right-8 top-15"
            onPress={() => router.push("/sign-in")}
          >
            <Typography>Skip</Typography>
          </Pressable>
        </View>
      </View>
      {/* Footer Area */}
      <View className="items-center gap-10 px-8 pb-16">
        {/* Progress Dots (Third dot active) */}
        <View className="flex-row items-center gap-2">
          <View className="h-1.5 w-1.5 rounded-full bg-[#23282e]" />
          <View className="h-1.5 w-1.5 rounded-full bg-[#23282e]" />
          <View className="h-1.5 w-8 rounded-full bg-primary-light" />
        </View>

        {/* Get Started Button */}
        <Button onPress={() => router.push("/sign-in")} className="w-full">
          <View className="flex-row items-center gap-2">
            <Button.Label className={BUTTON_LABEL_CLASSNAME}>
              Get Started
            </Button.Label>
            <Ionicons name="chevron-forward" size={16} color="white" />
          </View>
        </Button>
      </View>
    </View>
  );
};

export default OnboardingThree;
