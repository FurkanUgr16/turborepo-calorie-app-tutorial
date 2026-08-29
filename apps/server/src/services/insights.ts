import { db } from "@calorie-ai-app/db";
import type { MealRow } from "./meal";
import { meal } from "@calorie-ai-app/db/schema/meal";
import { and, desc, eq, gte } from "@calorie-ai-app/db/drizzle";

export type DailyCaloriesPoint = { date: string; calories: number };

export type MacroAverages = {
  avgCalories: number;
  avgProtein: number;
  avgCarbs: number;
  avgFat: number;
};

export type Streak = { current: number; longest: number };

export type MealTypeStat = { type: string; calories: number; count: number };

const dateKey = (d: Date): string => d.toISOString().split("T")[0]!;

export function groupMealsByDate(meals: MealRow[]): Map<string, MealRow[]> {
  const byDate = new Map<string, MealRow[]>();
  for (const m of meals) {
    const key = dateKey(new Date(m.createdAt));
    const existing = byDate.get(key) ?? [];
    existing.push(m);
    byDate.set(key, existing);
  }
  return byDate;
}

export function dailyCaloriesLast7Days(
  byDate: Map<string, MealRow[]>,
  now: Date,
): DailyCaloriesPoint[] {
  const points: DailyCaloriesPoint[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = dateKey(d);
    const dayMeals = byDate.get(key) ?? [];
    const calories = dayMeals.reduce(
      (sum, m) => sum + (m.nutrition?.calories ?? 0),
      0,
    );
    points.push({ date: key, calories: Math.round(calories) });
  }
  return points;
}

export function weeklyMacroAverages(
  weekMeals: MealRow[],
  daysWithData: number,
): MacroAverages {
  const totals = weekMeals.reduce(
    (acc, m) => {
      const n = m.nutrition;
      return {
        calories: acc.calories + (n?.calories ?? 0),
        protein_g: acc.protein_g + (n?.protein_g ?? 0),
        carbs_g: acc.carbs_g + (n?.carbs_g ?? 0),
        fat_g: acc.fat_g + (n?.fat_g ?? 0),
      };
    },
    { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 },
  );

  const days = daysWithData || 1;
  return {
    avgCalories: Math.round(totals.calories / days),
    avgProtein: Math.round(totals.protein_g / days),
    avgCarbs: Math.round(totals.carbs_g / days),
    avgFat: Math.round(totals.fat_g / days),
  };
}

export function computeStreaks(
  byDate: Map<string, MealRow[]>,
  now: Date,
): Streak {
  let currentStreak = 0;
  const cursor = new Date(now);
  cursor.setHours(0, 0, 0, 0);
  while (byDate.has(dateKey(cursor))) {
    currentStreak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  let longestStreak = 0;
  const sortedDates = Array.from(byDate.keys()).sort();
  if (sortedDates.length > 0) {
    let tempStreak = 0;
    const earliest = new Date(sortedDates[0]! + "T00:00:00");
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    for (let d = new Date(today); d >= earliest; d.setDate(d.getDate() - 1)) {
      const key = dateKey(d);
      if (byDate.has(key)) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  return { current: currentStreak, longest: longestStreak };
}

export function mealTypeDistribution(weekMeals: MealRow[]): MealTypeStat[] {
  const typeMap = new Map<string, { calories: number; count: number }>();
  for (const m of weekMeals) {
    const type = m.mealType || "unknown";
    const cal = m.nutrition?.calories ?? 0;
    const existing = typeMap.get(type) ?? { calories: 0, count: 0 };
    typeMap.set(type, {
      calories: existing.calories + cal,
      count: existing.count + 1,
    });
  }
  return Array.from(typeMap.entries())
    .map(([type, data]) => ({
      type,
      calories: Math.round(data.calories),
      count: data.count,
    }))
    .sort((a, b) => b.calories - a.calories);
}

export async function getWeeklyInsights(userId: string) {
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  const meals = await db
    .select()
    .from(meal)
    .where(and(eq(meal.userId, userId), gte(meal.createdAt, thirtyDaysAgo)))
    .orderBy(desc(meal.createdAt));

  const byDate = groupMealsByDate(meals);
  const dailyCalories = dailyCaloriesLast7Days(byDate, now);
  const weekMeals = dailyCalories.flatMap((d) => byDate.get(d.date) ?? []);
  const daysWithData = dailyCalories.filter((d) => d.calories > 0).length || 1;
  const macros = weeklyMacroAverages(weekMeals, daysWithData);
  const streak = computeStreaks(byDate, now);
  const mealTypes = mealTypeDistribution(weekMeals);

  return { dailyCalories, macros, streak, mealTypes };
}
