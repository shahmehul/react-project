import { useState } from "react";
import ActionButtons from "./ActionButtons";
import OrderList from "./OrderList";
import './Trade.css';

interface Order {
  id: number;
  type: "BUY" | "SELL";
  price: string;
  amount: string;
}

export default function Trading() {
  const [orders, setOrders] = useState<Order[]>([]);

  const onBuy = (e: any) => {
    const newOrder: Order = {
      id: Date.now(),
      type: "BUY",
      price: (1.45 + (Math.random() * 0.01 - 0.0005)).toFixed(4),
      amount: (3000 + Math.random() * 10000).toFixed(2),
    };

    setOrders((prev) => [...prev, newOrder]);
  };

  const onSell = (e: any) => {
    const newOrder: Order = {
      id: Date.now(),
      type: "SELL",
      price: (1.45 + (Math.random() * 0.001 - 0.0005)).toFixed(4),
      amount: (30000 + Math.random() * 10000).toFixed(2),
    };

    setOrders((prev) => [...prev, newOrder]);
  };

  return (
    <div className="trading-container">
      <h1>Trading Dashboard</h1>
      <ActionButtons onBuy={onBuy} onSell={onSell} />
      <OrderList orders={orders}></OrderList>
    </div>
  );
}