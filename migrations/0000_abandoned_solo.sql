CREATE TABLE `classes` (
	`id` integer PRIMARY KEY NOT NULL,
	`class` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL
);
