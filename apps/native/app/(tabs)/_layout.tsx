import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useThemeColor } from "heroui-native";
import React, { useCallback } from "react";
import { Pressable, Text } from "react-native";

import { ThemeToggle } from "@/components/theme-toggle";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function DrawerLayout() {
  const themeColorBackground = useThemeColor("background");
  const themeColorForeground = useThemeColor("foreground");
  const themeColorMuted = useThemeColor("muted");
  const themeColorBorder = useThemeColor("border");
  const insets = useSafeAreaInsets();

  const renderThemeToggle = useCallback(() => <ThemeToggle />, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: themeColorBackground as string,
        },
        headerTintColor: themeColorForeground as string,
        headerShadowVisible: false,
        headerRight: renderThemeToggle,
        tabBarStyle: {
          backgroundColor: themeColorBackground as string,
          borderTopColor: themeColorBorder as string,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: insets.bottom,
          paddingTop: 6,
        },
        tabBarActiveTintColor: "#2ab3b1",
        tabBarInactiveTintColor: themeColorMuted as string,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Calorie AI",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="diary"
        options={{
          title: "Diary",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default DrawerLayout;
