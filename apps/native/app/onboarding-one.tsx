import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Typography } from "heroui-native";
import { View, Pressable, Image } from "react-native";
import { Button, BUTTON_LABEL_CLASSNAME } from "@/components/ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OnboardingOne = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="absolute top-44.25 -left-20 size-64 overflow-hidden">
        <View className="absolute inset-0 bg-primary/10" />
      </View>
      <View className="flex-1 items-center justify-center px-6 pt-16">
        <View className="w-full max-w-md items-center pb-12">
          <View
            className="items-center overflow-hidden rounded-[48px] boder boder-white/5 p-8"
            style={{
              shadowColor: "#006a68",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 60,
              backgroundColor: "rgba(28 33 38 0.9)",
            }}
          >
            <View className="size-96 items-center justify-center overflow-hidden rounded-4xl">
              <Image
                source={require("@/assets/images/onboarding/onboarding-one.png")}
                className="h-full w-full"
                resizeMode="cover"
              />
              <View className="absolute size-48 items-center justify-center rounded-3xl border-2 border-primary-light/40">
                <View className="absolute top-0 left-0 size-6 rounded-tl-2xl border-t-4 border-l-4 border-primary-light" />
                <View className="absolute top-0 right-0 size-6 rounded-tr-2xl border-t-4 border-r-4 border-primary-light" />
                <View
                  className="w-47 h-1 rounded-full"
                  style={{
                    backgroundColor: "#2ab3b1",
                    shadowColor: "#2ab3b1",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.8,
                    shadowRadius: 1.5,
                  }}
                />
                <View className="absolute bottom-0 left-0 size-6 rounded-bl-2xl border-b-4 border-l-4 border-primary-light" />
                <View className="absolute bottom-0 right-0 size-6 rounded-br-2xl border-b-4 border-r-4 border-primary-light" />
              </View>
              <View
                className="flex-row absolute right-4 top-4 items-center gap-2 overflow-hidden rounded-full border border-white/10 px-4 py-1.7"
                style={{ backgroundColor: "rgba(28 33 38 0.6)" }}
              >
                <View className="size-3 items-center justify-center rounded-full bg-primary-light">
                  <View className="size-1.5 rounded-full bg-figma-dark-bg " />
                </View>
                <Typography className="text-white" type="body-xs">
                  AI ANALYZING...
                </Typography>
              </View>
            </View>
          </View>
        </View>
        <View className="items-center gap-4">
          <Typography className="text-center" type="h1">
            Welcome to Calorie {"\n"} AI
          </Typography>
          <Typography className="text-center">
            Your intelligent companion for {"\n"}effortless calorie tracking.
          </Typography>
        </View>

        <Pressable
          className="absolute right-8 top-15"
          onPress={() => router.push("/sign-in")}
        >
          <Typography>Skip</Typography>
        </Pressable>
      </View>
      <View className="items-center gap-10 px-6 py-8">
        <View className="flex flex-row items-center gap-2">
          <View className="h-1.5 w-8 rounded-full bg-primary-light" />
          <View className="h-1.5 w-1.5 rounded-full bg-[#23282e] " />
          <View className="h-1.5 w-1.5 rounded-full bg-[#23282e] " />
        </View>

        <Button
          className="w-full"
          onPress={() => router.push("/onboarding-two")}
        >
          <View className="flex flex-row items-center gap-2">
            <Button.Label className={BUTTON_LABEL_CLASSNAME}>
              Continue
            </Button.Label>
            <Ionicons name="arrow-forward" size={16} color="white" />
          </View>
        </Button>
      </View>
    </View>
  );
};

export default OnboardingOne;
