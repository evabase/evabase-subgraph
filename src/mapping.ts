import { log, BigInt, BigDecimal, Address, Bytes, ethereum, ByteArray } from '@graphprotocol/graph-ts'
import {
    EvaFlowController,
    FlowClosed,
    FlowCreated,
    FlowExecuteFailed,
    FlowExecuteSuccess,
    FlowOperatorChanged,
    FlowUpdated,
    OwnershipTransferred,
    SetMinConfig
} from "../generated/EvaFlowController/EvaFlowController"
import { LOBExchange } from '../generated/LOBExchange/LOBExchange'
import { Erc20Order, FlowEntity } from "../generated/schema"
import { EVAFLOW_CONTROLLER_ADDRESS, LOB_EXCHANGE_ADDRESS } from "./helpers"

export function handleFlowClosed(event: FlowClosed): void { }

export function handleFlowCreated(event: FlowCreated): void {
    let flowId = event.params.flowId.toString()
    let entity = FlowEntity.load(flowId)
    if (!entity) {
        entity = new FlowEntity(flowId)
    }
    let contract = EvaFlowController.bind(Address.fromString(EVAFLOW_CONTROLLER_ADDRESS))
    let result = contract.getFlowMetas(BigInt.fromString(flowId))

   
    let checkData = event.params.checkData
    entity.input = checkData

    let lobContract = LOBExchange.bind(Address.fromString(LOB_EXCHANGE_ADDRESS))
    let orderInfo = lobContract.try_getOrderInfo(Bytes.fromHexString(checkData.toHexString().slice(2)))
    if (orderInfo.value) {
        entity.flowType = 2 // erc20 is 2
        let erc20Order = new Erc20Order(flowId)
        erc20Order.owner = orderInfo.value.value0.owner.toHexString()
        erc20Order.inputAmount = orderInfo.value.value0.inputAmount
        erc20Order.inputToken = orderInfo.value.value0.inputToken.toHexString()
        erc20Order.minRate = orderInfo.value.value0.minRate
        erc20Order.outputToken = orderInfo.value.value0.outputToken.toHexString()
        erc20Order.deadline = orderInfo.value.value0.deadline
        erc20Order.receiptor = orderInfo.value.value0.receiptor.toHexString()
        erc20Order.minInputPer = orderInfo.value.value0.minInputPer
        erc20Order.save
        entity.erc20Order = erc20Order.id

    }


    entity.flowName = result.flowName
    entity.flowStatus = 0
    entity.admin = event.params.user.toHexString()
    entity.save()
}

export function handleFlowExecuteFailed(event: FlowExecuteFailed): void { }
export function handleFlowExecuteSuccess(event: FlowExecuteSuccess): void { }
export function handleFlowUpdated(event: FlowUpdated): void { }
