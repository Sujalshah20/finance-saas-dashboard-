import { NextResponse } from 'next/server';
import { incomeData, expenseData, earnings } from '@/lib/mock-data';

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return NextResponse.json({
    income: incomeData,
    expense: expenseData,
    earnings: earnings
  });
}
