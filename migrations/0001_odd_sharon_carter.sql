CREATE TABLE `exercises` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_sessions` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`location` text NOT NULL,
	`status` text NOT NULL,
	`date` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);
--> statement-breakpoint
CREATE TABLE `workout_session` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_session_id` integer,
	`workouts_id` integer,
	FOREIGN KEY (`user_session_id`) REFERENCES `user_sessions`(`id`),
	FOREIGN KEY (`workouts_id`) REFERENCES `workouts`(`id`)
);
--> statement-breakpoint
CREATE TABLE `workouts` (
	`id` integer PRIMARY KEY NOT NULL,
	`exercise_id` integer,
	`reps` integer NOT NULL,
	`set` integer NOT NULL,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`)
);
