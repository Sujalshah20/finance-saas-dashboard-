"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sparkles, ArrowUpRight, Pointer } from "lucide-react";

export function AiInsightCard() {
  const [prompt, setPrompt] = useState("Share a short analysis of the dashboard trends and recommend one action item to improve finances.");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAskAI = async () => {
    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result?.error || 'Unable to get AI response.');
        return;
      }

      setResponse(result.text ?? 'No response returned.');
    } catch {
      setError('Failed to connect to AI service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 rounded-2xl shadow-sm border-0 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #ECFDF5, #E0E7FF)' }}>
      <div className="relative z-10 flex flex-col h-full justify-between min-h-[260px]">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-slate-900 font-extrabold text-xl">AI.</h3>
            <Sparkles className="text-blue-500 w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-800 text-lg mb-2 leading-tight">Insight</h4>
          <p className="text-slate-700 text-sm font-medium mb-1">Get actionable dashboard recommendations from AI.</p>
          <p className="text-slate-600 text-sm">Ask for a quick finance summary or growth opportunity.</p>
        </div>

        <Dialog>
          <DialogTrigger>
            <Button
              variant="outline"
              className="w-full mt-6 bg-white/50 hover:bg-white/80 border-0 shadow-sm backdrop-blur-sm text-slate-700 font-semibold flex justify-between items-center group"
            >
              Ask AI for insight
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>AI Dashboard Assistant</DialogTitle>
              <DialogDescription>
                Send a prompt to the AI and receive a concise, actionable update for your dashboard.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                className="min-h-[120px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              />
              {loading && <p className="text-sm text-slate-500">Asking AI for insight...</p>}
              {error && <p className="text-sm text-rose-600">{error}</p>}
              {response && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900">
                  <p className="font-semibold text-slate-700 mb-2">AI response</p>
                  <p>{response}</p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button disabled={loading} onClick={handleAskAI} className="bg-slate-900 text-white hover:bg-slate-800">
                {loading ? 'Asking AI...' : 'Send prompt'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="absolute -bottom-2 -right-2 opacity-80 text-teal-600/40 rotate-[-15deg] pointer-events-none">
        <Pointer className="w-24 h-24" fill="currentColor" />
      </div>
    </Card>
  );
}
