"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

type Transaction = {
  id: string;
  recipient: string;
  amount: string;
  date: string;
  timeAgo: string;
};

export function NewTransactionModal({ onTransactionAdded }: { onTransactionAdded: (transaction: Transaction) => void }) {
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const logActivity = (text: string) => {
    try {
      const stored = window.localStorage.getItem("nexora-activities");
      const activities = stored ? (JSON.parse(stored) as { id: number; title: string; time: string }[]) : [];
      const nextActivity = {
        id: Date.now(),
        title: text,
        time: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      };
      window.localStorage.setItem("nexora-activities", JSON.stringify([nextActivity, ...activities]));
    } catch (error) {
      console.warn("Failed to log activity to localStorage", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newTransaction: Transaction = {
      id: `#INV-${Date.now()}`,
      recipient: recipient || "Unknown",
      amount: `₹ ${parseFloat(amount || "0").toFixed(2)}`,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      timeAgo: "Just now"
    };

    const activityText = `Added transaction for ${newTransaction.recipient} (${newTransaction.amount})`;

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient, amount })
      });
      if (response.ok) {
        const saved = await response.json();
        onTransactionAdded(saved);
      } else {
        onTransactionAdded(newTransaction);
      }
    } catch (error) {
      console.warn('Transaction save failed, using local fallback.', error);
      onTransactionAdded(newTransaction);
    } finally {
      logActivity(activityText);
      setLoading(false);
      setOpen(false);
      setRecipient("");
      setAmount("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-8 px-3 bg-slate-900 text-white shadow hover:bg-slate-800">
        <Plus className="w-4 h-4 mr-1" /> New Transaction
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>
              Record a new income or expense transaction manually.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="recipient" className="text-right text-sm font-medium">
                Recipient
              </label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="col-span-3"
                placeholder="e.g. Acme Corp"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="amount" className="text-right text-sm font-medium">
                Amount (₹)
              </label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
