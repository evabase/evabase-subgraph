import { BigInt } from '@graphprotocol/graph-ts'
import {
    EvaFlowController,
    FlowClosed,
    FlowCreated,
    FlowExecuteFailed,
    FlowExecuteSuccess,
} from "../generated/EvaFlowController/EvaFlowController"
import { Erc20Order, FlowEntity, FlowHistory, NftOrder, TaskOrder } from "../generated/schema"
import {
    ACTIVE, checkFlowEntityExists, CLOSED_ACTION, CREATE_ACTION, ERC20,
    EXPIRED, FAILED_ACTION, saveFlowHistory, SUCCESS, SUCCESS_ACTION, ZERO_BI, CANCELED, handSuccessAndFailedEvent, NFT, TASK
} from "./helpers"

/**
 * 创建flow
 * @param event flow 创建事件
 */
export function handleFlowCreated(event: FlowCreated): void {
    let flowId = event.params.flowId.toString()
    let entity = checkFlowEntityExists(flowId)
    let checkData = event.params.checkData.toHexString()

    if (NftOrder.load(flowId)) {
        entity.nftOrder = NftOrder.load(flowId)!.id
        entity.flowType = NFT
        entity.deadline = NftOrder.load(flowId)!.deadline
    }
    if (TaskOrder.load(flowId)) {
        entity.taskOrder = TaskOrder.load(flowId)!.id
        entity.flowType = TASK
        entity.deadline = TaskOrder.load(flowId)!.deadline
    }
    if (Erc20Order.load(checkData)) {
        entity.erc20Order = Erc20Order.load(checkData)!.id
        entity.flowType = ERC20
        entity.deadline = Erc20Order.load(checkData)!.deadline
    }

    let createHash = event.transaction.hash.toHexString()
    let index = event.logIndex
    let flowHistory = new FlowHistory(createHash + "#" + index.toString())
    let blockIime = event.block.timestamp
    let from = event.transaction.from.toHexString()
    saveFlowHistory(flowHistory, entity, ZERO_BI, CREATE_ACTION, ZERO_BI, ZERO_BI, flowId, createHash, true, blockIime, from)
    entity.details = [flowHistory.id]

    let contract = EvaFlowController.bind(event.address)
    let result = contract.getFlowMetas(BigInt.fromString(flowId))

    entity.flowStatus = ACTIVE
    entity.admin = event.params.user.toHexString()
    entity.flowName = result.flowName
    entity.gasFees = ZERO_BI
    entity.blockTime = entity.blockTime
    entity.blockNumber = entity.blockNumber
    entity.save()

}

export function handleFlowClosed(event: FlowClosed): void {
    let flowId = event.params.flowId.toString()
    let entity = FlowEntity.load(flowId)

    if (entity) {
        entity.flowStatus = SUCCESS

        let createHash = event.transaction.hash.toHexString()
        let index = event.logIndex
        let flowHistory = new FlowHistory(createHash + "#" + index.toString())
        let blockIime = event.block.timestamp
        let from = event.transaction.from.toHexString()
        saveFlowHistory(flowHistory, entity, ZERO_BI, CLOSED_ACTION, ZERO_BI, ZERO_BI, flowId, createHash, true, blockIime, from)

        let newdetails = entity.details
        if (newdetails) {
            newdetails.push(flowHistory.id)
            entity.details = newdetails
        }

        let isDeadline = entity.get("deadline")
        if (isDeadline) {
            let deadlineEntity = entity.deadline
            let blockTime = event.block.timestamp

            let input = event.transaction.input
            if (input.toHexString().substr(0, 10).toLowerCase() == "0x7bbaf1ea".toLowerCase()) {
                let blockNumber = event.block.number
                entity.closeStatus = EXPIRED
                let oldBlockNumber = entity.get("blockNumber")
                if (oldBlockNumber) {
                    if (entity.blockNumber == blockNumber) {
                        entity.closeStatus = SUCCESS
                    }
                }
            } else if (input.toHexString().substr(0, 10).toLowerCase() == "0x1b0f7ba9".toLowerCase()) {
                entity.closeStatus = CANCELED
            } else {
                if (deadlineEntity! < blockTime) {
                    entity.closeStatus = CANCELED
                } else {
                    entity.closeStatus = SUCCESS
                }
            }
        }
        entity.save()
    }
}

export function handleFlowExecuteFailed(event: FlowExecuteFailed): void {
    let flowId = event.params.flowId.toString()
    let fee = event.params.gasUsed
    let ethGasFee = event.params.payAmountByETH
    let evaGasFee = event.params.payAmountByFeeToken
    let hash = event.transaction.hash.toHexString()
    let index = event.logIndex
    let reason = event.params.reason
    let blockIime = event.block.timestamp
    let from = event.transaction.from.toHexString()
    let blockNumber = event.block.number
    handSuccessAndFailedEvent(flowId, hash, index, FAILED_ACTION, reason, false, fee, ethGasFee, evaGasFee, blockIime, from, blockNumber)
}

export function handleFlowExecuteSuccess(event: FlowExecuteSuccess): void {
    let flowId = event.params.flowId.toString()
    let fee = event.params.gasUsed
    let ethGasFee = event.params.payAmountByETH
    let evaGasFee = event.params.payAmountByFeeToken
    let hash = event.transaction.hash.toHexString()
    let index = event.logIndex
    let reason = ""
    let blockIime = event.block.timestamp
    let from = event.transaction.from.toHexString()
    let blockNumber = event.block.number
    handSuccessAndFailedEvent(flowId, hash, index, SUCCESS_ACTION, reason, true, fee, ethGasFee, evaGasFee, blockIime, from, blockNumber)
}

