import { TaskCreated } from "../generated/OpsFlowProxy/OpsFlowProxy"
import { TaskOrder } from "../generated/schema"

/**
 * 
 * @param event 函数创建事件
 */
export function handleTaskCreated(event: TaskCreated): void {
    let flowId = event.params.flowId.toString()
    let taskOrder = new TaskOrder(flowId)
    let task = event.params.task
    taskOrder.owner = task.owner.toHexString()
    taskOrder.input = task.inputs
    taskOrder.startTime = task.startTime
    taskOrder.deadline = task.deadline
    taskOrder.lastExecTime = task.lastExecTime
    taskOrder.interval = task.interval
    taskOrder.blockTime = event.block.timestamp
    taskOrder.save()
}
