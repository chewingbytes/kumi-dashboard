import { Loader2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimeDistributionCardProps {
  loading: boolean;
  data: { name: string; value: number }[];
}

export function TimeDistributionCard({ loading, data }: TimeDistributionCardProps) {
  return (
    <Card className="bg-tertiary/10 border-tertiary">
      <CardHeader>
        <CardTitle className="text-xl">Time Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[200px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fontWeight: 600, fill: "#64748B" }}
                  dy={10}
                />
                <Tooltip
                  cursor={{ fill: "#f1f5f9" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "2px solid #1E293B",
                    boxShadow: "4px 4px 0px #1E293B",
                  }}
                />
                <Bar dataKey="value" fill="#8B5CF6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
