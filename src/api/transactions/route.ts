import { NextResponse } from 'next/server';
import { transactions as mockTransactions } from '@/lib/mock-data';

// Keep in memory for POST request simulation
let transactions = [...mockTransactions];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const amountNumber = Number.parseFloat(body.amount);

    if (!Number.isFinite(amountNumber)) {
      return NextResponse.json(
        { error: 'Invalid amount. Expected a finite number.' },
        { status: 400 }
      );
    }

    const newTx = {
      id: `#INV-00${transactions.length + 1}-123456`,
      recipient: body.recipient || 'Unknown',
      amount: `₹ ${amountNumber.toFixed(2)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      timeAgo: 'Just now',
    };

    // Add to beginning
    transactions = [newTx, ...transactions];

    return NextResponse.json(newTx, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

