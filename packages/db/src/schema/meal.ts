import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

export const meal = sqliteTable(
  "meal",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    foodItems: text("food_items", { mode: "json" })
      .notNull()
      .$type<Array<{ name: string; confidence: number }>>(),
    nutrition: text("nutrition", { mode: "json" }).notNull().$type<{
      calories: number;
      protein_g: number;
      carbs_g: number;
      fat_g: number;
    }>(),
    portionEstimate: text("portion_estimate").notNull(),
    dietaryTags: text("dietary_tags", { mode: "json" })
      .notNull()
      .$type<string[]>(),
    healthNotes: text("health_notes").notNull(),
    imageUrl: text("image_url"),
    mealType: text("meal_type").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("meal_userId_idx").on(table.userId),
    index("meal_createdAt_idx").on(table.createdAt),
  ],
);

export const mealRelations = relations(meal, ({ one }) => ({
  user: one(user, {
    fields: [meal.userId],
    references: [user.id],
  }),
}));
