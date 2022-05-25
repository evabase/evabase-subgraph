import {
    ConfigChanged,
    OrderCancelled,
    OrderCreated,
    OrderExecuted,
    OwnershipTransferred,
    StrategyChanged
} from "../generated/LOBExchange/LOBExchange"

export function handleOrderCancelled(event: OrderCancelled): void {}

export function handleOrderCreated(event: OrderCreated): void { 
    
    

}
export function handleOrderExecuted(event: OrderExecuted): void {}

export function handleConfigChanged(event: ConfigChanged): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleStrategyChanged(event: StrategyChanged): void {}
