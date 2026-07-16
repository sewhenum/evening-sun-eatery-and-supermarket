import { pgTable, serial, text, numeric, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const orderStatusEnum = pgEnum("order_status", [
  "pending", "confirmed", "completed", "cancelled"
]);

export const orderTypeEnum = pgEnum("order_type", ["delivery", "pickup"]);

export const adminOrdersTable = pgTable("admin_orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  items: text("items").notNull(),
  total: numeric("total", { precision: 12, scale: 2 }).notNull(),
  status: orderStatusEnum("status").notNull().default("pending"),
  orderType: orderTypeEnum("order_type").notNull().default("delivery"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const adminCustomersTable = pgTable("admin_customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(),
  email: text("email"),
  totalOrders: integer("total_orders").notNull().default(0),
  totalSpent: numeric("total_spent", { precision: 12, scale: 2 }).notNull().default("0"),
  lastOrderDate: timestamp("last_order_date"),
  status: text("status").notNull().default("active"),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(adminOrdersTable).omit({ id: true, createdAt: true });
export const insertCustomerSchema = createInsertSchema(adminCustomersTable).omit({ id: true, joinedAt: true });

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type AdminOrder = typeof adminOrdersTable.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type AdminCustomer = typeof adminCustomersTable.$inferSelect;
