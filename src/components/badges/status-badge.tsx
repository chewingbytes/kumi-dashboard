import { CheckCircle2, LogOut } from "lucide-react";

export function StatusBadge({ status }: { status: string }) {
  if (status === "checked_in") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-quaternary px-3 py-1 text-xs font-bold text-foreground shadow-hard-sm">
        <CheckCircle2 className="h-3 w-3" />
        Checked In
      </span>
    );
  }
  if (status === "checked_out") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-muted px-3 py-1 text-xs font-bold text-foreground shadow-hard-sm">
        <LogOut className="h-3 w-3" />
        Checked Out
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-slate-200 px-3 py-1 text-xs font-bold text-foreground shadow-hard-sm">
      {status}
    </span>
  );
}
