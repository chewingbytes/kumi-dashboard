import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Summarize today's check-ins and check-outs by class.",
  "Which students have not checked out yet?",
  "List students who exceeded their allocated study time.",
  "Generate reminders for parents of absent students.",
  "Show patterns in late arrivals over the past two weeks.",
  "Who consistently leaves within 30 minutes of arrival?",
  "Draft a WhatsApp message for a parent about early pickup.",
  "Highlight students whose parents haven't been notified.",
  "Compare attendance between Wednesday and Friday groups.",
  "Suggest follow-ups for students with repeated no-shows.",
];

export function AskAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>(
    SUGGESTIONS.slice(0, 4),
  );
  const [tickerIndex, setTickerIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const tickerText = SUGGESTIONS[tickerIndex];

  const getRandomSuggestions = () => {
    const pool = [...SUGGESTIONS];
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 4);
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % SUGGESTIONS.length);
    }, 3600);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSuggestions(getRandomSuggestions());
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out",
          isOpen
            ? "bottom-3 w-[92vw] max-w-[640px] h-[88vh] translate-y-0 sm:bottom-1/2 sm:h-[500px] sm:w-[min(90vw,640px)] sm:translate-y-1/2"
            : "bottom-6 w-[18rem] hover:w-[22rem] sm:w-[24rem] sm:hover:w-[28rem] cursor-pointer",
        )}
      >
        {isOpen ? (
          <div
            id="ask-kumi-panel"
            className="ask-ai-panel relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="ask-ai-panel-decor pointer-events-none absolute inset-0">
              <span className="ask-ai-orb ask-ai-orb--pink" />
              <span className="ask-ai-orb ask-ai-orb--teal" />
              <span className="ask-ai-diamond" />
            </div>

            <div className="relative z-10 flex h-full min-h-0 flex-col">
              <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-2xl border-2 border-white/70 bg-white/40 p-0.5">
                    <img
                      src="/k2-min.png"
                      alt="Kumi assistant avatar"
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Ask Kumi
                    </p>
                    <p className="text-xs text-slate-500">
                      Instant guidance for Kumon instructors
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto bg-transparent p-4 sm:p-6">
                <div className="flex h-full flex-col items-center justify-center space-y-8 text-center">
                  <div className="space-y-2">
                    <h3
                      className="ai-fade-up font-heading text-2xl font-bold text-slate-900"
                      style={{ animationDelay: "0.1s" }}
                    >
                      How can I help you today?
                    </h3>
                    <p
                      className="ai-fade-up mx-auto max-w-md text-sm text-slate-500"
                      style={{ animationDelay: "0.18s" }}
                    >
                      I can analyze attendance data, surface trends, and help
                      you craft parent updates in seconds.
                    </p>
                  </div>

                  <div className="grid w-full max-w-lg gap-3 sm:grid-cols-2">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={suggestion}
                        className="ai-fade-up group flex items-center gap-3 rounded-2xl border border-white/50 bg-white/80 p-3 text-left transition-all hover:border-accent hover:bg-white hover:shadow-lg"
                        style={{ animationDelay: `${0.25 + idx * 0.08}s` }}
                        onClick={() => setQuery(suggestion)}
                      >
                        <div className="flex p-2 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 transition-colors group-hover:bg-accent group-hover:text-white">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-medium text-slate-700">
                          {suggestion}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/60 bg-white/80 px-3 py-3 backdrop-blur sm:px-4 sm:py-4">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200/60 bg-white/70 px-2 py-2 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/15 sm:px-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your question here..."
                    className="flex-1 border-none bg-transparent p-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-0"
                  />
                  <Button
                    size="icon"
                    className="h-9 w-9 rounded-xl"
                    disabled={!query.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 text-center text-[11px] text-slate-500">
                  AI-generated responses may be inaccurate. Please verify
                  important details.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex h-14 w-full items-center justify-center border border-slate-200 bg-white shadow-2xl rounded-2xl px-3"
            aria-controls="ask-kumi-panel"
            aria-expanded={isOpen}
          >
            <div className="flex flex-1 items-center gap-2 overflow-hidden">
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <img
                  src="/k2-min.png"
                  alt="Kumi assistant avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative flex-1 overflow-hidden">
                <div className="relative flex h-8 items-center text-[11px] text-black/80">
                  <span
                    key={tickerIndex}
                    className="inline-flex min-w-0 animate-ticker-slide text-left"
                    aria-live="polite"
                  >
                    {tickerText}
                  </span>
                </div>
              </div>
            </div>
          </button>
        )}
      </div>
    </>
  );
}
