import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AttendanceRecord = {
  id: number;
  student_id: number;
  student_name: string;
  status: string;
  parent_notified: boolean;
  checkin_time: string | null;
  checkout_time: string | null;
  time_spent: string | number | null;
  date: string | null;
};

type AttendanceDate = {
  id: number;
  date: string;
  created_at: string;
};

const API_BASE = import.meta.env.VITE_API_BASE as string;

function parseMinutes(value: string | number | null): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  const str = String(value).toLowerCase();
  if (str.includes("h")) {
    const match = str.match(/(\d+)h\s*(\d+)?m?/);
    if (!match) return 0;
    const h = Number(match[1] || 0);
    const m = Number(match[2] || 0);
    return h * 60 + m;
  }
  const num = Number(str.replace(/[^0-9]/g, ""));
  return Number.isNaN(num) ? 0 : num;
}

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dates, setDates] = useState<AttendanceDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentRecords, setCurrentRecords] = useState<AttendanceRecord[]>([]);
  const [historyRecords, setHistoryRecords] = useState<AttendanceRecord[]>([]);

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

  const statusChartData = useMemo(() => {
    const source = selectedDate ? historyRecords : currentRecords;
    const counts = source.reduce(
      (acc, row) => {
        if (row.status === "checked_in") acc.checkedIn += 1;
        if (row.status === "checked_out") acc.checkedOut += 1;
        if (row.parent_notified) acc.notified += 1;
        return acc;
      },
      { checkedIn: 0, checkedOut: 0, notified: 0 }
    );
    return [
      { name: "Checked In", value: counts.checkedIn },
      { name: "Checked Out", value: counts.checkedOut },
      { name: "Notified", value: counts.notified },
    ];
  }, [currentRecords, historyRecords, selectedDate]);

  const timeChartData = useMemo(() => {
    const source = selectedDate ? historyRecords : currentRecords;
    return source.map((row) => ({
      name: row.student_name,
      minutes: parseMinutes(row.time_spent),
    }));
  }, [currentRecords, historyRecords, selectedDate]);

  const handleSignIn = async (event: FormEvent) => {
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

  if (!sessionToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Kumon Attendance Dashboard</CardTitle>
            <CardDescription>Sign in to view attendance data.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSignIn}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Attendance Dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Track today&apos;s check-ins and historical attendance by date.
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4 text-sm text-red-700">
              {error}
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="current">
          <TabsList>
            <TabsTrigger value="current" onClick={() => setSelectedDate(null)}>
              Current Day
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Today&apos;s Records</CardTitle>
                  <CardDescription>
                    Latest check-ins from students_checkin.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[420px] overflow-auto rounded-md border border-slate-200">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100 text-left text-slate-600">
                        <tr>
                          <th className="px-3 py-2">Student</th>
                          <th className="px-3 py-2">Status</th>
                          <th className="px-3 py-2">Notified</th>
                          <th className="px-3 py-2">Time Spent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRecords.map((row) => (
                          <tr key={row.id} className="border-t">
                            <td className="px-3 py-2 font-medium text-slate-800">
                              {row.student_name}
                            </td>
                            <td className="px-3 py-2 text-slate-600">
                              {row.status}
                            </td>
                            <td className="px-3 py-2 text-slate-600">
                              {row.parent_notified ? "Yes" : "No"}
                            </td>
                            <td className="px-3 py-2 text-slate-600">
                              {row.time_spent ?? "-"}
                            </td>
                          </tr>
                        ))}
                        {currentRecords.length === 0 && (
                          <tr>
                            <td
                              className="px-3 py-6 text-center text-slate-500"
                              colSpan={4}
                            >
                              No current records.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Status Overview</CardTitle>
                    <CardDescription>Checked in/out and notified.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        value: { label: "Count", color: "#2563eb" },
                      }}
                    >
                      <BarChart data={statusChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <ChartTooltip />
                        <Bar dataKey="value" fill="var(--color-value)" />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Time Spent (mins)</CardTitle>
                    <CardDescription>Per student today.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        minutes: { label: "Minutes", color: "#10b981" },
                      }}
                    >
                      <LineChart data={timeChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" hide />
                        <YAxis />
                        <ChartTooltip />
                        <Line
                          type="monotone"
                          dataKey="minutes"
                          stroke="var(--color-minutes)"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Archived Dates</CardTitle>
                  <CardDescription>Select a date to view.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    {dates.map((item) => (
                      <Button
                        key={item.id}
                        variant={selectedDate === item.date ? "default" : "outline"}
                        onClick={() => setSelectedDate(item.date)}
                      >
                        {item.date}
                      </Button>
                    ))}
                    {dates.length === 0 && (
                      <p className="text-sm text-slate-500">
                        No archived days yet.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Archived Records</CardTitle>
                  <CardDescription>
                    {selectedDate
                      ? `Records for ${selectedDate}.`
                      : "Select a date to view records."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[420px] overflow-auto rounded-md border border-slate-200">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100 text-left text-slate-600">
                        <tr>
                          <th className="px-3 py-2">Student</th>
                          <th className="px-3 py-2">Status</th>
                          <th className="px-3 py-2">Notified</th>
                          <th className="px-3 py-2">Time Spent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyRecords.map((row) => (
                          <tr key={row.id} className="border-t">
                            <td className="px-3 py-2 font-medium text-slate-800">
                              {row.student_name}
                            </td>
                            <td className="px-3 py-2 text-slate-600">
                              {row.status}
                            </td>
                            <td className="px-3 py-2 text-slate-600">
                              {row.parent_notified ? "Yes" : "No"}
                            </td>
                            <td className="px-3 py-2 text-slate-600">
                              {row.time_spent ?? "-"}
                            </td>
                          </tr>
                        ))}
                        {historyRecords.length === 0 && (
                          <tr>
                            <td
                              className="px-3 py-6 text-center text-slate-500"
                              colSpan={4}
                            >
                              {selectedDate
                                ? "No records for this date."
                                : "Select a date to view records."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Status Overview</CardTitle>
                  <CardDescription>Checked in/out and notified.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: { label: "Count", color: "#2563eb" },
                    }}
                  >
                    <BarChart data={statusChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <ChartTooltip />
                      <Bar dataKey="value" fill="var(--color-value)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Spent (mins)</CardTitle>
                  <CardDescription>Per student for this date.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      minutes: { label: "Minutes", color: "#10b981" },
                    }}
                  >
                    <LineChart data={timeChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" hide />
                      <YAxis />
                      <ChartTooltip />
                      <Line
                        type="monotone"
                        dataKey="minutes"
                        stroke="var(--color-minutes)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {loading && (
        <div className="fixed bottom-6 right-6 rounded-md bg-slate-900 px-4 py-2 text-sm text-white shadow">
          Loading...
        </div>
      )}
    </div>
  );
}
