
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-6">
        <div className="mx-auto h-24 w-24 rounded-full bg-muted/30 flex items-center justify-center mb-6">
          <FileX className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-primary">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Sorry, we couldn't find the page you're looking for. It might have been removed or doesn't exist.
        </p>
        <Button asChild size="lg">
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
