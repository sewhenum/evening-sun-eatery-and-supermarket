import { Router } from "express";
import { db, adminOrdersTable, adminCustomersTable } from "@workspace/db";
import { desc, eq, ilike, or, sql, and, gte, lt } from "drizzle-orm";
import { parsePaginationParam, MAX_PAGE_LIMIT } from "../lib/pagination.js";

const router = Router();

const ALLOWED_ORDER_STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;

// GET /admin/stats
router.get("/admin/stats", async (_req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    const [totalRevRow] = await db
      .select({ total: sql<string>`coalesce(sum(total::numeric), 0)` })
      .from(adminOrdersTable)
      .where(eq(adminOrdersTable.status, "completed"));

    const [totalOrdRow] = await db
      .select({ count: sql<string>`count(*)` })
      .from(adminOrdersTable);

    const [totalCustRow] = await db
      .select({ count: sql<string>`count(*)` })
      .from(adminCustomersTable);

    const [thisMonthRevRow] = await db
      .select({ total: sql<string>`coalesce(sum(total::numeric), 0)` })
      .from(adminOrdersTable)
      .where(and(eq(adminOrdersTable.status, "completed"), gte(adminOrdersTable.createdAt, startOfMonth)));

    const [lastMonthRevRow] = await db
      .select({ total: sql<string>`coalesce(sum(total::numeric), 0)` })
      .from(adminOrdersTable)
      .where(and(
        eq(adminOrdersTable.status, "completed"),
        gte(adminOrdersTable.createdAt, startOfLastMonth),
        lt(adminOrdersTable.createdAt, startOfMonth)
      ));

    const [thisMonthOrdRow] = await db
      .select({ count: sql<string>`count(*)` })
      .from(adminOrdersTable)
      .where(gte(adminOrdersTable.createdAt, startOfMonth));

    const [lastMonthOrdRow] = await db
      .select({ count: sql<string>`count(*)` })
      .from(adminOrdersTable)
      .where(and(
        gte(adminOrdersTable.createdAt, startOfLastMonth),
        lt(adminOrdersTable.createdAt, startOfMonth)
      ));

    const [thisMonthCustRow] = await db
      .select({ count: sql<string>`count(*)` })
      .from(adminCustomersTable)
      .where(gte(adminCustomersTable.joinedAt, startOfMonth));

    const [lastMonthCustRow] = await db
      .select({ count: sql<string>`count(*)` })
      .from(adminCustomersTable)
      .where(and(
        gte(adminCustomersTable.joinedAt, startOfLastMonth),
        lt(adminCustomersTable.joinedAt, startOfMonth)
      ));

    const topItemsRaw = await db
      .select({
        items: adminOrdersTable.items,
        total: adminOrdersTable.total,
      })
      .from(adminOrdersTable)
      .where(eq(adminOrdersTable.status, "completed"))
      .limit(200);

    // Parse items string to count top items
    const itemCounts: Record<string, { count: number; revenue: number }> = {};
    for (const row of topItemsRaw) {
      const parts = row.items.split(",").map((s) => s.trim().replace(/\s*x\d+$/, "").trim());
      for (const part of parts) {
        if (!part) continue;
        if (!itemCounts[part]) itemCounts[part] = { count: 0, revenue: 0 };
        itemCounts[part].count += 1;
        itemCounts[part].revenue += parseFloat(row.total) / parts.length;
      }
    }
    const topItems = Object.entries(itemCounts)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([name, { count, revenue }]) => ({ name, count, revenue: Math.round(revenue) }));

    const totalRev = parseFloat(totalRevRow.total);
    const totalOrd = parseInt(totalOrdRow.count);
    const totalCust = parseInt(totalCustRow.count);
    const avgOrd = totalOrd > 0 ? totalRev / totalOrd : 0;

    const thisMonthRev = parseFloat(thisMonthRevRow.total);
    const lastMonthRev = parseFloat(lastMonthRevRow.total);
    const revenueChange = lastMonthRev > 0 ? ((thisMonthRev - lastMonthRev) / lastMonthRev) * 100 : 0;

    const thisMonthOrd = parseInt(thisMonthOrdRow.count);
    const lastMonthOrd = parseInt(lastMonthOrdRow.count);
    const ordersChange = lastMonthOrd > 0 ? ((thisMonthOrd - lastMonthOrd) / lastMonthOrd) * 100 : 0;

    const thisMonthCust = parseInt(thisMonthCustRow.count);
    const lastMonthCust = parseInt(lastMonthCustRow.count);
    const customersChange = lastMonthCust > 0 ? ((thisMonthCust - lastMonthCust) / lastMonthCust) * 100 : 0;

    res.json({
      totalRevenue: totalRev,
      totalOrders: totalOrd,
      totalCustomers: totalCust,
      averageOrderValue: Math.round(avgOrd),
      revenueChange: Math.round(revenueChange * 10) / 10,
      ordersChange: Math.round(ordersChange * 10) / 10,
      customersChange: Math.round(customersChange * 10) / 10,
      topItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// GET /admin/orders
router.get("/admin/orders", async (req, res) => {
  try {
    const { status, limit: limitRaw = "50", offset: offsetRaw = "0" } = req.query as Record<string, string>;

    const limitVal = parsePaginationParam(limitRaw);
    const offsetVal = parsePaginationParam(offsetRaw);
    if (limitVal === null || offsetVal === null) {
      return res.status(400).json({ error: "limit and offset must be non-negative integers" });
    }
    const limit = Math.min(limitVal, MAX_PAGE_LIMIT);
    const offset = offsetVal;

    const conditions = status && status !== "all" ? [eq(adminOrdersTable.status, status as any)] : [];
    const rows = await db
      .select()
      .from(adminOrdersTable)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(adminOrdersTable.createdAt))
      .limit(limit)
      .offset(offset);

    res.json(rows.map(r => ({
      id: r.id,
      customerName: r.customerName,
      customerPhone: r.customerPhone,
      items: r.items,
      total: parseFloat(r.total),
      status: r.status,
      orderType: r.orderType,
      createdAt: r.createdAt.toISOString(),
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// GET /admin/orders/monthly
router.get("/admin/orders/monthly", async (_req, res) => {
  try {
    const rows = await db.execute(sql`
      SELECT
        to_char(date_trunc('month', created_at), 'Mon YYYY') AS month,
        date_trunc('month', created_at) AS month_date,
        coalesce(sum(CASE WHEN status = 'completed' THEN total::numeric ELSE 0 END), 0) AS revenue,
        count(*) AS orders,
        count(DISTINCT customer_phone) AS new_customers
      FROM admin_orders
      WHERE created_at >= NOW() - INTERVAL '12 months'
      GROUP BY date_trunc('month', created_at)
      ORDER BY date_trunc('month', created_at) ASC
    `);

    res.json((rows as any[]).map((r: any) => ({
      month: r.month,
      revenue: parseFloat(r.revenue),
      orders: parseInt(r.orders),
      averageOrderValue: parseInt(r.orders) > 0
        ? Math.round(parseFloat(r.revenue) / parseInt(r.orders))
        : 0,
      newCustomers: parseInt(r.new_customers),
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch monthly report" });
  }
});

// GET /admin/orders/by-category
router.get("/admin/orders/by-category", async (_req, res) => {
  try {
    const rows = await db
      .select({ items: adminOrdersTable.items, total: adminOrdersTable.total })
      .from(adminOrdersTable)
      .where(eq(adminOrdersTable.status, "completed"));

    const categories: Record<string, { revenue: number; orders: number }> = {
      "Restaurant": { revenue: 0, orders: 0 },
      "Bakery": { revenue: 0, orders: 0 },
      "Grill Spot": { revenue: 0, orders: 0 },
      "Supermarket": { revenue: 0, orders: 0 },
      "Lounge": { revenue: 0, orders: 0 },
    };

    const catKeywords: Record<string, string[]> = {
      "Restaurant": ["jollof", "fried rice", "egusi", "pepper", "beans", "moi moi", "coconut", "ogbono", "efo", "shawarma", "burger", "pizza", "small chops", "chapman", "smoothie", "drink"],
      "Bakery": ["bread", "meat pie", "chicken pie", "sausage", "muffin", "doughnut", "cake"],
      "Grill Spot": ["turkey", "asun", "suya", "grilled", "fish"],
      "Supermarket": ["rice", "pasta", "milo", "chivita", "pringles", "dettol", "oral-b", "frozen", "oil", "sardine"],
      "Lounge": ["vip", "shisha", "cocktail", "spirits", "lounge"],
    };

    for (const row of rows) {
      const itemsLower = row.items.toLowerCase();
      const amt = parseFloat(row.total);
      let matched = false;
      for (const [cat, keywords] of Object.entries(catKeywords)) {
        if (keywords.some(k => itemsLower.includes(k))) {
          categories[cat].revenue += amt;
          categories[cat].orders += 1;
          matched = true;
          break;
        }
      }
      if (!matched) {
        categories["Restaurant"].revenue += amt;
        categories["Restaurant"].orders += 1;
      }
    }

    const total = Object.values(categories).reduce((s, c) => s + c.revenue, 0);
    const result = Object.entries(categories)
      .filter(([, c]) => c.orders > 0)
      .map(([category, c]) => ({
        category,
        revenue: Math.round(c.revenue),
        orders: c.orders,
        percentage: total > 0 ? Math.round((c.revenue / total) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch category stats" });
  }
});

// GET /admin/orders/recent
router.get("/admin/orders/recent", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(adminOrdersTable)
      .orderBy(desc(adminOrdersTable.createdAt))
      .limit(10);
    res.json(rows.map(r => ({
      id: r.id,
      customerName: r.customerName,
      customerPhone: r.customerPhone,
      items: r.items,
      total: parseFloat(r.total),
      status: r.status,
      orderType: r.orderType,
      createdAt: r.createdAt.toISOString(),
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recent orders" });
  }
});

// PATCH /admin/orders/:id
router.patch("/admin/orders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "status required" });
    if (!(ALLOWED_ORDER_STATUSES as readonly string[]).includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${ALLOWED_ORDER_STATUSES.join(", ")}`,
      });
    }

    const [updated] = await db
      .update(adminOrdersTable)
      .set({ status: status as typeof ALLOWED_ORDER_STATUSES[number] })
      .where(eq(adminOrdersTable.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: "Order not found" });
    res.json({
      id: updated.id,
      customerName: updated.customerName,
      customerPhone: updated.customerPhone,
      items: updated.items,
      total: parseFloat(updated.total),
      status: updated.status,
      orderType: updated.orderType,
      createdAt: updated.createdAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update order" });
  }
});

// GET /admin/customers
router.get("/admin/customers", async (req, res) => {
  try {
    const { search, limit: limitRaw = "50", offset: offsetRaw = "0" } = req.query as Record<string, string>;

    const limitVal = parsePaginationParam(limitRaw);
    const offsetVal = parsePaginationParam(offsetRaw);
    if (limitVal === null || offsetVal === null) {
      return res.status(400).json({ error: "limit and offset must be non-negative integers" });
    }
    const limit = Math.min(limitVal, MAX_PAGE_LIMIT);
    const offset = offsetVal;

    const conditions = search
      ? [or(ilike(adminCustomersTable.name, `%${search}%`), ilike(adminCustomersTable.phone, `%${search}%`))]
      : [];

    const rows = await db
      .select()
      .from(adminCustomersTable)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(adminCustomersTable.totalOrders))
      .limit(limit)
      .offset(offset);

    res.json(rows.map(r => ({
      id: r.id,
      name: r.name,
      phone: r.phone,
      email: r.email,
      totalOrders: r.totalOrders,
      totalSpent: parseFloat(r.totalSpent),
      lastOrderDate: r.lastOrderDate?.toISOString() ?? new Date().toISOString(),
      status: r.status,
      joinedAt: r.joinedAt.toISOString(),
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

// GET /admin/customers/:id
router.get("/admin/customers/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [cust] = await db
      .select()
      .from(adminCustomersTable)
      .where(eq(adminCustomersTable.id, id));
    if (!cust) return res.status(404).json({ error: "Customer not found" });
    res.json({
      id: cust.id,
      name: cust.name,
      phone: cust.phone,
      email: cust.email,
      totalOrders: cust.totalOrders,
      totalSpent: parseFloat(cust.totalSpent),
      lastOrderDate: cust.lastOrderDate?.toISOString() ?? new Date().toISOString(),
      status: cust.status,
      joinedAt: cust.joinedAt.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch customer" });
  }
});

export default router;
