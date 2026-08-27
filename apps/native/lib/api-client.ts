import { env } from "@calorie-ai-app/env/native";
import Constants from "expo-constants";
import { authClient } from "./auth-client";

export const getAuthHeaders = async () => {
  const cookies = await authClient.getCookie();
  const scheme = Constants.expoConfig?.scheme as string;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "expo-origin": `${scheme}://`,
  };

  if (cookies) {
    headers["cookie"] = cookies;
  }

  return headers;
};

export const getProfile = async () => {
  const headers = await getAuthHeaders();

  const response = await fetch(`${env.EXPO_PUBLIC_SERVER_URL}/profile`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return await response.json();
};

export const saveProfile = async (data: {
  age: number;
  height: number;
  weight: number;
  goal: string;
}) => {
  const headers = await getAuthHeaders();

  const response = await fetch(`${env.EXPO_PUBLIC_SERVER_URL}/profile`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to save profile");
  }

  return await response.json();
};
