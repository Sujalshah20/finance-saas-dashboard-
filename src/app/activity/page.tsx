"use client";

import { useState } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Activity } from "lucide-react";
import { useLocalStorageState } from "@/lib/use-local-storage";

interface ActivityItem {
  id: number;
  title: string;
  time: string;
}

export default function ActivityPage() {
  const [activities, setActivities] = useLocalStorageState<ActivityItem[]>("nexora-activities", []);
  const [newActivity, setNewActivity] = useState("");

  const addActivity = () => {
    const trimmed = newActivity.trim();
    if (!trimmed) return;

    setActivities((current) => [
      {
        id: Date.now(),
        title: trimmed,
        time: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      },
      ...current,
    ]);
    setNewActivity("");
  };

  const removeActivity = (id: number) => {
    setActivities((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Latest Activity</h1>
        <div className="flex flex-col gap-3 w-full sm:flex-row sm:w-auto">
          <Input
            placeholder="Describe a new activity"
            value={newActivity}
            onChange={(event) => setNewActivity(event.target.value)}
            className="min-w-0 flex-1"
          />
          <Button onClick={addActivity} disabled={!newActivity.trim()}>
            Add Activity
          </Button>
        </div>
      </div>

      {activities.length === 0 ? (
        <EmptyState
          icon={<Activity className="w-8 h-8 text-slate-400" />}
          title="No activity yet"
          description="Your latest activities will appear here. Add a new item to track progress and keep your dashboard updated."
          action={{ label: "Add first activity", onClick: addActivity }}
        />
      ) : (
        <div className="grid gap-4">
          {activities.map((activity) => (
            <Card key={activity.id} className="p-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-slate-900 font-semibold">{activity.title}</p>
                <p className="text-sm text-slate-500 mt-1">{activity.time}</p>
              </div>
              <button
                type="button"
                onClick={() => removeActivity(activity.id)}
                className="text-sm text-rose-500 hover:text-rose-600"
              >
                Remove
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
