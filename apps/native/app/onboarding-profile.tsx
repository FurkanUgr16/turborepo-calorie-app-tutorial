import { View } from "react-native";
import { useRouter } from "expo-router";
import { useUpdateUser } from "@/hooks/use-user";
import { Controller, useForm } from "react-hook-form";
import { ProfileFormValues, profileSchema } from "@calorie-ai-app/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthTemplate from "@/components/templates/auth-template";
import {
  Description,
  Label,
  Radio,
  RadioGroup,
  Typography,
} from "heroui-native";
import { Input } from "@/components/ui/input";
import { Ionicons } from "@expo/vector-icons";
import { Button, BUTTON_LABEL_CLASSNAME } from "@/components/ui/button";
import { SectionHeader } from "@/components/base/section-header";

const GOAL_OPTIONS = [
  {
    value: "lose",
    label: "Lose Weight",
    description: "Calorie deficit focus",
    iconName: "trending-down-outline" as const,
  },
  {
    value: "maintain",
    label: "Maintain",
    description: "Balance intake & activity",
    iconName: "scale-outline" as const,
  },
  {
    value: "gain",
    label: "Gain Muscle",
    description: "Surplus for growth",
    iconName: "trending-up-outline" as const,
  },
];

const OnboardingProfile = () => {
  const router = useRouter();
  const { mutate: saveProfile, isPending, error } = useUpdateUser();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema) as never,
    defaultValues: {
      age: undefined,
      height: undefined,
      weight: undefined,
      goal: undefined,
    },
  });

  const selectedGoal = watch("goal");

  return (
    <AuthTemplate
      title="Personal Profile"
      onBack={() => router.back()}
      headerTitle="Personal Profile"
    >
      <View className="gap-6">
        {/* Heading */}
        <View className="gap-2">
          <Typography type="h3" className="text-heading">
            Set Your Personal Goals
          </Typography>
          <Typography type="body" className="text-neutral-400">
            Tailor your nutrition plan by providing your current stats and
            target outcome.
          </Typography>
        </View>

        {/* BIOMETRICS */}
        <View className="gap-4">
          <SectionHeader title="BIOMETRICS" iconName="body-outline" />
          <Input
            label="Your Age"
            name="age"
            control={control}
            placeholder="e.g., 25"
            keyboardType="number-pad"
          />
          <Input
            label="Height (cm)"
            name="height"
            control={control}
            placeholder="e.g., 175"
            keyboardType="decimal-pad"
          />
          <Input
            label="Current Weight (kg)"
            name="weight"
            control={control}
            placeholder="e.g., 70"
            keyboardType="decimal-pad"
          />
        </View>

        {/* PRIMARY GOAL */}
        <View className="gap-3">
          <SectionHeader title="PRIMARY GOAL" iconName="flag-outline" />
          <Controller
            control={control}
            name="goal"
            render={({ fieldState: { error: goalError } }) => (
              <>
                <RadioGroup
                  value={selectedGoal}
                  onValueChange={(val) =>
                    setValue("goal", val as ProfileFormValues["goal"], {
                      shouldValidate: true,
                    })
                  }
                  isInvalid={!!goalError}
                  className="gap-2"
                >
                  {GOAL_OPTIONS.map((option) => (
                    <RadioGroup.Item
                      key={option.value}
                      value={option.value}
                      className="bg-white dark:bg-neutral-800 rounded-2xl px-4 py-3"
                    >
                      {({ isSelected }: { isSelected: boolean }) => (
                        <View className="flex-row items-center gap-3">
                          <View
                            className={`h-10 w-10 items-center justify-center rounded-full ${
                              isSelected
                                ? "bg-primary"
                                : "bg-neutral-100 dark:bg-neutral-700"
                            }`}
                          >
                            <Ionicons
                              name={option.iconName}
                              size={20}
                              color={isSelected ? "white" : "#9ca3af"}
                            />
                          </View>
                          <View className="flex-1">
                            <Label className={isSelected ? "text-primary" : ""}>
                              {option.label}
                            </Label>
                            <Description>{option.description}</Description>
                          </View>
                          <Radio>
                            <Radio.Indicator>
                              <Radio.IndicatorThumb />
                            </Radio.Indicator>
                          </Radio>
                        </View>
                      )}
                    </RadioGroup.Item>
                  ))}
                </RadioGroup>
                {goalError && (
                  <Typography type="body-xs" className="text-danger mt-1">
                    {goalError.message}
                  </Typography>
                )}
              </>
            )}
          />
        </View>

        {/* Error display */}
        {error && (
          <Typography type="body-xs" className="text-center text-red-500">
            {error.message}
          </Typography>
        )}

        {/* Submit button */}
        <Button
          onPress={handleSubmit((data) => {
            saveProfile(data, {
              onSuccess: () => {
                router.replace("/(tabs)");
              },
            });
          })}
          isLoading={isPending}
          className="w-full mt-2"
        >
          <View className="flex-row items-center gap-2">
            <Button.Label className={BUTTON_LABEL_CLASSNAME}>
              Continue
            </Button.Label>
            <Ionicons name="chevron-forward" size={16} color="white" />
          </View>
        </Button>

        {/* Step indicator */}
        <Typography type="body-xs" className="text-center text-foreground">
          Step 2 of 3 {"\u2022"} You can edit these later
        </Typography>
      </View>
    </AuthTemplate>
  );
};

export default OnboardingProfile;
