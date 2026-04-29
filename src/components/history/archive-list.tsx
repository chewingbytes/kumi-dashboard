import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AttendanceDate } from "@/types/attendance";
import { cn } from "@/lib/utils";

interface ArchiveListProps {
  dates: AttendanceDate[];
  selectedDate: string | null;
  onSelect: (date: string) => void;
}

export function ArchiveList({ dates, selectedDate, onSelect }: ArchiveListProps) {
  return (
    <div className="flex flex-col gap-3">
      {dates.map((item) => (
        <Button
          key={item.id}
          variant={selectedDate === item.date ? "default" : "outline"}
          onClick={() => onSelect(item.date)}
          className={cn("w-full justify-start text-left font-bold", selectedDate === item.date ? "shadow-hard-sm" : "")}
        >
          <Calendar className="mr-2 h-4 w-4" /> {item.date}
        </Button>
      ))}
      {dates.length === 0 && (
        <div className="p-8 text-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-500 font-medium">No archived days yet.</p>
        </div>
      )}
    </div>
  );
}
