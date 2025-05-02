
import { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar as UISidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ArrowRight, Book, FileCheck, Home, Layout, Plus, Settings, Users } from "lucide-react";

const Sidebar = () => {
  const [activeRoute, setActiveRoute] = useState("/");

  const routes = [
    {
      path: "/",
      label: "Dashboard",
      icon: Home,
    },
    {
      path: "/requests",
      label: "My Requests",
      icon: FileCheck,
    },
    {
      path: "/approvals",
      label: "Pending Approvals",
      icon: ArrowRight,
    },
    {
      path: "/new",
      label: "New Request",
      icon: Plus,
    },
    {
      path: "/teams",
      label: "Teams",
      icon: Users,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <UISidebar>
      <div className="flex h-14 items-center justify-center border-b border-sidebar-border bg-primary">
        <h1 className="text-xl font-bold tracking-tight text-white px-4">DevFlow</h1>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.path}>
                  <SidebarMenuButton asChild className={`${activeRoute === route.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}>
                    <Link 
                      to={route.path} 
                      onClick={() => setActiveRoute(route.path)}
                      className="flex items-center gap-3"
                    >
                      <route.icon className="h-4 w-4" />
                      <span>{route.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </UISidebar>
  );
};

export default Sidebar;
