/* eslint-disable prefer-const */
import { BigInt, BigDecimal } from '@graphprotocol/graph-ts'
import { FlowEntity, FlowHistory } from "../generated/schema"
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
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
export let CANCELED = 'Canceled'

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
  fee: BigInt,
  action: string,
  ethGasFee: BigInt,
  evaGasFee: BigInt,
  flowId: string,
  txHash: string,
  success: boolean,
  blockTime: BigInt,
  from: string
): void {

  flowHistory.gasUsed = fee
  flowHistory.blockTime = blockTime
  flowHistory.action = action
  flowHistory.from = from
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
        flowHistory.content = 'create NFT order'
      }
      if (type == ERC20) {
        flowHistory.content = 'create ERC20 limit order'
      }
      if (type == TASK) {
        flowHistory.content = 'create task'
      }
    } else if (action == SUCCESS_ACTION || action == FAILED_ACTION) {
      if (type == NFT || type == ERC20) {
        flowHistory.content = 'buy'
      }
      if (type == TASK) {
        flowHistory.content = 'execute'
      }
    } else if (action == CLOSED_ACTION) {
      flowHistory.content = 'close flow'
    }
  }
  flowHistory.save()
}

export function handSuccessAndFailedEvent(flowId: string, hash: string, index: BigInt, action: string,
  failedReason: string, success: boolean, fee: BigInt, ethGasFee: BigInt,
  evaGasFee: BigInt, blockTime: BigInt, from: string, blockNumber: BigInt): void {
  let entity = FlowEntity.load(flowId)
  if (entity) {
    let flowHistory = new FlowHistory(hash + "#" + index.toString())
    flowHistory.failedReason = failedReason
    saveFlowHistory(flowHistory, entity, fee, action, ethGasFee, evaGasFee, flowId, hash, success, blockTime, from)

    let newdetails = entity.details
    if (newdetails) {
      newdetails.push(flowHistory.id)
      entity.details = newdetails
    }
    entity.gasFees = entity.gasFees!.plus(ethGasFee)
    entity.blockNumber = blockNumber
    entity.save()
  }
}
