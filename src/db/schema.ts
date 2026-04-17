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
  unique,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
export const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
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
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text(),
  releaseDate: date("release_date").defaultNow(),
  duration: integer(),
  isActive: boolean("is_active").default(true),
});
export const screenTables = pgTable("screens", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  screenName: varchar("title", { length: 255 }).notNull(),
  totalSeats: integer("total_seats"),
});
export const seatTables = pgTable("seats", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  seatType: varchar("seat_type", { length: 255 }),
  seatNumber: integer("seat_number"),
  screenId: integer("screen_id")
    .references(() => screenTables.id)
    .$type<number | null>(),
});
export const showTables = pgTable("shows", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  movieId: integer("movie_id")
    .notNull()
    .references(() => movieTables.id)
    .$type<number>(),
  screenId: integer("screen_id")
    .notNull()
    .references(() => screenTables.id)
    .$type<number>(),
  showDate: varchar("show_date"),
  startTime: varchar("start_time").notNull(),
  endTime: varchar("end_time").notNull(),
});
export const bookingTables = pgTable("booking", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  movieId: integer("movie_id")
    .notNull()
    .references(() => movieTables.id),
  showId: integer("show_id")
    .notNull()
    .references(() => showTables.id),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  bookingStatus: varchar("booking_status", { length: 255 }),
  createdAt: date().defaultNow(),
  updatedAt: date().defaultNow(),
});

export const bookingDetailTables = pgTable(
  "booking_details",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    bookingId: integer("booking_id")
      .notNull()
      .references(() => bookingTables.id),
    seatId: integer("seat_id")
      .notNull()
      .references(() => seatTables.id),
    showId: integer("show_id")
      .notNull()
      .references(() => showTables.id),
  },
  (table) => ({
    uniqueSeatPerShow: unique("unique_seat_per_show").on(
      table.seatId,
      table.showId,
    ),
  }),
);
