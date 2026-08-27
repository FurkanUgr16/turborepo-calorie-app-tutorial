import { View, Pressable } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router/build";
import { useThemeColor } from "heroui-native";
import AuthTemplate from "@/components/templates/auth-template";
import { Input } from "@/components/ui/input";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@calorie-ai-app/auth/schemas";
import { Button, BUTTON_LABEL_CLASSNAME } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useToast, Typography } from "heroui-native";
import { useTransition } from "react";
import AuthFooterLink from "@/components/containers/auth/auth-footer-links";

const ForgotPassword = () => {
  const router = useRouter();
  const muted = useThemeColor("muted");
  const accent = useThemeColor("accent-foreground");
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const handleEmailSent = (data: ForgotPasswordFormValues) => {
    startTransition(async () => {
      await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: "/reset-password",
        fetchOptions: {
          onSuccess: () => {
            setEmailSent(true);
          },
          onError: ({ error }) => {
            toast.show({
              variant: "danger",
              label: error.message,
              actionLabel: "X",
              icon: <Ionicons name="alert-circle" size={24} color={muted} />,
              onActionPress: ({ hide }) => {
                hide();
              },
            });
          },
        },
      });
    });
  };

  return (
    <View className="flex-1">
      <AuthTemplate
        title="Forgot Password?"
        subtitle="Enter your email address and we'll send you instructions to reset your password."
        onBack={() => router.back()}
      >
        {emailSent ? (
          <View className="gap-8 items-center py-10">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Ionicons name="mail-outline" size={28} color="#2ab3b1" />
            </View>
            <View className="gap-3 items-center">
              <Typography type="h3" className="text-center text-heading">
                Check Your Inbox
              </Typography>
              <Typography type="body" className="text-center text-neutral-400">
                We've sent password reset instructions to{"\n"}
                <Typography className="text-foreground">
                  {getValues("email")}
                </Typography>
              </Typography>
            </View>
            <Button onPress={() => router.push("/sign-in")} className="w-full">
              <Button.Label className={BUTTON_LABEL_CLASSNAME}>
                Back to Login
              </Button.Label>
            </Button>
          </View>
        ) : (
          <View className="gap-8">
            <Input
              label="Email Address"
              name="email"
              control={control}
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              leftElement={
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={muted as string}
                />
              }
            />

            {errors.email && (
              <Typography type="body-sm" className="text-center text-red-500">
                {errors.email.message}
              </Typography>
            )}

            <Button
              onPress={handleSubmit((data) => handleEmailSent(data))}
              isLoading={isPending}
              className="w-full"
            >
              <View className="flex-row items-center gap-2">
                <Button.Label className={BUTTON_LABEL_CLASSNAME}>
                  Send Instructions
                </Button.Label>
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color={accent as string}
                />
              </View>
            </Button>

            <AuthFooterLink
              question="Wait, I remember my password..."
              linkText="Back to Login"
              onPress={() => router.push("/sign-in")}
            />
          </View>
        )}
      </AuthTemplate>
    </View>
  );
};

export default ForgotPassword;
