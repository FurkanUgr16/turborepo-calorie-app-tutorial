import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  Card,
  Description,
  FieldError,
  Label,
  Radio,
  RadioGroup,
  Surface,
  Typography,
} from "heroui-native";

import { authClient } from "@/lib/auth-client";
import { useUser, useUpdateUser, useSignOut } from "@/hooks/use-user";
import { ProfileFormValues, profileSchema } from "@calorie-ai-app/auth/schemas";

import { Input } from "@/components/ui/input";
import { Button, BUTTON_LABEL_CLASSNAME } from "@/components/ui/button";
import { SectionHeader } from "@/components/base/section-header";
import { Divider } from "@/components/ui/divider";
import { ThemeToggle } from "@/components/theme-toggle";

type GoalValue = ProfileFormValues["goal"];

const GOAL_OPTIONS: Array<{
  value: GoalValue;
  label: string;
  description: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
}> = [
  {
    value: "lose",
    label: "Lose Weight",
    description: "Calorie deficit focus",
    iconName: "trending-down-outline",
  },
  {
    value: "maintain",
    label: "Maintain",
    description: "Balance intake & activity",
    iconName: "scale-outline",
  },
  {
    value: "gain",
    label: "Gain Muscle",
    description: "Surplus for growth",
    iconName: "trending-up-outline",
  },
];

const ProfileScreenSkeleton = () => (
  <View className="flex-1 bg-background items-center justify-center">
    <ActivityIndicator size="large" color="#2ab3b1" />
  </View>
);

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data: session } = authClient.useSession();
  const { data: profile, isLoading: isProfileLoading } = useUser();
  const {
    mutate: updateProfile,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateUser();

  const { mutate: signOut, isPending: isSigningOut } = useSignOut();

  const handleSignOut = () => {
    signOut();
    setSignOutOpen(false);
  };

  const [signOutOpen, setSignOutOpen] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
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

  useEffect(() => {
    if (profile) {
      reset({
        age: profile.age ? Number(profile.age) : undefined,
        height: profile.height ? Number(profile.height) : undefined,
        weight: profile.weight ? Number(profile.weight) : undefined,
        goal: (profile.goal as GoalValue) || undefined,
      });
    }
  }, [profile, reset]);

  if (isProfileLoading) {
    return <ProfileScreenSkeleton />;
  }

  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";
  const initials = userName
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 32,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pb-4">
          <Typography type="h2" className="text-heading font-bold font-inter">
            Profile
          </Typography>
          <ThemeToggle />
        </View>

        <View className="px-5 gap-6 pb-8">
          {/* User Info Card */}
          <Card variant="default" className="p-5">
            <View className="flex-row items-center gap-4">
              <Avatar size="md" variant="soft" color="accent" alt={userName}>
                {session?.user?.image ? (
                  <Avatar.Image source={{ uri: session.user.image }} />
                ) : null}
                <Avatar.Fallback>
                  {initials || (
                    <Ionicons name="person" size={20} color="#2ab3b1" />
                  )}
                </Avatar.Fallback>
              </Avatar>
              <View className="flex-1">
                <Card.Title
                  className="text-heading text-[18px] font-bold font-inter"
                  numberOfLines={1}
                >
                  {userName}
                </Card.Title>
                {!!userEmail && (
                  <Card.Description
                    className="text-muted text-[14px] font-inter"
                    numberOfLines={1}
                  >
                    {userEmail}
                  </Card.Description>
                )}
              </View>
            </View>
          </Card>

          {/* BIOMETRICS */}
          <View className="gap-4">
            <SectionHeader title="BIOMETRICS" iconName="body-outline" />
            <Input<ProfileFormValues>
              label="Your Age"
              name="age"
              control={control}
              placeholder="e.g., 25"
              keyboardType="number-pad"
              error={errors.age?.message}
            />
            <Input<ProfileFormValues>
              label="Height (cm)"
              name="height"
              control={control}
              placeholder="e.g., 175"
              keyboardType="decimal-pad"
              error={errors.height?.message}
            />
            <Input<ProfileFormValues>
              label="Current Weight (kg)"
              name="weight"
              control={control}
              placeholder="e.g., 70"
              keyboardType="decimal-pad"
              error={errors.weight?.message}
            />
          </View>

          {/* PRIMARY GOAL */}
          <View className="gap-3">
            <SectionHeader title="PRIMARY GOAL" iconName="flag-outline" />
            <Controller
              control={control}
              name="goal"
              render={({ fieldState: { error: goalError } }) => (
                <Surface
                  variant="default"
                  className="rounded-2xl overflow-hidden"
                >
                  <RadioGroup
                    value={selectedGoal}
                    onValueChange={(val) =>
                      setValue("goal", val as GoalValue, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    isInvalid={!!goalError}
                    className="gap-0"
                  >
                    {GOAL_OPTIONS.map((option, index) => (
                      <RadioGroup.Item
                        key={option.value}
                        value={option.value}
                        className={`px-4 py-3 ${index > 0 ? "border-t border-border/30" : ""}`}
                      >
                        {({ isSelected }: { isSelected: boolean }) => (
                          <Card.Body className="flex-row items-center gap-3 p-0">
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
                              <Label
                                className={isSelected ? "text-primary" : ""}
                              >
                                {option.label}
                              </Label>
                              <Description>{option.description}</Description>
                            </View>
                            <Radio>
                              <Radio.Indicator>
                                <Radio.IndicatorThumb />
                              </Radio.Indicator>
                            </Radio>
                          </Card.Body>
                        )}
                      </RadioGroup.Item>
                    ))}
                  </RadioGroup>
                  <FieldError
                    isInvalid={!!goalError}
                    className="px-4 pb-3 text-danger"
                  >
                    {goalError?.message}
                  </FieldError>
                </Surface>
              )}
            />
          </View>

          {/* Error display */}
          {updateError && (
            <View className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 rounded-xl px-4 py-3">
              <Typography
                type="body-xs"
                className="text-red-600 dark:text-red-400"
              >
                {updateError.message}
              </Typography>
            </View>
          )}

          {/* Save button */}
          <Button
            onPress={handleSubmit((data) => updateProfile(data))}
            isLoading={isUpdating}
            isDisabled={!isDirty}
            className="w-full"
          >
            <View className="flex-row items-center gap-2">
              <Button.Label className={BUTTON_LABEL_CLASSNAME}>
                {isDirty ? "Save Changes" : "No Changes"}
              </Button.Label>
              <Ionicons name="checkmark" size={18} color="white" />
            </View>
          </Button>

          {/* Divider */}
          <Divider label="Account" />

          {/* Sign Out */}
          <TouchableOpacity
            onPress={() => setSignOutOpen(true)}
            disabled={isSigningOut}
            className="bg-surface rounded-2xl px-5 py-4 flex-row items-center gap-3"
            activeOpacity={0.7}
          >
            <View className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 items-center justify-center">
              <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            </View>
            <Text className="text-red-500 text-[16px] font-semibold font-inter flex-1">
              Sign Out
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sign out confirmation */}
      <Modal
        visible={signOutOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setSignOutOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 items-center justify-center px-6"
          onPress={() => setSignOutOpen(false)}
        >
          <Pressable
            className="bg-surface w-full rounded-2xl p-5 gap-4"
            onPress={() => {}}
          >
            <View className="items-center gap-2">
              <View className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 items-center justify-center">
                <Ionicons name="log-out-outline" size={22} color="#ef4444" />
              </View>
              <Text className="text-heading text-[18px] font-bold font-inter text-center">
                Sign out?
              </Text>
              <Text className="text-muted text-[14px] font-inter text-center">
                You'll need to sign in again to access your data.
              </Text>
            </View>
            <View className="flex-row gap-3">
              <Button
                variant="outline"
                onPress={() => setSignOutOpen(false)}
                className="flex-1"
              >
                <Button.Label className="text-heading font-semibold text-[15px]">
                  Cancel
                </Button.Label>
              </Button>
              <Button
                onPress={handleSignOut}
                isLoading={isSigningOut}
                className="flex-1"
              >
                <View className="flex-row items-center gap-2">
                  <Button.Label className="text-white font-semibold text-[15px]">
                    Sign Out
                  </Button.Label>
                </View>
              </Button>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
