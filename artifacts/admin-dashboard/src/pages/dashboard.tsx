import { useGetAdminStats, useGetRecentOrders, useGetMonthlyReport, useGetCategoryStats } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon,
  prefix = "",
  isLoading
}: { 
  title: string; 
  value?: number | string; 
  change?: number; 
  icon: any;
  prefix?: string;
  isLoading?: boolean;
}) {
  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ) : (
          <>
            <div className="text-3xl font-bold font-mono tracking-tight">
              {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            {change !== undefined && (
              <div className={`text-xs mt-1 font-medium flex items-center ${change >= 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-destructive'}`}>
                {change >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {Math.abs(change)}% from last month
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useGetAdminStats();
  const { data: recentOrders, isLoading: ordersLoading } = useGetRecentOrders();
  const { data: monthlyData, isLoading: monthlyLoading } = useGetMonthlyReport();
  const { data: categoryData, isLoading: categoryLoading } = useGetCategoryStats();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Today's Overview</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening at Evening Sun today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Revenue" 
          value={stats?.totalRevenue} 
          change={stats?.revenueChange}
          prefix="₦"
          icon={DollarSign}
          isLoading={statsLoading}
        />
        <StatCard 
          title="Orders" 
          value={stats?.totalOrders} 
          change={stats?.ordersChange}
          icon={ShoppingBag}
          isLoading={statsLoading}
        />
        <StatCard 
          title="Avg Order Value" 
          value={stats?.averageOrderValue} 
          prefix="₦"
          icon={TrendingUp}
          isLoading={statsLoading}
        />
        <StatCard 
          title="Active Customers" 
          value={stats?.totalCustomers} 
          change={stats?.customersChange}
          icon={Users}
          isLoading={statsLoading}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-border/50">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            {monthlyLoading ? (
              <Skeleton className="w-full h-[300px]" />
            ) : (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} 
                      tickFormatter={(value) => `₦${(value/1000)}k`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                      formatter={(value: number) => [`₦${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1 shadow-sm border-border/50 flex flex-col">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Sales distribution by category</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            {categoryLoading ? (
              <Skeleton className="w-full h-[250px]" />
            ) : (
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="category" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 13, fill: "hsl(var(--foreground))", fontWeight: 500 }} 
                    />
                    <Tooltip 
                      cursor={{ fill: "hsl(var(--muted)/0.4)" }}
                      contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                      formatter={(value: number) => [`₦${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Bar dataKey="revenue" radius={[0, 4, 4, 0]} barSize={24}>
                      {categoryData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-border/50">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders needing attention</CardDescription>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
              </div>
            ) : !recentOrders?.length ? (
              <div className="text-center py-8 text-muted-foreground">No recent orders.</div>
            ) : (
              <div className="space-y-4">
                {recentOrders.slice(0, 6).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-card hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        #{order.id.toString().padStart(3, '0')}
                      </div>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{order.items}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-mono font-medium">₦{order.total.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground capitalize">{order.orderType}</p>
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap min-w-[80px] text-center ${getStatusColor(order.status)}`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1 shadow-sm border-border/50">
          <CardHeader>
            <CardTitle>Top Items</CardTitle>
            <CardDescription>Best selling menu items</CardDescription>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : !stats?.topItems?.length ? (
              <div className="text-center py-8 text-muted-foreground">No data available.</div>
            ) : (
              <div className="space-y-5">
                {stats.topItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-muted-foreground w-4">{index + 1}.</span>
                      <div>
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.count} ordered</p>
                      </div>
                    </div>
                    <div className="text-sm font-mono font-medium">
                      ₦{item.revenue.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
