import { Card } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";

export function EarningsProgress({ data }: { data: { title: string; current: number; target: number; color: string }[] }) {
  return (
    <Card className="p-6 rounded-2xl shadow-sm border-slate-100 bg-white h-full">
      <h3 className="text-slate-900 font-bold text-lg mb-8">Earning Categories</h3>
      
      <div className="space-y-8">
        {data.map((item, idx) => {
          const percentage = (item.current / item.target) * 100;
          return (
            <div key={idx}>
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center`} style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                  <IndianRupee className="w-4 h-4" strokeWidth={3} />
                </div>
                <span className="font-bold text-slate-800">{item.title}</span>
              </div>
              <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div 
                  className={`absolute top-0 left-0 h-full rounded-full ${item.color}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="text-sm font-bold mt-2">
                <span className="text-slate-900">₹{item.current}</span>
                <span className="text-slate-400 font-medium"> / from ₹{item.target}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
