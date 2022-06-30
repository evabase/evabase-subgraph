// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class TaskCancelled extends ethereum.Event {
  get params(): TaskCancelled__Params {
    return new TaskCancelled__Params(this);
  }
}

export class TaskCancelled__Params {
  _event: TaskCancelled;

  constructor(event: TaskCancelled) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get taskId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class TaskCreated extends ethereum.Event {
  get params(): TaskCreated__Params {
    return new TaskCreated__Params(this);
  }
}

export class TaskCreated__Params {
  _event: TaskCreated;

  constructor(event: TaskCreated) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get flowId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get task(): TaskCreatedTaskStruct {
    return changetype<TaskCreatedTaskStruct>(
      this._event.parameters[2].value.toTuple()
    );
  }
}

export class TaskCreatedTaskStruct extends ethereum.Tuple {
  get owner(): Address {
    return this[0].toAddress();
  }

  get inputs(): Array<Bytes> {
    return this[1].toBytesArray();
  }

  get startTime(): BigInt {
    return this[2].toBigInt();
  }

  get deadline(): BigInt {
    return this[3].toBigInt();
  }

  get lastExecTime(): BigInt {
    return this[4].toBigInt();
  }

  get interval(): BigInt {
    return this[5].toBigInt();
  }
}

export class TaskExecuted extends ethereum.Event {
  get params(): TaskExecuted__Params {
    return new TaskExecuted__Params(this);
  }
}

export class TaskExecuted__Params {
  _event: TaskExecuted;

  constructor(event: TaskExecuted) {
    this._event = event;
  }

  get taskId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class OpsFlowProxy__checkResult {
  value0: boolean;
  value1: Bytes;

  constructor(value0: boolean, value1: Bytes) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromBytes(this.value1));
    return map;
  }
}

export class OpsFlowProxy__getSubCallsResultSubsStruct extends ethereum.Tuple {
  get target(): Address {
    return this[0].toAddress();
  }

  get valueETH(): BigInt {
    return this[1].toBigInt();
  }

  get data(): Bytes {
    return this[2].toBytes();
  }
}

export class OpsFlowProxy__getTaskResultTaskStruct extends ethereum.Tuple {
  get owner(): Address {
    return this[0].toAddress();
  }

  get inputs(): Array<Bytes> {
    return this[1].toBytesArray();
  }

  get startTime(): BigInt {
    return this[2].toBigInt();
  }

  get deadline(): BigInt {
    return this[3].toBigInt();
  }

  get lastExecTime(): BigInt {
    return this[4].toBigInt();
  }

  get interval(): BigInt {
    return this[5].toBigInt();
  }
}

export class OpsFlowProxy extends ethereum.SmartContract {
  static bind(address: Address): OpsFlowProxy {
    return new OpsFlowProxy("OpsFlowProxy", address);
  }

  check(taskIdData: Bytes): OpsFlowProxy__checkResult {
    let result = super.call("check", "check(bytes):(bool,bytes)", [
      ethereum.Value.fromBytes(taskIdData)
    ]);

    return new OpsFlowProxy__checkResult(
      result[0].toBoolean(),
      result[1].toBytes()
    );
  }

  try_check(taskIdData: Bytes): ethereum.CallResult<OpsFlowProxy__checkResult> {
    let result = super.tryCall("check", "check(bytes):(bool,bytes)", [
      ethereum.Value.fromBytes(taskIdData)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new OpsFlowProxy__checkResult(value[0].toBoolean(), value[1].toBytes())
    );
  }

  config(): Address {
    let result = super.call("config", "config():(address)", []);

    return result[0].toAddress();
  }

  try_config(): ethereum.CallResult<Address> {
    let result = super.tryCall("config", "config():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  evaSafesFactory(): Address {
    let result = super.call(
      "evaSafesFactory",
      "evaSafesFactory():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_evaSafesFactory(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "evaSafesFactory",
      "evaSafesFactory():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  execute(executeData: Bytes): boolean {
    let result = super.call("execute", "execute(bytes):(bool)", [
      ethereum.Value.fromBytes(executeData)
    ]);

    return result[0].toBoolean();
  }

  try_execute(executeData: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall("execute", "execute(bytes):(bool)", [
      ethereum.Value.fromBytes(executeData)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getSubCalls(
    executeData: Bytes
  ): Array<OpsFlowProxy__getSubCallsResultSubsStruct> {
    let result = super.call(
      "getSubCalls",
      "getSubCalls(bytes):((address,uint120,bytes)[])",
      [ethereum.Value.fromBytes(executeData)]
    );

    return result[0].toTupleArray<OpsFlowProxy__getSubCallsResultSubsStruct>();
  }

  try_getSubCalls(
    executeData: Bytes
  ): ethereum.CallResult<Array<OpsFlowProxy__getSubCallsResultSubsStruct>> {
    let result = super.tryCall(
      "getSubCalls",
      "getSubCalls(bytes):((address,uint120,bytes)[])",
      [ethereum.Value.fromBytes(executeData)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<OpsFlowProxy__getSubCallsResultSubsStruct>()
    );
  }

  getTask(taskId: BigInt): OpsFlowProxy__getTaskResultTaskStruct {
    let result = super.call(
      "getTask",
      "getTask(uint256):((address,bytes[],uint64,uint64,uint64,uint64))",
      [ethereum.Value.fromUnsignedBigInt(taskId)]
    );

    return changetype<OpsFlowProxy__getTaskResultTaskStruct>(
      result[0].toTuple()
    );
  }

  try_getTask(
    taskId: BigInt
  ): ethereum.CallResult<OpsFlowProxy__getTaskResultTaskStruct> {
    let result = super.tryCall(
      "getTask",
      "getTask(uint256):((address,bytes[],uint64,uint64,uint64,uint64))",
      [ethereum.Value.fromUnsignedBigInt(taskId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<OpsFlowProxy__getTaskResultTaskStruct>(value[0].toTuple())
    );
  }

  isActiveTask(taskId: BigInt): boolean {
    let result = super.call("isActiveTask", "isActiveTask(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(taskId)
    ]);

    return result[0].toBoolean();
  }

  try_isActiveTask(taskId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("isActiveTask", "isActiveTask(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(taskId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  needClose(taskIdData: Bytes): boolean {
    let result = super.call("needClose", "needClose(bytes):(bool)", [
      ethereum.Value.fromBytes(taskIdData)
    ]);

    return result[0].toBoolean();
  }

  try_needClose(taskIdData: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall("needClose", "needClose(bytes):(bool)", [
      ethereum.Value.fromBytes(taskIdData)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  taskExpired(taskId: BigInt): boolean {
    let result = super.call("taskExpired", "taskExpired(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(taskId)
    ]);

    return result[0].toBoolean();
  }

  try_taskExpired(taskId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("taskExpired", "taskExpired(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(taskId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _config(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _evaSafesFactory(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CancelTaskCall extends ethereum.Call {
  get inputs(): CancelTaskCall__Inputs {
    return new CancelTaskCall__Inputs(this);
  }

  get outputs(): CancelTaskCall__Outputs {
    return new CancelTaskCall__Outputs(this);
  }
}

export class CancelTaskCall__Inputs {
  _call: CancelTaskCall;

  constructor(call: CancelTaskCall) {
    this._call = call;
  }

  get taskId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class CancelTaskCall__Outputs {
  _call: CancelTaskCall;

  constructor(call: CancelTaskCall) {
    this._call = call;
  }
}

export class CloseCall extends ethereum.Call {
  get inputs(): CloseCall__Inputs {
    return new CloseCall__Inputs(this);
  }

  get outputs(): CloseCall__Outputs {
    return new CloseCall__Outputs(this);
  }
}

export class CloseCall__Inputs {
  _call: CloseCall;

  constructor(call: CloseCall) {
    this._call = call;
  }

  get taskIdData(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class CloseCall__Outputs {
  _call: CloseCall;

  constructor(call: CloseCall) {
    this._call = call;
  }
}

export class CloseFlowCall extends ethereum.Call {
  get inputs(): CloseFlowCall__Inputs {
    return new CloseFlowCall__Inputs(this);
  }

  get outputs(): CloseFlowCall__Outputs {
    return new CloseFlowCall__Outputs(this);
  }
}

export class CloseFlowCall__Inputs {
  _call: CloseFlowCall;

  constructor(call: CloseFlowCall) {
    this._call = call;
  }

  get ser(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get flowId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class CloseFlowCall__Outputs {
  _call: CloseFlowCall;

  constructor(call: CloseFlowCall) {
    this._call = call;
  }
}

export class CreateCall extends ethereum.Call {
  get inputs(): CreateCall__Inputs {
    return new CreateCall__Inputs(this);
  }

  get outputs(): CreateCall__Outputs {
    return new CreateCall__Outputs(this);
  }
}

export class CreateCall__Inputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }

  get ser(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get opsFlow(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get network(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get gasFee(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get name(): string {
    return this._call.inputValues[4].value.toString();
  }

  get task(): CreateCallTaskStruct {
    return changetype<CreateCallTaskStruct>(
      this._call.inputValues[5].value.toTuple()
    );
  }
}

export class CreateCall__Outputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }
}

export class CreateCallTaskStruct extends ethereum.Tuple {
  get owner(): Address {
    return this[0].toAddress();
  }

  get inputs(): Array<Bytes> {
    return this[1].toBytesArray();
  }

  get startTime(): BigInt {
    return this[2].toBigInt();
  }

  get deadline(): BigInt {
    return this[3].toBigInt();
  }

  get lastExecTime(): BigInt {
    return this[4].toBigInt();
  }

  get interval(): BigInt {
    return this[5].toBigInt();
  }
}

export class CreateTaskCall extends ethereum.Call {
  get inputs(): CreateTaskCall__Inputs {
    return new CreateTaskCall__Inputs(this);
  }

  get outputs(): CreateTaskCall__Outputs {
    return new CreateTaskCall__Outputs(this);
  }
}

export class CreateTaskCall__Inputs {
  _call: CreateTaskCall;

  constructor(call: CreateTaskCall) {
    this._call = call;
  }

  get task(): CreateTaskCallTaskStruct {
    return changetype<CreateTaskCallTaskStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }

  get taskId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class CreateTaskCall__Outputs {
  _call: CreateTaskCall;

  constructor(call: CreateTaskCall) {
    this._call = call;
  }

  get _taskId(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class CreateTaskCallTaskStruct extends ethereum.Tuple {
  get owner(): Address {
    return this[0].toAddress();
  }

  get inputs(): Array<Bytes> {
    return this[1].toBytesArray();
  }

  get startTime(): BigInt {
    return this[2].toBigInt();
  }

  get deadline(): BigInt {
    return this[3].toBigInt();
  }

  get lastExecTime(): BigInt {
    return this[4].toBigInt();
  }

  get interval(): BigInt {
    return this[5].toBigInt();
  }
}

export class EnableERC1820Call extends ethereum.Call {
  get inputs(): EnableERC1820Call__Inputs {
    return new EnableERC1820Call__Inputs(this);
  }

  get outputs(): EnableERC1820Call__Outputs {
    return new EnableERC1820Call__Outputs(this);
  }
}

export class EnableERC1820Call__Inputs {
  _call: EnableERC1820Call;

  constructor(call: EnableERC1820Call) {
    this._call = call;
  }
}

export class EnableERC1820Call__Outputs {
  _call: EnableERC1820Call;

  constructor(call: EnableERC1820Call) {
    this._call = call;
  }
}

export class ExecuteCall extends ethereum.Call {
  get inputs(): ExecuteCall__Inputs {
    return new ExecuteCall__Inputs(this);
  }

  get outputs(): ExecuteCall__Outputs {
    return new ExecuteCall__Outputs(this);
  }
}

export class ExecuteCall__Inputs {
  _call: ExecuteCall;

  constructor(call: ExecuteCall) {
    this._call = call;
  }

  get executeData(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class ExecuteCall__Outputs {
  _call: ExecuteCall;

  constructor(call: ExecuteCall) {
    this._call = call;
  }

  get canDestoryFlow(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class MulticallCall extends ethereum.Call {
  get inputs(): MulticallCall__Inputs {
    return new MulticallCall__Inputs(this);
  }

  get outputs(): MulticallCall__Outputs {
    return new MulticallCall__Outputs(this);
  }
}

export class MulticallCall__Inputs {
  _call: MulticallCall;

  constructor(call: MulticallCall) {
    this._call = call;
  }

  get target(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get callData(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class MulticallCall__Outputs {
  _call: MulticallCall;

  constructor(call: MulticallCall) {
    this._call = call;
  }
}

export class RemoveERC1820Call extends ethereum.Call {
  get inputs(): RemoveERC1820Call__Inputs {
    return new RemoveERC1820Call__Inputs(this);
  }

  get outputs(): RemoveERC1820Call__Outputs {
    return new RemoveERC1820Call__Outputs(this);
  }
}

export class RemoveERC1820Call__Inputs {
  _call: RemoveERC1820Call;

  constructor(call: RemoveERC1820Call) {
    this._call = call;
  }
}

export class RemoveERC1820Call__Outputs {
  _call: RemoveERC1820Call;

  constructor(call: RemoveERC1820Call) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetFactoryCall extends ethereum.Call {
  get inputs(): SetFactoryCall__Inputs {
    return new SetFactoryCall__Inputs(this);
  }

  get outputs(): SetFactoryCall__Outputs {
    return new SetFactoryCall__Outputs(this);
  }
}

export class SetFactoryCall__Inputs {
  _call: SetFactoryCall;

  constructor(call: SetFactoryCall) {
    this._call = call;
  }

  get factory(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetFactoryCall__Outputs {
  _call: SetFactoryCall;

  constructor(call: SetFactoryCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
