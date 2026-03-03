import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Shield, Bell, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const showBack = location.pathname !== "/dashboard";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border/50 px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              {showBack && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                  title="Voltar"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-gradient-primary">Método CHOA 2026</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              </button>
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                U
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
