import { Bell, Filter, Search } from "lucide-react";

interface CurrentFiltersProps {
  search: string;
  status: string;
  notified: string;
  onSearch: (value: string) => void;
  onStatus: (value: string) => void;
  onNotified: (value: string) => void;
}

export function CurrentFilters({
  search,
  status,
  notified,
  onSearch,
  onStatus,
  onNotified,
}: CurrentFiltersProps) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          className="w-full rounded-full border-2 border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm font-medium outline-none focus:border-accent focus:bg-white transition-all placeholder:text-slate-400"
          placeholder="Search student..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="relative">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <select
          className="w-full appearance-none rounded-full border-2 border-slate-200 bg-slate-50 pl-10 pr-8 py-2 text-sm font-medium outline-none focus:border-accent focus:bg-white transition-all cursor-pointer"
          value={status}
          onChange={(e) => onStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="checked_in">Checked In</option>
          <option value="checked_out">Checked Out</option>
        </select>
      </div>

      <div className="relative">
        <Bell className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <select
          className="w-full appearance-none rounded-full border-2 border-slate-200 bg-slate-50 pl-10 pr-8 py-2 text-sm font-medium outline-none focus:border-accent focus:bg-white transition-all cursor-pointer"
          value={notified}
          onChange={(e) => onNotified(e.target.value)}
        >
          <option value="all">All Notifications</option>
          <option value="yes">Notified</option>
          <option value="no">Pending</option>
        </select>
      </div>
    </div>
  );
}
