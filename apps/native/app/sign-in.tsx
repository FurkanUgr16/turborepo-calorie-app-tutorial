import { View, Pressable } from "react-native";
import AuthTemplate from "@/components/templates/auth-template";
import { Input } from "@/components/ui/input";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "heroui-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormValues,
} from "@calorie-ai-app/auth/schemas";
import { Typography } from "heroui-native";
import { Button, BUTTON_LABEL_CLASSNAME } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useToast } from "heroui-native";
import { useTransition } from "react";
import { useRouter } from "expo-router/build";
import { Divider } from "@/components/ui/divider";
import SocialAuthGroup from "@/components/containers/auth/social-login";
import AuthFooterLink from "@/components/containers/auth/auth-footer-links";

const SignIn = () => {
  const router = useRouter();
  const muted = useThemeColor("muted");
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = (data: LoginFormValues) => {
    const { email, password } = data;
    startTransition(async () => {
      await authClient.signIn.email({
        email,
        password,
        fetchOptions: {
          onSuccess: () => {
            router.push("/(tabs)");
          },
          onError: ({ error }) => {
            toast.show({
              variant: "danger",
              label: error.message,
              icon: <Ionicons name="alert-circle" size={24} color={muted} />,
              actionLabel: "X",
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
    <AuthTemplate
      title="Welcome Back"
      subtitle="Log in to continue your health journey."
      onBack={() => router.back()}
    >
      <View className="gap-6">
        <View className="gap-4">
          <Input
            label="Email"
            name="email"
            control={control}
            placeholder="name@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            leftElement={
              <Ionicons name="mail-outline" size={18} color={muted as string} />
            }
          />

          <Input
            label="Password"
            name="password"
            control={control}
            placeholder="••••••••"
            secureTextEntry
            rightElement={
              <Pressable onPress={() => router.push("/forgot-password")}>
                <Typography type="body-xs" className="text-primary">
                  Forgot?
                </Typography>
              </Pressable>
            }
          />
        </View>

        {errors.email && (
          <Typography type="body-xs" className="text-error">
            {errors.email.message}
          </Typography>
        )}

        <Button
          className="w-full"
          isLoading={isPending}
          onPress={handleSubmit((data) => handleSignIn(data))}
        >
          <Button.Label className={BUTTON_LABEL_CLASSNAME}>
            Sign In
          </Button.Label>
        </Button>
        <Divider label="or continue with" />

        <SocialAuthGroup
          onGooglePress={() =>
            toast.show({
              variant: "success",
              label: "Signed in with Google",
              icon: (
                <Ionicons
                  name="logo-google"
                  size={18}
                  color={muted as string}
                />
              ),
            })
          }
          onApplePress={() =>
            toast.show({
              variant: "success",
              label: "Signed in with Apple",
              icon: (
                <Ionicons name="logo-apple" size={18} color={muted as string} />
              ),
            })
          }
        />

        <AuthFooterLink
          question="Don't have an account?"
          linkText="Sign Up"
          onPress={() => router.push("/sign-up")}
        />
      </View>
    </AuthTemplate>
  );
};

export default SignIn;
