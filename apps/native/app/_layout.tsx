import "@/global.css";
import { Stack } from "expo-router/build";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { AppThemeProvider } from "@/contexts/app-theme-context";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding-one" />
      <Stack.Screen name="onboarding-two" />
      <Stack.Screen name="onboarding-three" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="modal"
        options={{ title: "Modal", presentation: "modal" }}
      />
    </Stack>
  );
}

export default function Layout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <SafeAreaProvider>
            <AppThemeProvider>
              <HeroUINativeProvider
                config={{
                  toast: {
                    defaultProps: {
                      placement: "top",
                    },
                    insets: {
                      top: 12,
                      bottom: 12,
                      left: 12,
                      right: 12,
                    },
                    maxVisibleToasts: 2,
                  },
                }}
              >
                <StackLayout />
              </HeroUINativeProvider>
            </AppThemeProvider>
          </SafeAreaProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
