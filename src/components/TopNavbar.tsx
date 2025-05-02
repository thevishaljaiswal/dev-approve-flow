
import { Link, useLocation } from "react-router-dom";
import { FilePenLine, FileText, Home, FileUp, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";

const TopNavbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const links = [
    { path: "/", name: "Dashboard", icon: Home },
    { path: "/requests", name: "My Requests", icon: FileText },
    { path: "/new", name: "New Request", icon: FileUp },
    { path: "/approvals", name: "Approvals", icon: CheckSquare },
  ];

  return (
    <div className="bg-background border-b px-4 py-2 flex items-center">
      <Link to="/" className="flex items-center gap-2 font-semibold mr-8">
        <span className="text-xl bg-primary text-primary-foreground p-1 rounded flex items-center justify-center">
          <FilePenLine size={20} />
        </span>
        <span>Dev Requests</span>
      </Link>
      
      {isMobile ? (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-2 p-4">
                  {links.map((link) => (
                    <li key={link.path}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.path}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-md hover:bg-accent",
                            location.pathname === link.path && "bg-primary text-primary-foreground"
                          )}
                        >
                          <link.icon className="h-4 w-4" />
                          <span>{link.name}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <nav className="flex items-center space-x-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "h-9",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4 mr-2" />
                  <span>{link.name}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default TopNavbar;
