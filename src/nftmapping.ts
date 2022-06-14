import {
    OrderCancelled,
    OrderCreated,
    OrderExecuted,
    OwnershipTransferred
} from "../generated/NftLimitOrderFlowProxy/NftLimitOrderFlowProxy"
import { NftOrder } from "../generated/schema"
import { ACTIVE, checkFlowEntityExists, NFT } from "./helpers"

// export function handleOrderCancelled(event: OrderCancelled): void {

// }

/**
 * 
 * @param event nft订单创建事件
 */
export function handleOrderCreated(event: OrderCreated): void {
    let flowId = event.params.flowId.toString()
    let entity = checkFlowEntityExists(flowId)

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

    entity.admin = event.params.user.toHexString()
    entity.flowStatus = ACTIVE
    entity.flowType = NFT
    entity.nftOrder = nftOrder.id
    entity.deadline = order.deadline
    entity.save()
}

// export function handleOrderExecuted(event: OrderExecuted): void { }

// export function handleOwnershipTransferred(event: OwnershipTransferred): void { }
