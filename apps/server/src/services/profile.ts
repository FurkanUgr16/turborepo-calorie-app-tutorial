import { db } from "@calorie-ai-app/db";
import { eq } from "@calorie-ai-app/db/drizzle";
import { userProfile } from "@calorie-ai-app/db/schema/profile";
import type { ProfileFormValues } from "@calorie-ai-app/auth/schemas/profile";

export type UserProfile = typeof userProfile.$inferSelect;

export const getUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  const [profile] = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1);

  return profile ?? null;
};

export const upsertUserProfile = async (
  userId: string,
  data: ProfileFormValues,
): Promise<void> => {
  const existingProfile = await getUserProfile(userId);

  if (existingProfile) {
    await db
      .update(userProfile)
      .set({
        age: data.age,
        height: data.height.toString(),
        weight: data.weight.toString(),
        goal: data.goal,
        updatedAt: new Date(),
      })
      .where(eq(userProfile.userId, userId));
  }

  await db.insert(userProfile).values({
    id: crypto.randomUUID(),
    userId,
    age: data.age,
    height: data.height.toString(),
    weight: data.weight.toString(),
    goal: data.goal,
  });
};
