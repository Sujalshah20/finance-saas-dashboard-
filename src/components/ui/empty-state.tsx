import { ReactNode } from "react";
import { Card } from "./card";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="rounded-2xl shadow-sm border-slate-100 bg-white p-16">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 mb-6 max-w-md">{description}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm"
          >
            {action.label}
          </button>
        )}
      </div>
    </Card>
  );
}
