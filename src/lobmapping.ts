import { LOBExchange, OrderCreated } from "../generated/LOBExchange/LOBExchange";
import { Erc20Order } from "../generated/schema";

export function handleOrderCreated(event: OrderCreated): void {
    let address = event.address
    let orderId = event.params.orderId
    let erc20Order = new Erc20Order(orderId.toHexString())
    let lobContract = LOBExchange.bind(address)
    let orderInfo = lobContract.getOrderInfo(orderId)
    erc20Order.owner = orderInfo.value0.owner.toHexString()
    erc20Order.inputAmount = orderInfo.value0.inputAmount
    erc20Order.inputToken = orderInfo.value0.inputToken.toHexString()
    erc20Order.minRate = orderInfo.value0.minRate
    erc20Order.outputToken = orderInfo.value0.outputToken.toHexString()
    erc20Order.deadline = orderInfo.value0.deadline
    erc20Order.receiptor = orderInfo.value0.receiptor.toHexString()
    erc20Order.minInputPer = orderInfo.value0.minInputPer
    erc20Order.blockTime = event.block.timestamp
    erc20Order.save()
}