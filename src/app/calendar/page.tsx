"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useLocalStorageState } from "@/lib/use-local-storage";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const currentDay = new Date().getDay();

interface EventItem {
  id: string;
  title: string;
  time: string;
  day: number;
}

const defaultEvents: EventItem[] = [
  { id: "event-1", title: "Team standup", time: "09:00 AM", day: 1 },
  { id: "event-2", title: "Client call - Uda Studio", time: "11:00 AM", day: 1 },
  { id: "event-3", title: "Invoice review", time: "02:00 PM", day: 2 },
];

export default function CalendarPage() {
  const [events, setEvents] = useLocalStorageState<EventItem[]>("nexora-events", defaultEvents);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", time: "", day: 1 });
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    if (editingEvent) {
      Promise.resolve().then(() => setForm({ title: editingEvent.title, time: editingEvent.time, day: editingEvent.day }));
    } else {
      Promise.resolve().then(() => setForm({ title: "", time: "", day: 1 }));
    }
  }, [editingEvent]);

  const handleSave = () => {
    const eventData: EventItem = {
      id: editingEvent?.id || crypto.randomUUID(),
      title: form.title.trim(),
      time: form.time.trim() || "All day",
      day: form.day,
    };

    if (!eventData.title) {
      return;
    }

    setEvents((prev) => {
      if (editingEvent) {
        return prev.map((item) => (item.id === editingEvent.id ? eventData : item));
      }
      return [eventData, ...prev];
    });

    setOpen(false);
    setEditingEvent(null);
  };

  const handleEdit = (eventItem: EventItem) => {
    setEditingEvent(eventItem);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((eventItem) => eventItem.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Calendar</h1>
          <p className="text-sm text-slate-500 mt-1">Add, edit, and store events locally so your schedule persists.</p>
        </div>

        <Dialog open={open} onOpenChange={(value) => {
          setOpen(value);
          if (!value) setEditingEvent(null);
        }}>
          <DialogTrigger className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400">
            <Plus className="w-4 h-4" /> Add Event
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "Edit Event" : "Add Event"}</DialogTitle>
              <DialogDescription>Keep your calendar events saved locally across refreshes.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="event-title" className="text-right text-sm font-medium">Title</label>
                <Input id="event-title" className="col-span-3" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} placeholder="Team standup" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="event-time" className="text-right text-sm font-medium">Time</label>
                <Input id="event-time" className="col-span-3" value={form.time} onChange={(e) => setForm((s) => ({ ...s, time: e.target.value }))} placeholder="09:00 AM" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="event-day" className="text-right text-sm font-medium">Day</label>
                <select id="event-day" value={form.day} onChange={(e) => setForm((s) => ({ ...s, day: Number(e.target.value) }))} className="col-span-3 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  {days.map((dayName, index) => (
                    <option key={dayName} value={index + 1}>{dayName}</option>
                  ))}
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" onClick={handleSave} className="bg-slate-900 text-white hover:bg-slate-800">
                Save Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {events.length === 0 ? (
        <EmptyState
          icon={<CalendarIcon className="w-8 h-8 text-slate-400" />}
          title="No events scheduled"
          description="Add events to your calendar and keep them saved locally so they remain available on refresh."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {days.map((dayName, idx) => {
            const dayEvents = events.filter((eventItem) => eventItem.day === idx + 1);
            const isToday = idx + 1 === (currentDay === 0 ? 7 : currentDay);
            return (
              <Card key={dayName} className={`rounded-2xl shadow-sm border-slate-100 bg-white p-4 min-h-[180px] ${isToday ? "ring-2 ring-blue-500" : ""}`}>
                <div className={`text-sm font-bold mb-3 ${isToday ? "text-blue-600" : "text-slate-500"}`}>
                  {dayName} {isToday && <span className="text-xs font-medium ml-1">(Today)</span>}
                </div>
                <div className="space-y-3">
                  {dayEvents.length > 0 ? dayEvents.map((eventItem) => (
                    <div key={eventItem.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{eventItem.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{eventItem.time}</p>
                        </div>
                        <button onClick={() => handleDelete(eventItem.id)} className="text-slate-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => handleEdit(eventItem)} className="mt-3 rounded-md px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100">
                        Edit
                      </button>
                    </div>
                  )) : (
                    <p className="text-xs text-slate-300 italic">No events</p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
