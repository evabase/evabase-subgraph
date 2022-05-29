import {
    OrderCancelled,
    OrderCreated,
    OrderExecuted,
    OwnershipTransferred
} from "../generated/NftLimitOrderFlowProxy/NftLimitOrderFlowProxy"
import { FlowEntity, FlowHistory, NftOrder } from "../generated/schema"
import {
    // updateFlow,
    // saveFlow,
    ZERO_BI,
    // FlowFunction,
    saveFlowHistory,
    CREATE,
    UPGRADE,
    CLOSED,
    FAILED,
    SUCCESS,
    NULL_STRING,
} from './helpers'

export function handleOrderCancelled(event: OrderCancelled): void {

}

export function handleOrderCreated(event: OrderCreated): void {
    let flowId = event.params.flowId.toString()
    let entity = FlowEntity.load(flowId)
    if (!entity) {
        entity = new FlowEntity(flowId)
    }
    // let createHash = event.transaction.hash.toHexString()
    // let flowHistory = new FlowHistory(createHash)
    // saveFlowHistory(flowHistory, event, ZERO_BI, CREATE, ZERO_BI, ZERO_BI, NULL_STRING, flowId)
    // entity.details = [flowHistory.id]
    entity.admin = event.params.user.toHexString()
    entity.flowStatus = 0
    entity.flowType = 1

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

    entity.nftOrder = nftOrder.id
    entity.deadline = order.deadline
    entity.save()
}


export function handleOrderExecuted(event: OrderExecuted): void { }

export function handleOwnershipTransferred(event: OwnershipTransferred): void { }
