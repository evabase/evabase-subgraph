import { TaskCreated } from "../generated/OpsFlowProxy/OpsFlowProxy"
import { TaskOrder } from "../generated/schema"
import { ACTIVE, checkFlowEntityExists, TASK } from "./helpers"

/**
 * 
 * @param event 函数创建事件
 */
export function handleTaskCreated(event: TaskCreated): void {
    let flowId = event.params.flowId.toString()
    let entity = checkFlowEntityExists(flowId)

    let taskOrder = new TaskOrder(flowId)
    let task = event.params.task

    taskOrder.owner = task.owner.toHexString()
    taskOrder.input = task.inputs
    taskOrder.startTime = task.startTime
    taskOrder.deadline = task.deadline
    taskOrder.lastExecTime = task.lastExecTime
    taskOrder.interval = task.interval
    taskOrder.blockTime = event.block.timestamp
    entity.blockTime = event.block.timestamp
    taskOrder.save()

    entity.admin = event.params.user.toHexString()
    entity.flowStatus = ACTIVE
    entity.flowType = TASK
    entity.taskOrder = taskOrder.id
    entity.deadline = task.deadline
    entity.save()
}
