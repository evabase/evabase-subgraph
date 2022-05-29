import { 
    OwnershipTransferred,
    TaskCancelled, 
    TaskCreated, 
    TaskExecuted } from "../generated/OpsFlowProxy/OpsFlowProxy"
import { FlowEntity, TaskOrder } from "../generated/schema"

export function handleTaskCancelled(event: TaskCancelled): void {}
export function handleTaskCreated(event: TaskCreated): void {
    let flowId = event.params.flowId.toString()
    let entity = FlowEntity.load(flowId)
    if (!entity) {
        entity = new FlowEntity(flowId)
    }
    // let createHash = event.transaction.hash.toHexString()
    // let flowHistory = new FlowHistory(createHash)
    // saveFlowHistory(flowHistory, event, ZERO_BI, CREATE, ZERO_BI, ZERO_BI, NULL_STRING, flowId)
    // entity.details = [flowHistory.id]
    entity.admin = event.params.user.toHexString()
    // entity.input = event.transaction.input
    entity.flowStatus = 0
    entity.flowType = 3 // task is 3

    let taskOrder = new TaskOrder(flowId)
    let task = event.params.task
    taskOrder.owner = task.owner.toHexString()
    
    taskOrder.input = task.inputs
    taskOrder.startTime = task.startTime
    taskOrder.deadline = task.deadline
    taskOrder.lastExecTime = task.lastExecTime
    taskOrder.interval = task.interval
    taskOrder.blockTIme = event.block.timestamp
    taskOrder.save()

    entity.taskOrder = taskOrder.id
    entity.deadline = task.deadline
    entity.save()
}
export function handleTaskExecuted(event: TaskExecuted): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
