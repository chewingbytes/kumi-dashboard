import { AlertCircle, Bell, BellOff } from "lucide-react";

export function NotificationBadge({
  status,
  reason,
}: {
  status: string | null;
  reason?: string | null;
}) {
  const s = (status || "").toUpperCase();
  if (["SENT", "DELIVERED", "READ", "PLAYED"].includes(s)) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-secondary px-3 py-1 text-xs font-bold text-foreground shadow-hard-sm">
        <Bell className="h-3 w-3" />
        Notified
      </span>
    );
  }
  if (["FAILED", "UNDELIVERED"].includes(s) || reason) {
    return (
      <div className="group relative inline-flex">
        <span className="cursor-help inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-red-400 px-3 py-1 text-xs font-bold text-foreground shadow-hard-sm">
          <AlertCircle className="h-3 w-3" />
          Failed
        </span>
        {reason && (
          <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 rounded-lg border-2 border-foreground bg-white p-2 text-xs font-medium shadow-hard-md opacity-0 transition-opacity group-hover:opacity-100">
            {reason}
          </div>
        )}
      </div>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-slate-100 px-3 py-1 text-xs font-bold text-muted-foreground">
      <BellOff className="h-3 w-3" />
      Not Sent
    </span>
  );
}
