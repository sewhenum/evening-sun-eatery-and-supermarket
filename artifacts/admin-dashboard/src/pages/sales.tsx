import { useState } from "react";
import { useListOrders, useUpdateOrder } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal, MoreHorizontal } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListOrdersQueryKey } from "@workspace/api-client-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export default function Sales() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Create an object to hold our filter parameters.
  // The API uses `status` param, but we might also map `search` to it if we want, or handle search locally.
  const queryParams = activeTab === "all" ? undefined : { status: activeTab };
  
  const { data: orders, isLoading } = useListOrders(queryParams);
  const updateOrder = useUpdateOrder();
  const queryClient = useQueryClient();

  const handleStatusUpdate = (orderId: number, newStatus: string) => {
    updateOrder.mutate({ id: orderId, data: { status: newStatus } }, {
      onSuccess: (updatedOrder) => {
        // Optimistically update the list cache without refetching entirely
        queryClient.setQueryData(getListOrdersQueryKey(queryParams), (old: any) => {
          if (!old) return old;
          return old.map((order: any) => order.id === updatedOrder.id ? updatedOrder : order);
        });
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const filteredOrders = orders?.filter(order => 
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    order.id.toString().includes(searchQuery) ||
    order.customerPhone.includes(searchQuery)
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales & Orders</h1>
          <p className="text-muted-foreground mt-1">Manage all your incoming and past orders.</p>
        </div>
      </div>

      <Card className="shadow-sm border-border/50">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader className="pb-4 border-b border-border/50">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <TabsList className="h-10">
                <TabsTrigger value="all" className="px-4">All Orders</TabsTrigger>
                <TabsTrigger value="pending" className="px-4">Pending</TabsTrigger>
                <TabsTrigger value="confirmed" className="px-4">Confirmed</TabsTrigger>
                <TabsTrigger value="completed" className="px-4">Completed</TabsTrigger>
                <TabsTrigger value="cancelled" className="px-4">Cancelled</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name, ID or phone..." 
                    className="pl-9 h-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-medium">Order ID</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Items</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Total</th>
                    <th className="px-6 py-4 font-medium text-center">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {isLoading ? (
                    [...Array(6)].map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4"><Skeleton className="h-4 w-12" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-4 w-48" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-6 w-24 mx-auto rounded-full" /></td>
                        <td className="px-6 py-4 text-right"><Skeleton className="h-8 w-8 ml-auto" /></td>
                      </tr>
                    ))
                  ) : filteredOrders?.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                        <div className="flex flex-col items-center justify-center">
                          <Search className="h-10 w-10 mb-3 opacity-20" />
                          <p>No orders found matching your criteria.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders?.map((order) => (
                      <tr key={order.id} className="hover:bg-muted/20 transition-colors group">
                        <td className="px-6 py-4 font-medium whitespace-nowrap">
                          #{order.id.toString().padStart(4, '0')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{order.customerPhone}</div>
                        </td>
                        <td className="px-6 py-4 max-w-[250px] truncate text-muted-foreground" title={order.items}>
                          {order.items}
                        </td>
                        <td className="px-6 py-4 capitalize">
                          <span className="inline-flex items-center gap-1.5">
                            {order.orderType === 'delivery' ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            )}
                            {order.orderType}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono font-medium">
                          ₦{order.total.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <span className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full border ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                                <DropdownMenuItem 
                                  key={status}
                                  className="capitalize cursor-pointer"
                                  disabled={order.status === status}
                                  onClick={() => handleStatusUpdate(order.id, status)}
                                >
                                  Mark as {status}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination placeholder */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredOrders?.length || 0}</span> orders
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
