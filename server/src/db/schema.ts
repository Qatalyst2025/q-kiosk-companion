import { pgTable, serial, text, varchar, integer, timestamp, pgEnum, boolean } from "drizzle-orm/pg-core";

// User roles
export const userRole = pgEnum("user_role", ["admin", "staff", "customer"]);

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  supabaseId: varchar("supabase_id", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  password: text("password").notNull(),
  role: userRole("role").default("customer").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Queues
export const queues = pgTable("queues", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(), // e.g., "Clinic Main Queue"
  location: varchar("location", { length: 200 }),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Queue Entries
export const queueEntries = pgTable("queue_entries", {
  id: serial("id").primaryKey(),
  queueId: integer("queue_id").references(() => queues.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  status: varchar("status", { length: 20 }).default("waiting"), // waiting/served/cancelled
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  servedAt: timestamp("served_at"),
});

// Feedback
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  queueId: integer("queue_id").references(() => queues.id).notNull(),
  rating: integer("rating").notNull(), // 1–5 stars
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Notifications (SMS/Email log)
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: varchar("type", { length: 50 }).notNull(), // sms/email
  status: varchar("status", { length: 50 }).default("pending"),
  sentAt: timestamp("sent_at").defaultNow(),
});
