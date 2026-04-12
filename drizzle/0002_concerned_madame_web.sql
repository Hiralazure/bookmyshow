CREATE TABLE "booking_details" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "booking_details_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"booking_id" integer NOT NULL,
	"seat_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "booking" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "booking_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"movie_id" integer NOT NULL,
	"show_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"booking_status" varchar(255),
	"createdAt" date DEFAULT now(),
	"updatedAt" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "screens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "screens_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"total_seats" integer
);
--> statement-breakpoint
CREATE TABLE "seats" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "seats_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"seat_type" varchar(255),
	"seat_number" integer,
	"screen_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shows" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "shows_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"movie_id" integer NOT NULL,
	"screen_id" integer NOT NULL,
	"show_date" date,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL
);
--> statement-breakpoint
ALTER TABLE "movies" ALTER COLUMN "is_active" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "booking_details" ADD CONSTRAINT "booking_details_booking_id_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_details" ADD CONSTRAINT "booking_details_seat_id_seats_id_fk" FOREIGN KEY ("seat_id") REFERENCES "public"."seats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_show_id_shows_id_fk" FOREIGN KEY ("show_id") REFERENCES "public"."shows"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seats" ADD CONSTRAINT "seats_screen_id_screens_id_fk" FOREIGN KEY ("screen_id") REFERENCES "public"."screens"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shows" ADD CONSTRAINT "shows_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shows" ADD CONSTRAINT "shows_screen_id_screens_id_fk" FOREIGN KEY ("screen_id") REFERENCES "public"."screens"("id") ON DELETE no action ON UPDATE no action;