import { BigInt ,ethereum} from "@graphprotocol/graph-ts"
import {
  EvaFlowController,
  FlowClosed,
  FlowCreated,
  FlowExecuteFailed,
  FlowExecuteSuccess,
  FlowUpdated,
  OwnershipTransferred,
  SetMinConfig
} from "../generated/EvaFlowController/EvaFlowController"
import { FlowEntity,FlowHistory } from "../generated/schema"
import {
  updateFlow,
  saveFlow,
  ZERO_BI,
  FlowFunction,
  saveFlowHistory,
  CREATE,
  UPGRADE,
  CLOSED,
  FAILED,
  SUCCESS
} from './helpers'

export function handleFlowCreated(event: FlowCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // let entity = FlowEntity.load(event.transaction.from.toHex())
  let flowId= event.params.flowId.toString()
//   let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  let entity = new FlowEntity(flowId)
  let createHash = event.transaction.hash.toHexString()
  let flowHistory =  new FlowHistory(createHash)
  saveFlowHistory(flowHistory,event,ZERO_BI,CREATE,ZERO_BI,ZERO_BI,flowId)
  entity.details = [flowHistory.id]
  // Entity fields can be set based on event parameters
  entity.admin = event.params.user.toHexString()
  entity.input = event.transaction.input
  saveFlow(entity)

}

export function handleFlowClosed(event: FlowClosed): void {
  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    let flowHistoryId = event.transaction.hash.toHexString()
    let flowHistory =  new FlowHistory(flowHistoryId)
    saveFlowHistory(flowHistory,event,ZERO_BI,CLOSED,ZERO_BI,ZERO_BI,flowId)
    let newdetails = entity.details
    newdetails.push(flowHistory.id)
    entity.details = newdetails
    updateFlow(entity,FlowFunction.FlowDestroyed)
  }
}

export function handleFlowExecuteFailed(event: FlowExecuteFailed): void {
  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    let flowHistoryId = event.transaction.hash.toHexString()
    let flowHistory = new FlowHistory(flowHistoryId)
    flowHistory.success = false
    flowHistory.failedReason = event.params.reason
    saveFlowHistory(flowHistory,event,event.params.gasUsed,FAILED,event.params.payAmountByETH,event.params.payAmountByFeeToken,flowId)
    let newdetails = entity.details
    newdetails.push(flowHistory.id)
    entity.details = newdetails
    updateFlow(entity,FlowFunction.FlowExecuteFailed)
  }
}

export function handleFlowExecuteSuccess(event: FlowExecuteSuccess): void {

  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    let flowHistoryId = event.transaction.hash.toHexString()
    let flowHistory = new FlowHistory(flowHistoryId)
    flowHistory.success = true
    saveFlowHistory(flowHistory,event,event.params.gasUsed,SUCCESS,event.params.payAmountByETH,event.params.payAmountByFeeToken,flowId)
    let newdetails = entity.details
    newdetails.push(flowHistory.id)
    entity.details = newdetails
    updateFlow(entity,FlowFunction.FlowExecuteSuccess)
  }
  
}

export function handleFlowUpdated(event: FlowUpdated): void {
  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    let flowHistoryId = event.transaction.hash.toHexString()
    let flowHistory =  new FlowHistory(flowHistoryId)
    saveFlowHistory(flowHistory,event,ZERO_BI,UPGRADE,ZERO_BI,ZERO_BI,flowId)
    let newdetails = entity.details
    newdetails.push(flowHistory.id)
    entity.details = newdetails
    updateFlow(entity,FlowFunction.FlowUpdated)
  }
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleSetMinConfig(event: SetMinConfig): void {}
