import {
    OrderCreated
} from "../generated/NftLimitOrderFlowProxy/NftLimitOrderFlowProxy"
import { NftOrder } from "../generated/schema"

/**
 * 
 * @param event nft订单创建事件
 */
export function handleOrderCreated(event: OrderCreated): void {
    let flowId = event.params.flowId.toString()
    let nftOrder = new NftOrder(flowId)
    let order = event.params.order
    nftOrder.owner = order.owner.toHexString()
    nftOrder.assetToken = order.assetToken.toHexString()
    nftOrder.amount = order.amount
    nftOrder.price = order.price
    nftOrder.deadline = order.deadline
    nftOrder.tokenId = order.tokenId
    nftOrder.blockTime = event.block.timestamp
    nftOrder.save()
}

