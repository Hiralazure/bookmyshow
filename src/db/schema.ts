import {
  integer,
  pgTable,
  varchar,
  text,
  date,
  check,
  boolean,
  time,
  foreignKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/gel-core";
import { decimal } from "drizzle-orm/gel-core";
export const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 255 }),
    role: varchar("role", { length: 255 }),
    password: varchar("password", { length: 255 }),
    salt: text("salt"),
    hash: varchar("hash", { length: 255 }),
    createdAt: date().defaultNow(),
    updatedAt: date().defaultNow(),
  },
  (table) => {
    return {
      // Adds CHECK constraint to DB: role IN ('admin', 'user')
      roleCheck: check("role_check", sql`${table.role} IN ('admin', 'user')`),
    };
  },
);
export const movieTables = pgTable("movies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text(),
  releaseDate: date("release_date"),
  duration: integer(),
  isActive: boolean("is_active").default(true),
});
export const screenTables = pgTable("screens", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  screenName: varchar("title", { length: 255 }).notNull(),
  totalSeats: integer("total_seats"),
});
export const seatTables = pgTable("seats", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  seatType: varchar("seat_type", { length: 255 }),
  seatNumber: integer("seat_number"),
  screenId: integer("screen_id")
    .notNull()
    .references(() => screenTables.id)
    .$type<number>(),
});
export const showTables = pgTable("shows", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  movieId: integer("movie_id")
    .notNull()
    .references(() => movieTables.id)
    .$type<number>(),
  screenId: integer("screen_id")
    .notNull()
    .references(() => screenTables.id)
    .$type<number>(),
  showDate: date("show_date"),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
});
export const bookingTables = pgTable("booking", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  movieId: integer("movie_id")
    .notNull()
    .references(() => movieTables.id)
    .$type<number>(),
  showId: integer("show_id")
    .notNull()
    .references(() => showTables.id)
    .$type<number>(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id)
    .$type<number>(),
  bookingStatus: varchar("booking_status", { length: 255 }),
  createdAt: date().defaultNow(),
  updatedAt: date().defaultNow(),
});

export const bookingDetailTables = pgTable("booking_details", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookingId: integer("booking_id")
    .notNull()
    .references(() => bookingTables.id)
    .$type<number>(),
  seatId: integer("seat_id")
    .notNull()
    .references(() => seatTables.id)
    .$type<number>(),
});
