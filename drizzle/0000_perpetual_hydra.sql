CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255),
	"email" varchar(255) NOT NULL,
	"phone" varchar(255),
	"role" varchar(255),
	"password" varchar(255),
	"salt" text,
	"hash" varchar(255),
	"createdAt" date DEFAULT now(),
	"updatedAt" date DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "role_check" CHECK ("users"."role" IN ('admin', 'user'))
);
