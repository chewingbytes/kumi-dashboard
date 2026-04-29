import type { AttendanceRecord } from "@/types/attendance";
import { formatDateTime } from "@/lib/format";
import { StatusBadge } from "@/components/badges/status-badge";

interface HistoryTableProps {
  records: AttendanceRecord[];
  selectedDate: string | null;
}

export function HistoryTable({ records, selectedDate }: HistoryTableProps) {
  const renderMessageEvents = (row: AttendanceRecord) => {
    const items: { label: string; value: string }[] = [];

    const toTime = (value?: string | null) => {
      if (!value) return null;
      const formatted = formatDateTime(value).split(", ");
      return formatted[1] ?? formatted[0];
    };

    const sent = toTime(row.message_sent_timestamp);
    const read = toTime(row.message_read_timestamp);
    const failed = toTime(row.message_failed_timestamp);

    if (sent) items.push({ label: "Sent", value: sent });
    if (read) items.push({ label: "Read", value: read });
    if (failed) items.push({ label: "Failed", value: failed });

    if (!items.length) return <span className="text-xs text-slate-400">—</span>;

    return (
      <div className="flex flex-col gap-1 text-xs text-slate-600">
        {items.map((entry) => (
          <div key={entry.label} className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">{entry.label}:</span>
            <span className="font-mono">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-xl border-2 border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr className="border-b-2 border-slate-100">
              <th className="px-4 py-3 font-heading font-bold text-slate-800">Student</th>
              <th className="px-4 py-3 font-heading font-bold text-slate-800">Status</th>
              <th className="px-4 py-3 font-heading font-bold text-slate-800">Notified</th>
              <th className="px-4 py-3 font-heading font-bold text-slate-800">Message Events</th>
              <th className="px-4 py-3 font-heading font-bold text-slate-800">Duration</th>
              <th className="px-4 py-3 font-heading font-bold text-slate-800 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-3 font-bold text-foreground">{row.student_name}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="text-xs font-bold text-slate-600">
                    {row.parent_notified ? row.parent_notified.toUpperCase() : "NO"}
                  </div>
                </td>
                <td className="px-4 py-3">{renderMessageEvents(row)}</td>
                <td className="px-4 py-3 font-mono text-slate-600 text-xs">
                  {typeof row.time_spent === "number" || !isNaN(Number(row.time_spent))
                    ? `${row.time_spent}m`
                    : row.time_spent || "-"}
                </td>
                <td className="px-4 py-3 text-right text-xs font-medium text-slate-500">
                  <div>{formatDateTime(row.checkin_time).split(", ")[1]}</div>
                </td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground font-medium">
                  {selectedDate
                    ? "No records found for this date."
                    : "Select a date from the list to view records."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
