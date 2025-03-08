export interface Rec {
  title: string;
  body: string;
}

export interface Data {
  balanceHistory: number[];
  spendingHistory: number[];
  spendingGoal: number;
  incomeArray: { income: number; period: string; }[];
  aiRecs: Rec[];
}