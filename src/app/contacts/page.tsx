"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { useLocalStorageState } from "@/lib/use-local-storage";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const defaultContacts: Contact[] = [
  { id: "contact-1", name: "Uda Studio", email: "uda@studio.com", phone: "+91 98765 43210", role: "Client" },
  { id: "contact-2", name: "Erempe Studio", email: "hello@erempe.in", phone: "+91 87654 32109", role: "Client" },
  { id: "contact-3", name: "Still Blu Studio", email: "info@stillblu.com", phone: "+91 76543 21098", role: "Vendor" },
];

const roleColors: Record<string, string> = {
  Client: "bg-blue-100 text-blue-700",
  Vendor: "bg-purple-100 text-purple-700",
  Partner: "bg-green-100 text-green-700",
};

export default function ContactsPage() {
  const [contacts, setContacts] = useLocalStorageState<Contact[]>("nexora-contacts", defaultContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "Client" });

  const filteredContacts = contacts.filter((contact) => {
    const query = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query) ||
      contact.role.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    if (editingContact) {
      Promise.resolve().then(() => setForm({ name: editingContact.name, email: editingContact.email, phone: editingContact.phone, role: editingContact.role }));
    } else {
      Promise.resolve().then(() => setForm({ name: "", email: "", phone: "", role: "Client" }));
    }
  }, [editingContact]);

  const handleSave = () => {
    const contactData: Contact = {
      id: editingContact?.id || crypto.randomUUID(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      role: form.role,
    };

    if (!contactData.name || !contactData.email || !contactData.phone) {
      return;
    }

    setContacts((prev) => {
      if (editingContact) {
        return prev.map((contact) => (contact.id === editingContact.id ? contactData : contact));
      }
      return [contactData, ...prev];
    });

    setOpen(false);
    setEditingContact(null);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your clients, vendors, and partners with persisted storage.</p>
          <div className="mt-4 max-w-sm">
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <Dialog open={open} onOpenChange={(value) => {
          setOpen(value);
          if (!value) setEditingContact(null);
        }}>
          <DialogTrigger className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400">
            <Plus className="w-4 h-4" /> Add Contact
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingContact ? "Edit Contact" : "Add Contact"}</DialogTitle>
              <DialogDescription>
                Store contact information locally so it remains available on refresh.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm font-medium">Name</label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Contact name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right text-sm font-medium">Email</label>
                <Input
                  id="email"
                  className="col-span-3"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  placeholder="contact@company.com"
                  type="email"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right text-sm font-medium">Phone</label>
                <Input
                  id="phone"
                  className="col-span-3"
                  value={form.phone}
                  onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="role" className="text-right text-sm font-medium">Role</label>
                <select
                  id="role"
                  value={form.role}
                  onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
                  className="col-span-3 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  <option>Client</option>
                  <option>Vendor</option>
                  <option>Partner</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSave} className="bg-slate-900 text-white hover:bg-slate-800">
                Save Contact
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {contacts.length === 0 ? (
        <EmptyState
          icon={<Users className="w-8 h-8 text-slate-400" />}
          title="No contacts yet"
          description="Create a contact to store client, vendor, and partner details in persistent storage."
        />
      ) : filteredContacts.length === 0 ? (
        <EmptyState
          icon={<Users className="w-8 h-8 text-slate-400" />}
          title="No contacts found"
          description="Try a different search term or add a new contact to expand your directory."
        />
      ) : (
        <Card className="rounded-2xl shadow-sm border-slate-100 bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-600">Name</TableHead>
                <TableHead className="font-semibold text-slate-600">Email</TableHead>
                <TableHead className="font-semibold text-slate-600">Phone</TableHead>
                <TableHead className="font-semibold text-slate-600">Role</TableHead>
                <TableHead className="font-semibold text-slate-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-slate-200 text-slate-600 text-xs font-bold">
                          {contact.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-slate-800">{contact.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500">{contact.email}</TableCell>
                  <TableCell className="text-slate-500">{contact.phone}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColors[contact.role] ?? "bg-slate-100 text-slate-700"}`}>
                      {contact.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon-sm" onClick={() => handleEdit(contact)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(contact.id)}>
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
