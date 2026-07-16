import { useState } from "react";
import { useListCustomers, useGetCustomer, getGetCustomerQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Search, Mail, Phone, Calendar, ShoppingBag, CreditCard, UserCircle2 } from "lucide-react";
import { format } from "date-fns";

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  
  const queryParams = searchQuery ? { search: searchQuery } : undefined;
  const { data: customers, isLoading: customersLoading } = useListCustomers(queryParams);
  
  const { data: customerDetails, isLoading: detailsLoading } = useGetCustomer(
    selectedCustomerId as number, 
    { query: { enabled: !!selectedCustomerId, queryKey: getGetCustomerQueryKey(selectedCustomerId as number) } }
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const formatDate = (isoString: string) => {
    try {
      return format(new Date(isoString), "MMM d, yyyy");
    } catch {
      return isoString;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Directory</h1>
          <p className="text-muted-foreground mt-1">View and manage your customer relationships.</p>
        </div>
      </div>

      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search customers by name, email or phone..." 
                className="pl-9 h-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium text-right">Orders</th>
                  <th className="px-6 py-4 font-medium text-right">Total Spent</th>
                  <th className="px-6 py-4 font-medium">Last Order</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {customersLoading ? (
                  [...Array(6)].map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-32 mb-1" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-6 py-4 text-right"><Skeleton className="h-4 w-8 ml-auto" /></td>
                      <td className="px-6 py-4 text-right"><Skeleton className="h-4 w-16 ml-auto" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-6 w-16 rounded-full" /></td>
                      <td className="px-6 py-4 text-right"><Skeleton className="h-8 w-20 ml-auto" /></td>
                    </tr>
                  ))
                ) : customers?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center">
                        <UserCircle2 className="h-10 w-10 mb-3 opacity-20" />
                        <p>No customers found matching "{searchQuery}".</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  customers?.map((customer) => (
                    <tr key={customer.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {customer.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{customer.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">Joined {formatDate(customer.joinedAt)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-foreground">{customer.phone}</div>
                        {customer.email && <div className="text-xs text-muted-foreground mt-0.5">{customer.email}</div>}
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        {customer.totalOrders}
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-medium">
                        ₦{customer.totalSpent.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {formatDate(customer.lastOrderDate)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full border ${getStatusColor(customer.status)}`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => setSelectedCustomerId(customer.id)}
                        >
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{customers?.length || 0}</span> customers
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Sheet open={!!selectedCustomerId} onOpenChange={(open) => !open && setSelectedCustomerId(null)}>
        <SheetContent className="sm:max-w-md w-full overflow-y-auto border-l border-border bg-card">
          {detailsLoading ? (
            <div className="space-y-6 mt-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-32 w-full rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          ) : customerDetails ? (
            <div className="space-y-8 mt-4 pb-10">
              <SheetHeader className="text-left space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                    {customerDetails.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <SheetTitle className="text-2xl">{customerDetails.name}</SheetTitle>
                    <span className={`inline-flex px-2 py-0.5 mt-1 text-[10px] font-semibold uppercase tracking-wider rounded-full border ${getStatusColor(customerDetails.status)}`}>
                      {customerDetails.status}
                    </span>
                  </div>
                </div>
                <SheetDescription className="text-sm">
                  Customer since {formatDate(customerDetails.joinedAt)}
                </SheetDescription>
              </SheetHeader>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/40 p-4 rounded-xl border border-border/50">
                  <div className="flex items-center text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wider">
                    <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                    Total Orders
                  </div>
                  <div className="text-2xl font-bold">{customerDetails.totalOrders}</div>
                </div>
                <div className="bg-muted/40 p-4 rounded-xl border border-border/50">
                  <div className="flex items-center text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wider">
                    <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                    Total Spent
                  </div>
                  <div className="text-xl font-mono font-bold text-primary">₦{customerDetails.totalSpent.toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact Info</h3>
                <div className="space-y-3 bg-muted/20 p-4 rounded-xl border border-border/50">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{customerDetails.phone}</span>
                  </div>
                  {customerDetails.email && (
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{customerDetails.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Last order: <span className="font-medium text-foreground">{formatDate(customerDetails.lastOrderDate)}</span></span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recent Activity</h3>
                <div className="text-center py-8 text-sm text-muted-foreground bg-muted/10 rounded-xl border border-dashed border-border">
                  Order history list would appear here.
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 text-center text-muted-foreground">Customer details not found.</div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
