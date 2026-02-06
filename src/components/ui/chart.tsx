"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  type TooltipProps,
} from "recharts";

import { cn } from "@/lib/utils";

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    color?: string;
  }
>;

const ChartContext = React.createContext<ChartConfig | null>(null);

export function ChartContainer({
  config,
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement> & { config: ChartConfig }) {
  return (
    <ChartContext.Provider value={config}>
      <div
        className={cn("h-[300px] w-full", className)}
        style={Object.keys(config).reduce((acc, key) => {
          const color = config[key]?.color;
          if (color) acc[`--color-${key}`] = color;
          return acc;
        }, {} as Record<string, string>) as React.CSSProperties}
      >
        <ResponsiveContainer>{children as React.ReactElement}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export function ChartTooltip({
  className,
  ...props
}: TooltipProps<number, string> & { className?: string }) {
  const config = React.useContext(ChartContext);
  return (
    <RechartsTooltip
      {...props}
      content={({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
          <div
            className={cn(
              "rounded-md border border-slate-200 bg-white p-2 text-xs shadow-sm",
              className
            )}
          >
            <div className="font-medium text-slate-700">{label}</div>
            <div className="mt-1 space-y-1">
              {payload.map((item) => {
                const key = item.dataKey as string;
                const labelText = config?.[key]?.label ?? key;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-600">{labelText}:</span>
                    <span className="font-medium text-slate-900">
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    />
  );
}
