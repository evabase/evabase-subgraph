import { BigInt } from "@graphprotocol/graph-ts"
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
import { FlowEntity } from "../generated/schema"
import {
  updateFlow,
  saveFlow,
  ZERO_BI,
  FlowFunction
} from './helpers'

export function handleFlowCreated(event: FlowCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // let entity = FlowEntity.load(event.transaction.from.toHex())
  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new FlowEntity(flowId)

    // Entity fields can be set using simple assignments
  }

  // BigInt and BigDecimal math are supported

  // Entity fields can be set based on event parameters
  entity.admin = event.params.user.toHexString()
  entity.checkData = event.params.checkData

  saveFlow(entity)

}

export function handleFlowDestroyed(event: FlowDestroyed): void {
  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new FlowEntity(flowId)

    // Entity fields can be set using simple assignments
  }
  updateFlow(entity,FlowFunction.FlowDestroyed)

}

export function handleFlowExecuteFailed(event: FlowExecuteFailed): void {
  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    updateFlow(entity,FlowFunction.FlowExecuteFailed)
  }
}

export function handleFlowExecuteSuccess(event: FlowExecuteSuccess): void {

  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    updateFlow(entity,FlowFunction.FlowExecuteSuccess)
  }
  
}

export function handleFlowPaused(event: FlowPaused): void {
  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    updateFlow(entity,FlowFunction.FlowPaused)
  }
}

export function handleFlowStart(event: FlowStart): void {
  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    updateFlow(entity,FlowFunction.FlowStart)
  }
}

export function handleFlowUpdated(event: FlowUpdated): void {
  let flowId= event.params.flowId.toString()
  let entity = FlowEntity.load(flowId)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    updateFlow(entity,FlowFunction.FlowStart)
  }
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleSetMinConfig(event: SetMinConfig): void {}
