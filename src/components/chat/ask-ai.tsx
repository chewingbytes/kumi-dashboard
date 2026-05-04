import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MOCK_QUESTIONS = [
  "Which students are still checked in right now?",
  "Which parents have already read the message?",
  "Who had the longest lesson durations today?",
];

const MOCK_ANSWERS: Record<string, string> = {
  [MOCK_QUESTIONS[0]]:
    "There are 2 students still checked in right now: EVERETT NEO, who checked in at 12:57 pm, and ENZO NEO, who checked in at 12:56 pm.",
  [MOCK_QUESTIONS[1]]:
    "2 parents have already read the message: AXEL LAUW KUAN WEI (sent at 01:23 pm, read at 01:33 pm) and NITHILAN KUMARAN (sent at 01:13 pm, read at 01:22 pm).",
  [MOCK_QUESTIONS[2]]:
    "The longest lesson durations today were GAO LE XIN HANNAH at 130 minutes, SHIVIKA ARORA at 113 minutes, and SAANVI SREEJITH at 107 minutes.",
};

const FALLBACK_ANSWER =
  "This mock version only supports the 3 sample questions shown above for now. Please try one of those exact questions.";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function AskAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tickerIndex, setTickerIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [isTypingPrompt, setIsTypingPrompt] = useState(false);
  const [isTypingResponse, setIsTypingResponse] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpenRef = useRef(false);
  const demoQuestionIndexRef = useRef(0);
  const responseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const promptTypingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextDemoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickerText = MOCK_QUESTIONS[tickerIndex];

  const clearDemoTimers = () => {
    if (responseTimeoutRef.current) {
      clearTimeout(responseTimeoutRef.current);
      responseTimeoutRef.current = null;
    }

    if (promptTypingIntervalRef.current) {
      clearInterval(promptTypingIntervalRef.current);
      promptTypingIntervalRef.current = null;
    }

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    if (nextDemoTimeoutRef.current) {
      clearTimeout(nextDemoTimeoutRef.current);
      nextDemoTimeoutRef.current = null;
    }
  };

  const getMockAnswer = (prompt: string) => {
    const normalizedPrompt = prompt.trim().toLowerCase();
    const matchedQuestion = MOCK_QUESTIONS.find(
      (question) => question.toLowerCase() === normalizedPrompt,
    );

    return matchedQuestion ? MOCK_ANSWERS[matchedQuestion] : FALLBACK_ANSWER;
  };

  const startPromptTyping = (question: string) => {
    setQuery("");
    setIsTypingPrompt(true);

    let currentIndex = 0;
    promptTypingIntervalRef.current = setInterval(() => {
      currentIndex += 1;
      setQuery(question.slice(0, currentIndex));

      if (currentIndex >= question.length) {
        if (promptTypingIntervalRef.current) {
          clearInterval(promptTypingIntervalRef.current);
        }
        promptTypingIntervalRef.current = null;
        setIsTypingPrompt(false);

        nextDemoTimeoutRef.current = setTimeout(() => {
          handleSubmit(undefined, question);
        }, 450);
      }
    }, 35);
  };

  const queueNextDemoQuestion = () => {
    if (!isOpenRef.current) return;

    const nextIndex = (demoQuestionIndexRef.current + 1) % MOCK_QUESTIONS.length;
    const isNewLoop = nextIndex === 0;
    demoQuestionIndexRef.current = nextIndex;

    nextDemoTimeoutRef.current = setTimeout(() => {
      if (!isOpenRef.current) return;

      if (isNewLoop) {
        setMessages([]);
      }

      startPromptTyping(MOCK_QUESTIONS[demoQuestionIndexRef.current]);
    }, isNewLoop ? 1800 : 1200);
  };

  const handleSubmit = (
    event?: FormEvent<HTMLFormElement>,
    presetQuery?: string,
  ) => {
    event?.preventDefault();

    const submittedQuery = (presetQuery ?? query).trim();
    if (
      !submittedQuery ||
      isLoadingResponse ||
      isTypingResponse ||
      isTypingPrompt
    ) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: submittedQuery,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setIsLoadingResponse(true);

    clearDemoTimers();

    responseTimeoutRef.current = setTimeout(() => {
      const fullAnswer = getMockAnswer(submittedQuery);
      const assistantMessageId = `${Date.now()}-assistant`;
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoadingResponse(false);
      setIsTypingResponse(true);
      setTypingMessageId(assistantMessageId);

      let currentIndex = 0;
      typingIntervalRef.current = setInterval(() => {
        currentIndex += 1;

        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessageId
              ? { ...message, content: fullAnswer.slice(0, currentIndex) }
              : message,
          ),
        );

        if (currentIndex >= fullAnswer.length) {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
          }
          typingIntervalRef.current = null;
          setIsTypingResponse(false);
          setTypingMessageId(null);
          queueNextDemoQuestion();
        }
      }, 20);
    }, 5000);
  };

  useEffect(() => {
    isOpenRef.current = isOpen;

    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % MOCK_QUESTIONS.length);
    }, 3600);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      clearDemoTimers();
      setQuery("");
      setIsTypingPrompt(false);
      setIsLoadingResponse(false);
      setIsTypingResponse(false);
      setTypingMessageId(null);
      return;
    }

    demoQuestionIndexRef.current = 0;
    setMessages([]);
    setQuery("");
    setIsTypingPrompt(false);
    setIsLoadingResponse(false);
    setIsTypingResponse(false);
    setTypingMessageId(null);
    clearDemoTimers();

    nextDemoTimeoutRef.current = setTimeout(() => {
      if (!isOpenRef.current) return;
      startPromptTyping(MOCK_QUESTIONS[0]);
    }, 350);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      clearDemoTimers();
    };
  }, []);

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
                {messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                      <h3
                        className="ai-fade-up font-heading text-2xl font-bold text-slate-900"
                        style={{ animationDelay: "0.1s" }}
                      >
                        How can I help you today?
                      </h3>
                      {/* <p
                        className="ai-fade-up mx-auto max-w-md text-sm text-slate-500"
                        style={{ animationDelay: "0.18s" }}
                      >
                      </p> */}
                    </div>

                    <div className="grid w-full max-w-lg gap-3">
                      {MOCK_QUESTIONS.map((suggestion, idx) => (
                        <button
                          key={suggestion}
                          className="ai-fade-up group flex items-center gap-3 rounded-2xl border border-white/50 bg-white/80 p-3 text-left transition-all hover:border-accent hover:bg-white hover:shadow-lg"
                          style={{ animationDelay: `${0.25 + idx * 0.08}s` }}
                          onClick={() => handleSubmit(undefined, suggestion)}
                          disabled={
                            isTypingPrompt || isLoadingResponse || isTypingResponse
                          }
                        >
                          <div className="flex items-center justify-center rounded-full bg-indigo-50 p-2 text-indigo-500 transition-colors group-hover:bg-accent group-hover:text-white">
                            <MessageSquare className="h-4 w-4" />
                          </div>
                          <span className="text-xs font-medium text-slate-700">
                            {suggestion}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                          message.role === "user"
                            ? "ml-auto bg-slate-900 text-white"
                            : "border border-slate-200 bg-white text-slate-700",
                        )}
                      >
                        {message.content}
                        {message.id === typingMessageId && (
                          <span className="ml-1 inline-block h-4 w-2 animate-pulse rounded-sm bg-slate-400 align-middle" />
                        )}
                      </div>
                    ))}

                    {isLoadingResponse && (
                      <div className="max-w-[88%] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                        Kumi is reviewing today&apos;s attendance data...
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="border-t border-white/60 bg-white/80 px-3 py-3 backdrop-blur sm:px-4 sm:py-4">
                <form
                  onSubmit={(event) => handleSubmit(event)}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200/60 bg-white/70 px-2 py-2 sm:px-3"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 border-none bg-transparent p-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0"
                    disabled={
                      isTypingPrompt || isLoadingResponse || isTypingResponse
                    }
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-9 w-9 rounded-xl"
                    disabled={
                      !query.trim() ||
                      isTypingPrompt ||
                      isLoadingResponse ||
                      isTypingResponse
                    }
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                {/* <p className="mt-2 text-center text-[11px] text-slate-500">
                  Answers may 
                </p> */}
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
