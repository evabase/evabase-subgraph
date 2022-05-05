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
  saveFlow,
  ZERO_BI,
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
  

  
  


  

  // Entities can be written to the store with `.save()`
  // entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.MAX_INT(...)
  // - contract.config(...)
  // - contract.evaSafesFactory(...)
  // - contract.getAllVaildFlowSize(...)
  // - contract.getFlowCheckInfo(...)
  // - contract.getFlowMetaSize(...)
  // - contract.getFlowMetas(...)
  // - contract.getIndexVaildFlow(...)
  // - contract.getSafes(...)
  // - contract.getVaildFlowRange(...)
  // - contract.isValidFlow(...)
  // - contract.minConfig(...)
  // - contract.owner(...)
  // - contract.paymentEthAmount(...)
  // - contract.paymentGasAmount(...)
  // - contract.userMetaMap(...)
}

export function handleFlowDestroyed(event: FlowDestroyed): void {}

export function handleFlowExecuteFailed(event: FlowExecuteFailed): void {}

export function handleFlowExecuteSuccess(event: FlowExecuteSuccess): void {}

export function handleFlowPaused(event: FlowPaused): void {}

export function handleFlowStart(event: FlowStart): void {}

export function handleFlowUpdated(event: FlowUpdated): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleSetMinConfig(event: SetMinConfig): void {}
