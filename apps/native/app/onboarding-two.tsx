import { View, Image, Pressable, Text } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Typography } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button, BUTTON_LABEL_CLASSNAME } from "@/components/ui/button";

const OnboardingTwo = () => {
  const router = useRouter();
  const inset = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: inset.top }}>
      <BlurView intensity={90} tint="default">
        <View className="absolute top-20 -left-3 right-0 size-120 overflow-hidden rounded-full">
          <View className="absolute inset-0 bg-primary/5" />
        </View>
      </BlurView>

      <View className="flex-1 items-center justify-center px-6 pt-10">
        <View className="relative items-center justify-center overflow-hidden">
          <Image
            source={require("@/assets/images/onboarding/onboarding-two.png")}
            resizeMode="cover"
            className="w-77 h-102"
          />
        </View>
        <View className="mt-0 w-full items-center gap-4">
          <Typography
            type="h2"
            className="text-center text-[30px] font-semibold tracking-[-0.75px] text-heading"
          >
            Scan Your Meals
          </Typography>
          <Typography
            type="body"
            className="text-center text-[14px] leading-5.75 text-neutral-400 font-inter"
          >
            Just snap a photo, and our AI instantly identifies{"\n"}ingredients
            and nutrition.
          </Typography>
        </View>
      </View>

      <Pressable
        className="absolute right-8 top-15"
        onPress={() => router.push("/sign-in")}
      >
        <Typography>Skip</Typography>
      </Pressable>

      <View className="items-center gap-10 px-6 py-8">
        <View className="flex flex-row items-center gap-2">
          <View className="h-1.5 w-1.5 rounded-full bg-[#23282e] " />
          <View className="h-1.5 w-8 rounded-full bg-primary-light" />
          <View className="h-1.5 w-1.5 rounded-full bg-[#23282e] " />
        </View>

        <Button
          className="w-full"
          onPress={() => router.push("/onboarding-three")}
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

export default OnboardingTwo;
