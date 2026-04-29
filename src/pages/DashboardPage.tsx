import { useEffect, useMemo, useState, type FormEventHandler } from "react";
import { Download } from "lucide-react";

import { ArchiveList } from "@/components/history/archive-list";
import { LoginCard } from "@/components/auth/login-card";
import { DailyStatsCard } from "@/components/charts/daily-stats-card";
import { TimeDistributionCard } from "@/components/charts/time-distribution-card";
import { CurrentFilters } from "@/components/filters/current-filters";
import { CurrentTable } from "@/components/tables/current-table";
import { HistoryTable } from "@/components/tables/history-table";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDateTime, parseMinutes } from "@/lib/format";
import { supabase } from "@/lib/supabase";
import type { AttendanceDate, AttendanceRecord } from "@/types/attendance";
import { AskAI } from "@/components/chat/ask-ai";

const API_BASE = import.meta.env.VITE_API_BASE as string;

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dates, setDates] = useState<AttendanceDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentRecords, setCurrentRecords] = useState<AttendanceRecord[]>([]);
  const [historyRecords, setHistoryRecords] = useState<AttendanceRecord[]>([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentStatusFilter, setCurrentStatusFilter] = useState("all");
  const [currentNotifiedFilter, setCurrentNotifiedFilter] = useState("all");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSessionToken(data.session?.access_token ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionToken(session?.access_token ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchWithAuth = async (path: string) => {
    if (!sessionToken) throw new Error("Missing session token");
    const res = await fetch(`${API_BASE}${path}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    if (!res.ok || json?.error) {
      throw new Error(json?.error || "Request failed");
    }
    return json;
  };

  const loadCurrent = async () => {
    const json = await fetchWithAuth("/api/db/records/current");
    setCurrentRecords(json.records || []);
  };

  const loadDates = async () => {
    const json = await fetchWithAuth("/api/db/records/dates");
    setDates(json.dates || []);
  };

  const loadByDate = async (date: string) => {
    const json = await fetchWithAuth(`/api/db/records/by-date?date=${date}`);
    setHistoryRecords(json.records || []);
  };

  useEffect(() => {
    if (!sessionToken) return;
    setLoading(true);
    setError(null);
    Promise.all([loadCurrent(), loadDates()])
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [sessionToken]);

  useEffect(() => {
    if (!sessionToken || !selectedDate) return;
    setLoading(true);
    setError(null);
    loadByDate(selectedDate)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedDate, sessionToken]);

  const filteredCurrentRecords = useMemo(() => {
    return currentRecords.filter((row) => {
      const matchesSearch = row.student_name
        .toLowerCase()
        .includes(currentSearch.toLowerCase());
      const matchesStatus =
        currentStatusFilter === "all" || row.status === currentStatusFilter;
      const notifiedStatus = (row.parent_notified || "")
        .toString()
        .toUpperCase();
      const isNotified = ["SENT", "DELIVERED", "READ", "PLAYED"].includes(
        notifiedStatus
      );
      const matchesNotified =
        currentNotifiedFilter === "all" ||
        (currentNotifiedFilter === "yes" && isNotified) ||
        (currentNotifiedFilter === "no" && !isNotified);
      return matchesSearch && matchesStatus && matchesNotified;
    });
  }, [currentRecords, currentSearch, currentStatusFilter, currentNotifiedFilter]);

  const statusChartData = useMemo(() => {
    const source = selectedDate ? historyRecords : filteredCurrentRecords;
    const counts = source.reduce(
      (acc, row) => {
        if (row.status === "checked_in") acc.checkedIn += 1;
        if (row.status === "checked_out") acc.checkedOut += 1;
        const notifiedStatus = (row.parent_notified || "")
          .toString()
          .toUpperCase();
        if (["SENT", "DELIVERED", "READ", "PLAYED"].includes(notifiedStatus)) {
          acc.notified += 1;
        }
        return acc;
      },
      { checkedIn: 0, checkedOut: 0, notified: 0 }
    );
    return [
      { name: "Checked In", value: counts.checkedIn, fill: "#34D399" },
      { name: "Checked Out", value: counts.checkedOut, fill: "#F1F5F9" },
      { name: "Notified", value: counts.notified, fill: "#F472B6" },
    ];
  }, [filteredCurrentRecords, historyRecords, selectedDate]);

  const timeChartData = useMemo(() => {
    const source = selectedDate ? historyRecords : filteredCurrentRecords;
    const buckets = [
      { label: "0-15", min: 0, max: 15 },
      { label: "16-30", min: 16, max: 30 },
      { label: "31-45", min: 31, max: 45 },
      { label: "46-60", min: 46, max: 60 },
      { label: "60+", min: 61, max: Infinity },
    ];

    const counts = buckets.map((b) => ({ name: b.label, value: 0 }));

    source.forEach((row) => {
      const minutes = parseMinutes(row.time_spent);
      const idx = buckets.findIndex(
        (b) => minutes >= b.min && minutes <= b.max
      );
      if (idx >= 0) counts[idx].value += 1;
    });

    return counts;
  }, [filteredCurrentRecords, historyRecords, selectedDate]);

  const handleSignIn: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSelectedDate(null);
    setCurrentRecords([]);
    setHistoryRecords([]);
  };

  const downloadHistoryCsv = () => {
    if (!selectedDate || historyRecords.length === 0) return;

    const headers = [
      "student_name",
      "status",
      "parent_notified",
      "failed_reason",
      "time_spent",
      "checkin_time",
      "checkout_time",
      "date",
    ];

    const rows = historyRecords.map((row) => [
      row.student_name,
      row.status,
      row.parent_notified ?? "",
      row.failed_reason ?? "",
      row.time_spent ?? "",
      formatDateTime(row.checkin_time),
      formatDateTime(row.checkout_time),
      row.date ?? "",
    ]);

    const csv = [headers, ...rows]
      .map((line) =>
        line
          .map((value) => {
            const text = String(value).replace(/"/g, '""');
            return `"${text}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `attendance_${selectedDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!sessionToken) {
    return (
      <LoginCard
        email={email}
        password={password}
        error={error}
        loading={loading}
        onEmail={setEmail}
        onPassword={setPassword}
        onSubmit={handleSignIn}
      />
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-x-hidden">
      <div className="absolute top-0 right-0 -z-10 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-tertiary opacity-30 blur-3xl" />

      <div className="mx-auto flex max-w-9xl flex-col gap-6 md:gap-8">
        <DashboardHeader studentCount={currentRecords.length} onSignOut={handleSignOut} />

        {error && (
          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 text-red-700 flex items-center gap-3 shadow-hard-sm">
            <span className="font-bold">{error}</span>
          </div>
        )}

        <Tabs defaultValue="current" className="space-y-6 md:space-y-8">
          <div className="flex justify-center w-full">
            <TabsList className="w-full max-w-md grid grid-cols-2">
              <TabsTrigger value="current" onClick={() => setSelectedDate(null)}>
                Current Day
              </TabsTrigger>
              <TabsTrigger value="history">History Archive</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="current" className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[1.5fr_1fr]">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">Today's Check-ins</CardTitle>
                  <CardDescription>Live view of student attendance.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <CurrentFilters
                    search={currentSearch}
                    status={currentStatusFilter}
                    notified={currentNotifiedFilter}
                    onSearch={setCurrentSearch}
                    onStatus={setCurrentStatusFilter}
                    onNotified={setCurrentNotifiedFilter}
                  />
                  <CurrentTable records={filteredCurrentRecords} />
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-6 md:gap-8">
                <DailyStatsCard loading={loading} data={statusChartData} />
                <TimeDistributionCard loading={loading} data={timeChartData} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[1fr_2fr]">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">Archive</CardTitle>
                  <CardDescription>Select a past date to review.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <ArchiveList dates={dates} selectedDate={selectedDate} onSelect={setSelectedDate} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>{selectedDate ? `Records: ${selectedDate}` : "Select a Date"}</CardTitle>
                    <CardDescription>Review attendance history.</CardDescription>
                  </div>
                  {selectedDate && historyRecords.length > 0 && (
                    <Button variant="outline" size="sm" onClick={downloadHistoryCsv} className="gap-2 w-full md:w-auto">
                      <Download className="h-4 w-4" /> CSV
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <HistoryTable records={historyRecords} selectedDate={selectedDate} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AskAI />
    </div>
  );
}
