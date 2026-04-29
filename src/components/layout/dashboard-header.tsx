import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  studentCount: number;
  onSignOut: () => void;
}

export function DashboardHeader({
  studentCount,
  onSignOut,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white/50 backdrop-blur-sm p-4 rounded-xl border-2 border-transparent transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center text-white rotate-3 hover:rotate-12 transition-transform">
          <img
            src="/k2-min.png"
            alt="Kumi assistant avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
            Dashboard
          </h1>
          <p className="text-xs md:text-sm font-medium text-muted-foreground">
            Managing {studentCount} students today
          </p>
        </div>
      </div>
      <Button
        variant="secondary"
        onClick={onSignOut}
        className="self-start md:self-auto"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </Button>
    </header>
  );
}
