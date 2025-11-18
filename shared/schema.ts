import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const downloadRequestSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export type DownloadRequest = z.infer<typeof downloadRequestSchema>;

export interface VideoQuality {
  quality: string;
  url: string;
  size?: string;
}

export interface DownloadResult {
  success: boolean;
  data?: {
    title?: string;
    thumbnail?: string;
    duration?: string;
    url?: string;
    urls?: string[];
    qualities?: VideoQuality[];
    author?: string;
    platform?: string;
  };
  error?: string;
}
