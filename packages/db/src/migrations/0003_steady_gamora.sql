CREATE TABLE `meal` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`food_items` text NOT NULL,
	`nutrition` text NOT NULL,
	`portion_estimate` text NOT NULL,
	`dietary_tags` text NOT NULL,
	`health_notes` text NOT NULL,
	`image_url` text,
	`meal_type` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `meal_userId_idx` ON `meal` (`user_id`);--> statement-breakpoint
CREATE INDEX `meal_createdAt_idx` ON `meal` (`created_at`);