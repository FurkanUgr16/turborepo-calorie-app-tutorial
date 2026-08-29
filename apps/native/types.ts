export type MealRecord = {
  id: string;
  userId: string;
  foodItems: Array<{ name: string; confidence: number }>;
  nutrition: {
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
  };
  portionEstimate: string;
  dietaryTags: string[];
  healthNotes: string;
  mealType: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TodayMealsResponse = {
  summary: {
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    meal_count: number;
  };
  meals: MealRecord[];
};

export type WeeklyInsightsResponse = {
  dailyCalories: Array<{ date: string; calories: number }>;
  macros: {
    avgCalories: number;
    avgProtein: number;
    avgCarbs: number;
    avgFat: number;
  };
  streak: { current: number; longest: number };
  mealTypes: Array<{ type: string; calories: number; count: number }>;
};

export type MealAnalysisResult = {
  success: boolean;
  analysis: {
    food_items: Array<{ name: string; confidence: number }>;
    nutrition: {
      calories: number;
      protein_g: number;
      carbs_g: number;
      fat_g: number;
    };
    portion_estimate: string;
    dietary_tags: string[];
    health_notes: string;
    meal_type: string;
    metadata: {
      user_id: string;
      timestamp: string;
      meal_type: string;
    };
  };
};
