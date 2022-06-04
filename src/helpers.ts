/* eslint-disable prefer-const */
import { BigInt, BigDecimal, ethereum, Address } from '@graphprotocol/graph-ts'
import { EvaFlowController } from '../generated/EvaFlowController/EvaFlowController'
import { FlowEntity, FlowHistory } from "../generated/schema"


export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export const EVAFLOW_CONTROLLER_ADDRESS = '0xd4a2660d53F757f91E730Db3727cD24E57106f47'
export const LOB_EXCHANGE_ADDRESS = '0xbE91fEFD8d3d1AD0A10aD38934e061A97ac3071e'
export const OPS_FLOW_PROXY_ADDRESS = '0x109826584d852830fBef626Abd5BCC5aD6237C7f'
export const NFT_LIMIT__ADDRESS = '0xF2D0Ed1914543d3D22B3b770CBF8A183C7Bc4a8f'


export let ZERO = 0
export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let NULL_STRING = ''
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)
export let CREATE_ACTION = '1'
export let UPGRADE_ACTION = '2'
export let SUCCESS_ACTION = '3'
export let FAILED_ACTION = '4'
export let CLOSED_ACTION = '5'

export let ACTIVE = 'Active'
export let SUCCESS = 'Success'
export let EXPIRED = 'Expired'

export let NFT = 'NFT'
export let ERC20 = 'ERC20'
export let TASK = 'TASK'


/**
 * 检查是否已经创建flowEntity 如果没有则创建一个新的flowEntity
 * @param flowId 
 * @returns 
 */
export function checkFlowEntityExists(flowId: string): FlowEntity {
  let entity = FlowEntity.load(flowId)
  if (!entity) {
    entity = new FlowEntity(flowId)
  }
  return entity
}

/**
 * 获取flow状态
 * @param flowId 
 * @returns 
 */
export function getFlowStatus(flowId: string): string {
  let contract = EvaFlowController.bind(Address.fromString(EVAFLOW_CONTROLLER_ADDRESS))
  let result = contract.getFlowMetas(BigInt.fromString(flowId))
  if (result.flowStatus > 0) {
    return SUCCESS
  } else {
    return ACTIVE
  }
}

/**
 * 保存FlowHistory详细信息
 * @param flowHistory 
 * @param flowEntity 
 * @param event 
 * @param fee 
 * @param action 
 * @param ethGasFee 
 * @param evaGasFee 
 * @param flowId 
 * @param txHash 
 * @param success 
 */
export function saveFlowHistory(flowHistory: FlowHistory, flowEntity: FlowEntity,
  event: ethereum.Event,
  fee: BigInt,
  action: string,
  ethGasFee: BigInt,
  evaGasFee: BigInt,
  flowId: string,
  txHash: string,
  success: boolean
): void {

  flowHistory.gasUsed = fee
  flowHistory.blockTime = event.block.timestamp
  flowHistory.action = action
  flowHistory.from = event.transaction.from.toHexString()
  flowHistory.ethGasFee = ethGasFee
  flowHistory.evaGasFee = evaGasFee
  flowHistory.flowId = flowId
  flowHistory.txHash = txHash
  flowHistory.success = success

  let isFlowType = flowEntity.get('flowType');
  if (isFlowType) {
    let type = flowEntity.flowType

    if (action == CREATE_ACTION) {
      if (type == NFT) {
        flowHistory.content = 'nft order create'
      }
      if (type == ERC20) {
        flowHistory.content = 'erc20 order create'
      }
      if (type == TASK) {
        flowHistory.content = 'task create'
      }

    } else if (action == SUCCESS_ACTION) {
      if (action == CREATE_ACTION) {
        if (type == NFT) {
          flowHistory.content = 'buy NFT item'
        }
        if (type == ERC20) {
          flowHistory.content = 'buy token'
        }
        if (type == TASK) {
          flowHistory.content = 'do task'
        }
      } else if (action == FAILED_ACTION) {
        if (action == CREATE_ACTION) {
          if (type == NFT) {
            flowHistory.content = 'buy NFT item'
          }
          if (type == ERC20) {
            flowHistory.content = 'buy token'
          }
          if (type == TASK) {
            flowHistory.content = 'do task'
          }
        }
      } else if (action == CLOSED_ACTION) {
        flowHistory.content = 'flow close'
      }
    }
  }
  flowHistory.save()
}
