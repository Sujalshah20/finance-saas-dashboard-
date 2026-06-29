import { MetricCard } from "@/components/dashboard/MetricCard";
import { AiInsightCard } from "@/components/dashboard/AiInsightCard";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { EarningsProgress } from "@/components/dashboard/EarningsProgress";

/**
 * Server-side asynchronous fetch.
 * Avoid invalid URL errors in Turbopack by ensuring we always pass a valid absolute URL.
 */
async function getDashboardData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    baseUrl && baseUrl.trim().length > 0
      ? `${baseUrl}/api/dashboard`
      : `http://localhost:3000/api/dashboard`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    // Graceful fallback for build process / first run
    return {
      income: { title: "Income", value: "₹0", trend: "0%", isPositive: true, chartData: [], barData: [] },
      expense: { title: "Expense", value: "₹0", trend: "0%", isPositive: true, chartData: [], barData: [] },
      earnings: []
    }
  }
  return res.json();
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  
  return (
    <div className="space-y-6">
      {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <MetricCard data={data.income} />
        </div>
        <div className="xl:col-span-1">
          <MetricCard data={data.expense} />
        </div>
        <div className="xl:col-span-1">
          <AiInsightCard />
        </div>
      </div>
      
      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-10">
        <div className="xl:col-span-2">
          <TransactionTable />
        </div>
        <div className="xl:col-span-1">
          <EarningsProgress data={data.earnings} />
        </div>
      </div>
    </div>
  );
}
