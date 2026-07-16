import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Receipt, BarChart3, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Sales & Orders", path: "/sales", icon: Receipt },
  { title: "Reports", path: "/reports", icon: BarChart3 },
  { title: "Customers", path: "/users", icon: Users },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem("es_admin_auth");
    setLocation("/");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-[100dvh] w-full bg-background">
        <Sidebar className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
          <SidebarHeader className="p-4 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 w-full">
              <img 
                src={new URL('@assets/file_00000000997471f4a6e796bb7e2cb183_1784205788721.png', import.meta.url).href} 
                alt="Evening Sun Logo" 
                className="w-16 h-16 object-contain"
              />
              <div className="text-center">
                <h2 className="text-sm font-semibold tracking-tight">Evening Sun</h2>
                <p className="text-xs text-sidebar-foreground/60 uppercase tracking-wider">Operations</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3 py-6">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => {
                    const isActive = location === item.path || location.startsWith(item.path + '/');
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                          <Link href={item.path} className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
