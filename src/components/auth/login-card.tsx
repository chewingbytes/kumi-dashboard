import { AlertCircle, Loader2, User } from "lucide-react";
import type { FormEventHandler } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LoginCardProps {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
  onEmail: (value: string) => void;
  onPassword: (value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function LoginCard({ email, password, error, loading, onEmail, onPassword, onSubmit }: LoginCardProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-6 bg-background overflow-hidden">
      <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-tertiary opacity-80" />
      <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-secondary opacity-60" />
      <div className="absolute top-1/2 right-20 h-16 w-16 rotate-12 bg-accent opacity-70 rounded-lg" />

      <div className="relative z-10 w-full max-w-md">
        <Card className="border-2 border-foreground shadow-[8px_8px_0px_0px_#1E293B] hover:rotate-0 hover:scale-100">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-hard-sm">
              <User className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-heading font-extrabold text-foreground">Welcome Back!</CardTitle>
            <CardDescription className="text-lg font-medium">To get started, please sign in.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                <input
                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base font-medium text-foreground outline-none transition-all placeholder:text-slate-400 focus:border-accent focus:shadow-hard-md"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => onEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Password</label>
                <input
                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-base font-medium text-foreground outline-none transition-all placeholder:text-slate-400 focus:border-accent focus:shadow-hard-md"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => onPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="rounded-lg border-2 border-red-200 bg-red-50 p-3 text-sm font-bold text-red-600">
                  <AlertCircle className="inline mr-2 h-4 w-4" />
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                {loading ? <Loader2 className="animate-spin mr-2" /> : "Let's Go!"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
