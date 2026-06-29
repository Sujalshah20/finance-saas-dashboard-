"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { FileText, Plus, Pencil, Trash2 } from "lucide-react";
import { useLocalStorageState } from "@/lib/use-local-storage";

interface Invoice {
  id: string;
  client: string;
  amount: string;
  status: string;
  date: string;
}

const defaultInvoices: Invoice[] = [
  { id: "INV-001", client: "Uda Studio", amount: "₹ 650.00", status: "Paid", date: "April 1, 2025" },
  { id: "INV-002", client: "Erempe Studio", amount: "₹ 750.00", status: "Pending", date: "April 3, 2025" },
  { id: "INV-004", client: "PT. Jaya Makmur", amount: "₹ 350.00", status: "Overdue", date: "March 20, 2025" },
];

const statusColors: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
};

export default function InvoicingPage() {
  const [invoices, setInvoices] = useLocalStorageState<Invoice[]>("nexora-invoices", defaultInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [form, setForm] = useState({ client: "", amount: "", status: "Pending", date: "" });

  const filteredInvoices = invoices.filter((invoice) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      invoice.id.toLowerCase().includes(search) ||
      invoice.client.toLowerCase().includes(search) ||
      invoice.amount.toLowerCase().includes(search);

    const matchesStatus = statusFilter === "All" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    if (editingInvoice) {
      Promise.resolve().then(() => setForm({ client: editingInvoice.client, amount: editingInvoice.amount, status: editingInvoice.status, date: editingInvoice.date }));
    } else {
      Promise.resolve().then(() => setForm({ client: "", amount: "", status: "Pending", date: "" }));
    }
  }, [editingInvoice]);

  const handleSave = () => {
    const invoiceData: Invoice = {
      id: editingInvoice?.id || `INV-${Date.now()}`,
      client: form.client.trim(),
      amount: form.amount.trim(),
      status: form.status,
      date: form.date.trim() || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };

    if (!invoiceData.client || !invoiceData.amount) {
      return;
    }

    setInvoices((prev) => {
      if (editingInvoice) {
        return prev.map((item) => (item.id === editingInvoice.id ? invoiceData : item));
      }
      return [invoiceData, ...prev];
    });

    setOpen(false);
    setEditingInvoice(null);
  };

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-slate-900">Invoicing</h1>
          <p className="text-sm text-slate-500 mt-1">Create and manage invoices locally with persisted state.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 sm:w-auto"
            >
              <option value="All">All statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <Dialog open={open} onOpenChange={(value) => {
          setOpen(value);
          if (!value) setEditingInvoice(null);
        }}>
          <DialogTrigger className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400">
            <Plus className="w-4 h-4" /> Add Invoice
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingInvoice ? "Edit Invoice" : "Add Invoice"}</DialogTitle>
              <DialogDescription>Save invoice details locally so they remain available on refresh.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="client" className="text-right text-sm font-medium">Client</label>
                <Input id="client" className="col-span-3" value={form.client} onChange={(e) => setForm((s) => ({ ...s, client: e.target.value }))} placeholder="Client name" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="amount" className="text-right text-sm font-medium">Amount</label>
                <Input id="amount" className="col-span-3" value={form.amount} onChange={(e) => setForm((s) => ({ ...s, amount: e.target.value }))} placeholder="₹ 0.00" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right text-sm font-medium">Status</label>
                <select id="status" value={form.status} onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))} className="col-span-3 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-right text-sm font-medium">Date</label>
                <Input id="date" className="col-span-3" value={form.date} onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))} placeholder="April 10, 2025" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSave} className="bg-slate-900 text-white hover:bg-slate-800">
                Save Invoice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {invoices.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-8 h-8 text-slate-400" />}
          title="No invoices yet"
          description="Create invoices and keep them saved locally for quick access."
        />
      ) : filteredInvoices.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-8 h-8 text-slate-400" />}
          title="No invoices match"
          description="Update your search or filter settings to find the invoice you need."
        />
      ) : (
        <Card className="rounded-2xl shadow-sm border-slate-100 bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-600">Invoice</TableHead>
                <TableHead className="font-semibold text-slate-600">Client</TableHead>
                <TableHead className="font-semibold text-slate-600">Amount</TableHead>
                <TableHead className="font-semibold text-slate-600">Status</TableHead>
                <TableHead className="font-semibold text-slate-600">Date</TableHead>
                <TableHead className="font-semibold text-slate-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell className="font-medium text-slate-800">{invoice.client}</TableCell>
                  <TableCell className="font-bold text-slate-900">{invoice.amount}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[invoice.status] ?? "bg-slate-100 text-slate-700"}`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-500">{invoice.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon-sm" onClick={() => handleEdit(invoice)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(invoice.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
