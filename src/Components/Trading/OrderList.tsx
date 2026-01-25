import type { Order } from "./Type";

interface OrderParams {
    orders: Order[]
}
export default function OrderList({orders}: OrderParams){

    return (
        <div>
            {orders.length > 0 && <div className="divider"></div>}
            {
                orders.map((order)=> (
                    <div className="order-row">
                        <span style={{color: 'white'}}>
                            {order.price}
                        </span>
                        <span className={order.type ==='BUY' ? 'buy-text': 'sell-text'}>
                            {order.amount}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}