export interface Rec {
  title: string;
  body: string;
}

export interface Data {
  balanceHistory: { date: string, amount: number }[];
  spendingHistory: { date: string, amount: number }[];
  spendingGoal: number;
  incomeArray: { income: number; period: string; }[];
  aiRecs: Rec[];
}