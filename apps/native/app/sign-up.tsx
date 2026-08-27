import { View, Text } from "react-native";
import { useRouter } from "expo-router/build";
import { useToast } from "heroui-native";
import { useTransition } from "react";
import { Typography } from "heroui-native";
import { Button, BUTTON_LABEL_CLASSNAME } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useThemeColor } from "heroui-native";
import {
  registerSchema,
  type RegisterFormValues,
} from "@calorie-ai-app/auth/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import AuthTemplate from "@/components/templates/auth-template";
import SocialAuthGroup from "@/components/containers/auth/social-login";
import { Divider } from "@/components/ui/divider";
import AuthFooterLink from "@/components/containers/auth/auth-footer-links";
import { Checkbox } from "@/components/ui/checkbox";

const Signup = () => {
  const router = useRouter();
  const muted = useThemeColor("muted");
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const handleSignup = async (data: RegisterFormValues) => {
    startTransition(async () => {
      await authClient.signUp.email({
        name: data.fullName,
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            router.push("/onboarding-profile");
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
      title="Create Account"
      subtitle="Start your intelligent nutrition tracking today."
      onBack={() => router.back()}
    >
      <View className="gap-6">
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
        <Divider label="Or register with email" />

        <Input
          label="Full Name"
          name="fullName"
          control={control}
          placeholder="John Doe"
          leftElement={
            <Ionicons name="person-outline" size={18} color={muted as string} />
          }
        />
        <Input
          label="Email"
          name="email"
          control={control}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="name@example.com"
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
        />

        <Checkbox
          name="terms"
          control={control}
          label={
            <Typography className="text-neutral-400">
              I agree to the{" "}
              <Typography type="body-sm" className="text-primary">
                Terms
              </Typography>{" "}
              &{" "}
              <Typography type="body-sm" className="text-primary">
                Privacy Policy
              </Typography>
            </Typography>
          }
        />

        {errors.email && (
          <Typography type="body-xs" className="text-error">
            {errors.email.message}
          </Typography>
        )}

        <Button
          className="w-full"
          isLoading={isPending}
          onPress={handleSubmit((data) => handleSignup(data))}
        >
          <Button.Label className={BUTTON_LABEL_CLASSNAME}>
            Sign Up
          </Button.Label>
        </Button>
        <AuthFooterLink
          question="Already have an account?"
          linkText="Log In"
          onPress={() => router.push("/sign-in")}
        />
      </View>
    </AuthTemplate>
  );
};

export default Signup;
