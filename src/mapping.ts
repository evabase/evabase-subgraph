import { log, BigInt, BigDecimal, Address, Bytes, ethereum, ByteArray } from '@graphprotocol/graph-ts'
import {
    EvaFlowController,
    FlowClosed,
    FlowCreated,
    FlowExecuteFailed,
    FlowExecuteSuccess,
    FlowUpdated
} from "../generated/EvaFlowController/EvaFlowController"
import { LOBExchange } from '../generated/LOBExchange/LOBExchange'
import { Erc20Order, FlowEntity, FlowHistory } from "../generated/schema"
import { CLOSED, CREATE, EVAFLOW_CONTROLLER_ADDRESS, FAILED, LOB_EXCHANGE_ADDRESS, saveFlowHistory, SUCCESS, ZERO, ZERO_BI } from "./helpers"

export function handleFlowClosed(event: FlowClosed): void {
    let flowId = event.params.flowId.toString()
    let entity = FlowEntity.load(flowId)

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (entity) {
        let contract = EvaFlowController.bind(Address.fromString(EVAFLOW_CONTROLLER_ADDRESS))
        let result = contract.getFlowMetas(BigInt.fromString(flowId))
        if (result.flowStatus > 0) {
            entity.flowStatus = 1
        } else {
            entity.flowStatus = 0
        }

        let createHash = event.transaction.hash.toHexString()
        let index = event.transaction.index
        let flowHistory = new FlowHistory(createHash + index.toString())
        flowHistory.txHash = createHash
        flowHistory.success = true
        saveFlowHistory(flowHistory, entity, event, ZERO_BI, CLOSED, ZERO_BI, ZERO_BI, flowId)
        
        let newdetails = entity.details
        if (newdetails) {
            newdetails.push(flowHistory.id)
            entity.details = newdetails
        }
        // let detail = entity.details;
        // if (detail && detail.length == 0) {
        //     entity.closeStatus = 2
        // } else {
        //     entity.closeStatus = 1
        // }
        entity.save()
    }
}

export function handleFlowCreated(event: FlowCreated): void {
    let flowId = event.params.flowId.toString()
    let entity = FlowEntity.load(flowId)
    if (!entity) {
        entity = new FlowEntity(flowId)
    }
    let contract = EvaFlowController.bind(Address.fromString(EVAFLOW_CONTROLLER_ADDRESS))
    let result = contract.getFlowMetas(BigInt.fromString(flowId))


    let checkData = event.params.checkData
    let lastVersion = result.lastVersionflow.toHexString()
    if (lastVersion.toLowerCase() == LOB_EXCHANGE_ADDRESS.toLowerCase()) {
        let lobContract = LOBExchange.bind(Address.fromString(LOB_EXCHANGE_ADDRESS))
        let orderInfo = lobContract.getOrderInfo(Bytes.fromByteArray(checkData))
        if (orderInfo) {
            entity.flowType = 2 // erc20 is 2
            let erc20Order = new Erc20Order(flowId)
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
            entity.erc20Order = erc20Order.id
        }
    }

    let createHash = event.transaction.hash.toHexString()
    let index = event.transaction.index
    let flowHistory = new FlowHistory(createHash + index.toString())
    flowHistory.txHash = createHash
    flowHistory.success = true
    saveFlowHistory(flowHistory, entity, event, ZERO_BI, CREATE, ZERO_BI, ZERO_BI, flowId)
    entity.details = [flowHistory.id]

    entity.flowName = result.flowName
    entity.flowStatus = 0
    entity.admin = event.params.user.toHexString()
    entity.gasFees = ZERO_BI
    entity.save()
}

export function handleFlowExecuteFailed(event: FlowExecuteFailed): void {
    let flowId = event.params.flowId.toString()
    let entity = FlowEntity.load(flowId)

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (entity) {
        let flowHistoryId = event.transaction.hash.toHexString()
        let index = event.transaction.index
        let flowHistory = new FlowHistory(flowHistoryId + index.toString())
        flowHistory.txHash = flowHistoryId

        flowHistory.success = false
        flowHistory.failedReason = event.params.reason
        saveFlowHistory(flowHistory, entity, event, event.params.gasUsed, FAILED, event.params.payAmountByETH, event.params.payAmountByFeeToken, flowId)

        let newdetails = entity.details
        if (newdetails) {
            newdetails.push(flowHistory.id)
            entity.details = newdetails
        }

        let contract = EvaFlowController.bind(Address.fromString(EVAFLOW_CONTROLLER_ADDRESS))
        let result = contract.getFlowMetas(BigInt.fromString(flowId))
        if (result.flowStatus > 0) {
            entity.flowStatus = 1
        } else {
            entity.flowStatus = 0
        }
        let gasFee = entity.gasFees;
        if (gasFee) {
            let allGas = gasFee.plus(event.params.payAmountByETH)
            entity.gasFees = allGas
        }

        entity.save()
    }
}

export function handleFlowExecuteSuccess(event: FlowExecuteSuccess): void {
    let flowId = event.params.flowId.toString()
    let entity = FlowEntity.load(flowId)

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (entity) {
        let flowHistoryId = event.transaction.hash.toHexString()
        let index = event.transaction.index
        let flowHistory = new FlowHistory(flowHistoryId + index.toString())
        flowHistory.txHash = flowHistoryId
        flowHistory.success = true
        saveFlowHistory(flowHistory, entity, event, event.params.gasUsed, SUCCESS, event.params.payAmountByETH, event.params.payAmountByFeeToken, flowId)
        let newdetails = entity.details
        if (newdetails) {
            newdetails.push(flowHistory.id)
            entity.details = newdetails
        }

        let contract = EvaFlowController.bind(Address.fromString(EVAFLOW_CONTROLLER_ADDRESS))
        let result = contract.getFlowMetas(BigInt.fromString(flowId))
        if (result.flowStatus > 0) {
            entity.flowStatus = 1
        } else {
            entity.flowStatus = 0
        }

        let gasFee = entity.gasFees;
        if (gasFee) {
            let allGas = gasFee.plus(event.params.payAmountByETH)
            entity.gasFees = allGas
        }
        entity.save()
    }
}
export function handleFlowUpdated(event: FlowUpdated): void { }
