import { env } from "@calorie-ai-app/env/native";
import Constants from "expo-constants";
import { authClient } from "./auth-client";
import { SaveMealRequest } from "@calorie-ai-app/auth/schemas/meal";
import { MealRecord, TodayMealsResponse } from "@/app/types";
import { MealAnalysisResult } from "@/types";
import { File } from "expo-file-system";
import { type MealAnalysisResponse } from "@calorie-ai-app/auth/schemas/meal";
import type { WeeklyInsightsResponse } from "@/app/types";

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

  const response = await fetch(
    `${env.EXPO_PUBLIC_SERVER_URL}/api/user/profile`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to get profile");
  }

  return response.json();
};

export const saveProfile = async (data: {
  age: number;
  height: number;
  weight: number;
  goal: string;
}) => {
  const headers = await getAuthHeaders();

  const response = await fetch(
    `${env.EXPO_PUBLIC_SERVER_URL}/api/user/profile`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to save profile");
  }

  return response.json();
};

//meals

export const getMeals = async () => {
  const headers = await getAuthHeaders();

  const response = await fetch(`${env.EXPO_PUBLIC_SERVER_URL}/api/meals`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }

  return response.json() as Promise<{
    success: boolean;
    meals: MealRecord[];
  }>;
};

export const getMealById = async (id: string) => {
  const headers = await getAuthHeaders();

  const response = await fetch(
    `${env.EXPO_PUBLIC_SERVER_URL}/api/meals/${id}`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch meal by id");
  }

  return response.json() as Promise<{
    success: boolean;
    meal: MealRecord;
  }>;
};

export const getMealsToday = async (date: string) => {
  const headers = await getAuthHeaders();

  const response = await fetch(
    `${env.EXPO_PUBLIC_SERVER_URL}/api/meals/today?date=${date}`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch today's meals");
  }

  return response.json() as Promise<TodayMealsResponse>;
};

export const getMealsByDate = async (date: string) => {
  const headers = await getAuthHeaders();

  const response = await fetch(
    `${env.EXPO_PUBLIC_SERVER_URL}/api/meals?date=${date}`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }

  return response.json() as Promise<{
    success: boolean;
    meals: MealRecord[];
  }>;
};

export const saveMeal = async (data: SaveMealRequest) => {
  const headers = await getAuthHeaders();

  const response = await fetch(`${env.EXPO_PUBLIC_SERVER_URL}/api/meals`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to save meal");
  }

  return response.json() as Promise<{
    success: boolean;
    meal: MealRecord;
  }>;
};

export const analyzeMeal = async (data: {
  image_base64: string;
  media_type: string;
}) => {
  const headers = await getAuthHeaders();

  const response = await fetch(
    `${env.EXPO_PUBLIC_SERVER_URL}/api/analyze/meal`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to analyze meal");
  }

  return response.json() as Promise<MealAnalysisResult>;
};

export const uriToBase64 = async (uri: string) => {
  const file = new File(uri);
  return file.base64();
};

export function mapAnalysisToSavePayload(
  analysis: MealAnalysisResponse,
  imageUrl?: string,
): SaveMealRequest {
  return {
    food_items: analysis.food_items,
    nutrition: analysis.nutrition,
    portion_estimate: analysis.portion_estimate,
    dietary_tags: analysis.dietary_tags,
    health_notes: analysis.health_notes,
    meal_type: analysis.meal_type,
    image_url: imageUrl,
  };
}

export const getWeeklyInsights = async () => {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${env.EXPO_PUBLIC_SERVER_URL}/api/insights/weekly`,
    {
      method: "GET",
      headers,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weekly insights");
  }

  return response.json() as Promise<WeeklyInsightsResponse>;
};
