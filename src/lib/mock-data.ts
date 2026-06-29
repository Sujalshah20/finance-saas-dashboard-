export const incomeData = {
  title: "Income",
  value: "₹3,741",
  trend: "+15%",
  isPositive: true,
  chartData: [
    { day: "Mon", value: 40 },
    { day: "Tue", value: 120 },
    { day: "Wed", value: 10 },
    { day: "Thu", value: 110 },
    { day: "Fri", value: 90 },
    { day: "Sat", value: 200 },
    { day: "Sun", value: 130 },
  ],
  barData: [
    { day: "Mon", value: 60 },
    { day: "Tue", value: 100 },
    { day: "Wed", value: 140 },
  ]
};

export const expenseData = {
  title: "Expense",
  value: "₹1,741",
  trend: "-15%",
  isPositive: false,
  chartData: [
    { day: "Mon", value: 130 },
    { day: "Tue", value: 200 },
    { day: "Wed", value: 100 },
    { day: "Thu", value: 120 },
    { day: "Fri", value: 10 },
    { day: "Sat", value: 120 },
    { day: "Sun", value: 50 },
  ],
  barData: [
    { day: "Mon", value: 140 },
    { day: "Tue", value: 100 },
    { day: "Wed", value: 60 },
  ]
};

export const transactions = [
  { id: "#INV-001-123456", recipient: "Uda Studio", amount: "₹ 650,00", date: "April 1, 2021", timeAgo: "2m ago" },
  { id: "#INV-002-123456", recipient: "Erempe Studio", amount: "₹ 750,00", date: "April 1, 2021", timeAgo: "2m ago" },
  { id: "#INV-003-123456", recipient: "Still Blu Studio", amount: "₹ 1650,00", date: "April 1, 2021", timeAgo: "2m ago" },
  { id: "#INV-004-123456", recipient: "PT. Jaya Makmur", amount: "₹ 350,00", date: "April 1, 2021", timeAgo: "2m ago" },
  { id: "#INV-005-123456", recipient: "Kala Studio", amount: "₹ 1234,00", date: "April 1, 2021", timeAgo: "2m ago" },
];

export const earnings = [
  { title: "Working Hard", current: 50, target: 1000, color: "bg-[#22C55E]" },
  { title: "Investment", current: 500, target: 1000, color: "bg-[#EF4444]" },
];
