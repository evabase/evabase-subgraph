import { BigInt ,ethereum} from "@graphprotocol/graph-ts"
import {
  EvaFlowController,
  FlowCreated,
  FlowDestroyed,
  FlowExecuteFailed,
  FlowExecuteSuccess,
  FlowPaused,
  FlowStart,
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
  DESTROY,
  EXECUTE,
  PAUSE,
  UPGRADE,
  RESTART
} from './helpers'

export function handleFlowCreated(event: FlowCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // let entity = FlowEntity.load(event.transaction.from.toHex())
  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  entity = new FlowEntity(flowId)
  let flowHistoryId = event.transaction.hash.toHexString()
  let flowHistory =  new FlowHistory(flowHistoryId)
  saveFlowHistory(flowHistory,event,ZERO_BI,CREATE,ZERO_BI,ZERO_BI)
  entity.details = [flowHistory.id]
  // Entity fields can be set based on event parameters
  entity.admin = event.params.user.toHexString()
  entity.input = event.transaction.input
  saveFlow(entity)

}

export function handleFlowDestroyed(event: FlowDestroyed): void {
  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    let flowHistoryId = event.transaction.hash.toHexString()
    let flowHistory =  new FlowHistory(flowHistoryId)
    saveFlowHistory(flowHistory,event,ZERO_BI,DESTROY,ZERO_BI,ZERO_BI)
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
    saveFlowHistory(flowHistory,event,event.params.gasUsed,EXECUTE,event.params.payAmountByETH,event.params.payAmountByFeeToken)
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
    saveFlowHistory(flowHistory,event,event.params.gasUsed,EXECUTE,event.params.payAmountByETH,event.params.payAmountByFeeToken)
    let newdetails = entity.details
    newdetails.push(flowHistory.id)
    entity.details = newdetails
    updateFlow(entity,FlowFunction.FlowExecuteSuccess)
  }
  
}

export function handleFlowPaused(event: FlowPaused): void {
  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    let flowHistoryId = event.transaction.hash.toHexString()
    let flowHistory =  new FlowHistory(flowHistoryId)
    saveFlowHistory(flowHistory,event,ZERO_BI,PAUSE,ZERO_BI,ZERO_BI)
    let newdetails = entity.details
    newdetails.push(flowHistory.id)
    entity.details = newdetails
    updateFlow(entity,FlowFunction.FlowPaused)
  }
}

export function handleFlowStart(event: FlowStart): void {
  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    let flowHistoryId = event.transaction.hash.toHexString()
    let flowHistory =  new FlowHistory(flowHistoryId)
    saveFlowHistory(flowHistory,event,ZERO_BI,RESTART,ZERO_BI,ZERO_BI)
    let newdetails = entity.details
    newdetails.push(flowHistory.id)
    entity.details = newdetails
    updateFlow(entity,FlowFunction.FlowStart)
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
    saveFlowHistory(flowHistory,event,ZERO_BI,UPGRADE,ZERO_BI,ZERO_BI)
    let newdetails = entity.details
    newdetails.push(flowHistory.id)
    entity.details = newdetails
    updateFlow(entity,FlowFunction.FlowUpdated)
  }
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleSetMinConfig(event: SetMinConfig): void {}
