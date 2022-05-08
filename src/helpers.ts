/* eslint-disable prefer-const */
import { log, BigInt, BigDecimal, Address, Bytes,ethereum,ByteArray } from '@graphprotocol/graph-ts'
import { EvaFlowController } from '../generated/EvaFlowController/EvaFlowController'
import { FlowEntity,FlowHistory } from "../generated/schema"


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
    if (result.flowStatus>1) {
      flow.flowStatus = 2
    } else {
      flow.flowStatus = result.flowStatus
    }
   
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
          if (result.flowStatus > 1) {
            flow.flowStatus = 2
          } else {
            flow.flowStatus = result.flowStatus
          }
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

export function saveFlowHistory(flowHistory: FlowHistory, event: ethereum.Event,fee:BigInt): void {
  
  flowHistory.blockTime = event.block.timestamp
  flowHistory.gasUsed = ZERO_BI
  flowHistory.save()

}

export function paraOrderInput(input: Bytes,flowHistory: FlowHistory): void {
  // let decoded =  ethers.utils.AbiCoder.prototype.decode(['address', 'uint8', 'bytes'],input)  
  // const functionInput = input.subarray(4);

  const inputDataHexString = input.toHexString().slice(10); //take away function signature: '0x????????'
  const hexStringToDecode = '0x0000000000000000000000000000000000000000000000000000000000000020' + inputDataHexString; // prepend tuple offset
  let functionInput= Bytes.fromByteArray(Bytes.fromHexString(hexStringToDecode));
  
  
  let origin = ethereum.decode('address,uint8,bytes', functionInput)
  if (origin) {
    let decoded =origin.toTuple()
    let dest = decoded[0]
    let howToCall = decoded[1]
    let calldata = decoded[2]
    flowHistory.orderId = dest.toAddress().toHexString()
    flowHistory.gasUsed = howToCall.toBigInt()
    flowHistory.save ()
  }
  
}

