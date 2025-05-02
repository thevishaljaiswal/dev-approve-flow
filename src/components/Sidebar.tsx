
import { Link, useLocation } from "react-router-dom";
import { FilePenLine, FileText, Home, FileUp, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const links = [
    { path: "/", name: "Dashboard", icon: Home },
    { path: "/requests", name: "My Requests", icon: FileText },
    { path: "/new", name: "New Request", icon: FileUp },
    { path: "/approvals", name: "Approvals", icon: CheckSquare },
  ];

  return (
    <SidebarComponent>
      <SidebarHeader>
        <div className="flex h-[60px] items-center px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl bg-primary text-primary-foreground p-1 rounded flex items-center justify-center">
              <FilePenLine size={20} />
            </span>
            <span>Dev Requests</span>
          </Link>
        </div>
        <div className="p-2">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="p-2">
          <SidebarMenu>
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <SidebarMenuItem key={link.path}>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link to={link.path}>
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            className={cn(
                              "h-auto w-full justify-start px-2 py-3",
                              isActive && "bg-primary text-primary-foreground"
                            )}
                          >
                            <link.icon className="h-5 w-5" />
                            <span className="ml-2">{link.name}</span>
                          </Button>
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-4">
                      {link.name}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter>
        {!isMobile && (
          <div className="p-2">
            <p className="text-xs text-muted-foreground px-2">
              &copy; {new Date().getFullYear()} Dev Requests
            </p>
          </div>
        )}
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
