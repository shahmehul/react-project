
interface ActionButtonProps {
    onBuy: (e:any)=> void,
    onSell: (e:any)=> void
}

export default function ActionButtons({onBuy, onSell}: ActionButtonProps){
    return (
        <div className="action-buttons">
            <button className="trade-btn buy-btn" onClick={onBuy}>Buy</button>
            <button className="trade-btn sell-btn" onClick={onSell}>Sell</button>
        </div>
    )
}