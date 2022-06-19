import { BigInt, Address, Bytes } from '@graphprotocol/graph-ts'
import {
    EvaFlowController,
    FlowClosed,
    FlowCreated,
    FlowExecuteFailed,
    FlowExecuteSuccess,
} from "../generated/EvaFlowController/EvaFlowController"
import { LOBExchange } from '../generated/LOBExchange/LOBExchange'
import { Erc20Order, FlowEntity, FlowHistory } from "../generated/schema"
import {
    ACTIVE, checkFlowEntityExists, CLOSED_ACTION, CREATE_ACTION, ERC20,
    evaFlowController, EXPIRED, FAILED_ACTION, lobBExchange, saveFlowHistory, SUCCESS, SUCCESS_ACTION, ZERO_BI, CANCELED, handSuccessAndFailedEvent
} from "./helpers"

/**
 * 创建flow
 * @param event flow 创建事件
 */
export function handleFlowCreated(event: FlowCreated): void {
    let flowId = event.params.flowId.toString()
    let entity = checkFlowEntityExists(flowId)

    // 获取erc20 相关数据
    let contract = EvaFlowController.bind(Address.fromString(evaFlowController))
    let result = contract.getFlowMetas(BigInt.fromString(flowId))

    let checkData = event.params.checkData
    let lastVersion = result.lastVersionflow.toHexString()
    if (lastVersion.toLowerCase() == lobBExchange.toLowerCase()) {
        let lobContract = LOBExchange.bind(Address.fromString(lobBExchange))
        let orderInfo = lobContract.getOrderInfo(Bytes.fromByteArray(checkData))
        if (orderInfo) {

            let erc20Order = new Erc20Order(flowId)
            erc20Order.owner = orderInfo.value0.owner.toHexString()
            erc20Order.inputAmount = orderInfo.value0.inputAmount
            erc20Order.inputToken = orderInfo.value0.inputToken.toHexString()
            erc20Order.minRate = orderInfo.value0.minRate
            erc20Order.outputToken = orderInfo.value0.outputToken.toHexString()
            erc20Order.deadline = orderInfo.value0.deadline
            erc20Order.receiptor = orderInfo.value0.receiptor.toHexString()
            erc20Order.minInputPer = orderInfo.value0.minInputPer
            entity.blockTime = event.block.timestamp
            erc20Order.blockTime = event.block.timestamp
            erc20Order.save()

            entity.flowType = ERC20
            entity.deadline = orderInfo.value0.deadline
            entity.erc20Order = erc20Order.id
        }
    }

    let createHash = event.transaction.hash.toHexString()
    let index = event.logIndex
    let flowHistory = new FlowHistory(createHash + index.toString())
    let blockIime = event.block.timestamp
    let from = event.transaction.from.toHexString()
    saveFlowHistory(flowHistory, entity, ZERO_BI, CREATE_ACTION, ZERO_BI, ZERO_BI, flowId, createHash, true, blockIime, from)

    entity.details = [flowHistory.id]
    entity.flowName = result.flowName
    entity.flowStatus = ACTIVE
    entity.admin = event.params.user.toHexString()
    entity.gasFees = ZERO_BI
    entity.save()
}

export function handleFlowClosed(event: FlowClosed): void {
    let flowId = event.params.flowId.toString()
    let entity = FlowEntity.load(flowId)

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (entity) {
        let contract = EvaFlowController.bind(Address.fromString(evaFlowController))
        let result = contract.getFlowMetas(BigInt.fromString(flowId))
        if (result.flowStatus > 0) {
            entity.flowStatus = SUCCESS
        } else {
            entity.flowStatus = ACTIVE
        }

        let createHash = event.transaction.hash.toHexString()
        let index = event.logIndex
        let flowHistory = new FlowHistory(createHash + index.toString())
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
                if (deadlineEntity < blockTime) {
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

