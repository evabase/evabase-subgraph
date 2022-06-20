/* eslint-disable prefer-const */
import { BigInt, BigDecimal, ethereum, Address } from '@graphprotocol/graph-ts'
import { EvaFlowController } from '../generated/EvaFlowController/EvaFlowController'
import { FlowEntity, FlowHistory } from "../generated/schema"


export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export const evaFlowController = '0x7eA10f2840c8B6E734697D998043653C25139C47'
export const lobBExchange = '0x548C85Eb46d6A318731a97047243Cced24179066'
export const opsFlowProxy = '0xeb921673666678c8648A0aAa3fC15Ad7EC51bfB8'
export const nftLimitOrderFlow = '0xB011B927Cb38F2433164562283aeD25C59794F7B'
export const evaFlowStatusUpkeep = "0xFaBbf45C33d41eF1a41d687d43F4b0B3ec89eeC1"

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

enum TokenStatus {
  OriginalOwner,
  SecondOwner,
  ThirdOwner
}


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
  let contract = EvaFlowController.bind(Address.fromString(evaFlowController))
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
        flowHistory.content = 'Create NFT Order '
      }
      if (type == ERC20) {
        flowHistory.content = 'Create ERC20 Limit Order'
      }
      if (type == TASK) {
        flowHistory.content = 'Create Task'
      }
    } else if (action == SUCCESS_ACTION) {
      if (type == NFT) {
        flowHistory.content = 'Buy NFT Item'
      }
      if (type == ERC20) {
        flowHistory.content = 'Buy Token'
      }
      if (type == TASK) {
        flowHistory.content = 'Execute Task'
      }
    } else if (action == FAILED_ACTION) {
      if (type == NFT) {
        flowHistory.content = 'Buy NFT Item'
      }
      if (type == ERC20) {
        flowHistory.content = 'Buy Token'
      }
      if (type == TASK) {
        flowHistory.content = 'Execute Task'
      }
    } else if (action == CLOSED_ACTION) {
      flowHistory.content = 'Close Flow'
    }
  }
  flowHistory.save()
}

export function handSuccessAndFailedEvent(flowId: string, hash: string, index: BigInt, action: string,
  failedReason: string, success: boolean, fee: BigInt, ethGasFee: BigInt,
  evaGasFee: BigInt, blockTime: BigInt, from: string, blockNumber: BigInt): void {
  let entity = FlowEntity.load(flowId)
  if (entity) {
    let flowHistory = new FlowHistory(hash + index.toString())

    flowHistory.failedReason = failedReason
    saveFlowHistory(flowHistory, entity, fee, action, ethGasFee, evaGasFee, flowId, hash, success, blockTime, from)

    let newdetails = entity.details
    if (newdetails) {
      newdetails.push(flowHistory.id)
      entity.details = newdetails
    }

    entity.flowStatus = getFlowStatus(flowId)
    let gasFee = entity.gasFees;
    if (gasFee) {
      let allGas = gasFee.plus(ethGasFee)
      entity.gasFees = allGas
    }
    entity.blockNumber = blockNumber
    entity.save()
  }
}
