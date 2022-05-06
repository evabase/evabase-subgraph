/* eslint-disable prefer-const */
import { log, BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { EvaFlowController } from '../generated/EvaFlowController/EvaFlowController'
import { FlowEntity } from "../generated/schema"

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const EVAFLOW_CONTROLLER_ADDRESS = '0x93821553172b6A6745eEcB2e90f8c07f2fe24AAb'
export let ZERO= 0
export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

export enum FlowFunction {
  FlowDestroyed,
  FlowExecuteFailed,
  FlowExecuteSuccess,
  FlowPaused,
  FlowStart,
  FlowUpdated,

}

export function bigDecimalExp18(): BigDecimal {
  return BigDecimal.fromString('1000000000000000000')
}


export function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}

export function equalToZero(value: BigDecimal): boolean {
  const formattedVal = parseFloat(value.toString())
  const zero = parseFloat(ZERO_BD.toString())
  if (zero == formattedVal) {
    return true
  }
  return false
}

export function isNullEthValue(value: string): boolean {
  return value == '0x0000000000000000000000000000000000000000000000000000000000000001'
}

export function saveFlow(flow: FlowEntity): void {
  // static definitions overrides

  let contract = EvaFlowController.bind(Address.fromString(EVAFLOW_CONTROLLER_ADDRESS))

  // try types string and bytes32 for symbol
  let result = contract.getFlowMetas(BigInt.fromString(flow.id))
  if (result) {
    flow.flowStatus = result.flowStatus
    flow.keepNetWork = result.keepNetWork
    flow.flowName = result.flowName
    flow.lastKeeper = result.lastKeeper.toHexString()
    flow.lastExecNumber = result.lastExecNumber
    flow.maxVaildBlockNumber = result.maxVaildBlockNumber
    flow.lastVersionflow = result.lastVersionflow.toHexString()
    flow.save()
  }
}

  export function updateFlow(flow: FlowEntity,funType:FlowFunction) : void{
    // static definitions overrides
  
    let contract = EvaFlowController.bind(Address.fromString(EVAFLOW_CONTROLLER_ADDRESS))
  
    // try types string and bytes32 for symbol
    let result = contract.getFlowMetas(BigInt.fromString(flow.id))
    if (result) {
      if (funType == FlowFunction.FlowDestroyed ||
        funType == FlowFunction.FlowPaused ||
        funType == FlowFunction.FlowStart ) { 
        flow.flowStatus = result.flowStatus
        flow.lastExecNumber = result.lastExecNumber
      }
      if (
        funType == FlowFunction.FlowUpdated) {
        flow.flowName = result.flowName
        flow.lastVersionflow = result.lastVersionflow.toHexString()
        
      }

      if (funType == FlowFunction.FlowExecuteFailed ||
        funType == FlowFunction.FlowExecuteSuccess ||
        funType == FlowFunction.FlowUpdated) {
        flow.lastKeeper = result.lastKeeper.toHexString()
        flow.lastExecNumber = result.lastExecNumber
      }

      flow.save()
    }

}

