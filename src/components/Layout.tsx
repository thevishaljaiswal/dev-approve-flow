
import { useToast } from "@/hooks/use-toast";
import Header from "./Header";
import TopNavbar from "./TopNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <TopNavbar />
      <main className="flex-1 p-4 md:p-6 bg-background">
        {children}
      </main>
    </div>
  );
};

export default Layout;
