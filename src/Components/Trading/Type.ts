export interface Order {
    id: number;
    type: "BUY" | "SELL";
    price: string;
    amount: string;
  }