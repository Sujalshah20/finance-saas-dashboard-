"use client";

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Printer, MoreHorizontal, Trash2 } from "lucide-react";
import { NewTransactionModal } from "./NewTransactionModal";
import { useLocalStorageState } from "@/lib/use-local-storage";
import { transactions as mockTransactions } from "@/lib/mock-data";

type Transaction = {
  id: string;
  recipient: string;
  amount: string;
  date: string;
  timeAgo: string;
};

export function TransactionTable() {
  const [transactions, setTransactions] = useLocalStorageState<Transaction[]>("nexora-transactions", mockTransactions);

  const handleTransactionAdded = (newTransaction: Transaction) => {
    setTransactions((current) => [newTransaction, ...current]);
  };

  const handleDelete = (id: string) => {
    setTransactions((current) => current.filter((transaction) => transaction.id !== id));
  };

  return (
    <Card className="rounded-2xl shadow-sm border-slate-100 bg-white overflow-hidden flex flex-col h-full">
      <div className="p-6 pb-4 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-slate-900 font-bold text-lg">Latest Transactions</h3>
        <NewTransactionModal onTransactionAdded={handleTransactionAdded} />
      </div>
      <div className="flex-1 overflow-auto">
        {transactions.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-slate-500">
            No transactions found. Add a new transaction to get started.
          </div>
        ) : (
          <Table>
            <TableHeader className="hidden">
              <TableRow>
                <TableHead>ID & Recipient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="border-b-slate-50 hover:bg-slate-50">
                  <TableCell className="py-4 pl-6">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 font-medium mb-1">{tx.id}</span>
                      <span className="font-bold text-slate-900">{tx.recipient}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <FileText className="w-5 h-5" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 font-medium mb-1">Amount</span>
                      <span className="font-bold text-slate-900">{tx.amount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 font-medium text-sm">{tx.date}</TableCell>
                  <TableCell className="text-slate-400 font-medium text-sm">{tx.timeAgo}</TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-3 text-slate-400">
                      <button className="hover:text-slate-700 transition-colors" type="button">
                        <Printer className="w-5 h-5" />
                      </button>
                      <button className="hover:text-slate-700 transition-colors" type="button">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                      <button className="hover:text-rose-500 transition-colors" type="button" onClick={() => handleDelete(tx.id)}>
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Card>
  );
}
