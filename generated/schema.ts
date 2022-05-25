// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class FlowEntity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save FlowEntity entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FlowEntity must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("FlowEntity", id.toString(), this);
    }
  }

  static load(id: string): FlowEntity | null {
    return changetype<FlowEntity | null>(store.get("FlowEntity", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get flowStatus(): i32 {
    let value = this.get("flowStatus");
    return value!.toI32();
  }

  set flowStatus(value: i32) {
    this.set("flowStatus", Value.fromI32(value));
  }

  get flowType(): i32 {
    let value = this.get("flowType");
    return value!.toI32();
  }

  set flowType(value: i32) {
    this.set("flowType", Value.fromI32(value));
  }

  get admin(): string | null {
    let value = this.get("admin");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set admin(value: string | null) {
    if (!value) {
      this.unset("admin");
    } else {
      this.set("admin", Value.fromString(<string>value));
    }
  }

  get flowName(): string | null {
    let value = this.get("flowName");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set flowName(value: string | null) {
    if (!value) {
      this.unset("flowName");
    } else {
      this.set("flowName", Value.fromString(<string>value));
    }
  }

  get input(): Bytes | null {
    let value = this.get("input");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set input(value: Bytes | null) {
    if (!value) {
      this.unset("input");
    } else {
      this.set("input", Value.fromBytes(<Bytes>value));
    }
  }

  get gas(): BigInt | null {
    let value = this.get("gas");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set gas(value: BigInt | null) {
    if (!value) {
      this.unset("gas");
    } else {
      this.set("gas", Value.fromBigInt(<BigInt>value));
    }
  }

  get nftOrder(): string | null {
    let value = this.get("nftOrder");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set nftOrder(value: string | null) {
    if (!value) {
      this.unset("nftOrder");
    } else {
      this.set("nftOrder", Value.fromString(<string>value));
    }
  }

  get erc20Order(): string | null {
    let value = this.get("erc20Order");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set erc20Order(value: string | null) {
    if (!value) {
      this.unset("erc20Order");
    } else {
      this.set("erc20Order", Value.fromString(<string>value));
    }
  }

  get taskOrder(): string | null {
    let value = this.get("taskOrder");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set taskOrder(value: string | null) {
    if (!value) {
      this.unset("taskOrder");
    } else {
      this.set("taskOrder", Value.fromString(<string>value));
    }
  }

  get details(): Array<string> | null {
    let value = this.get("details");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set details(value: Array<string> | null) {
    if (!value) {
      this.unset("details");
    } else {
      this.set("details", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class FlowHistory extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save FlowHistory entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type FlowHistory must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("FlowHistory", id.toString(), this);
    }
  }

  static load(id: string): FlowHistory | null {
    return changetype<FlowHistory | null>(store.get("FlowHistory", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get flowId(): string | null {
    let value = this.get("flowId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set flowId(value: string | null) {
    if (!value) {
      this.unset("flowId");
    } else {
      this.set("flowId", Value.fromString(<string>value));
    }
  }

  get gasUsed(): BigInt | null {
    let value = this.get("gasUsed");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set gasUsed(value: BigInt | null) {
    if (!value) {
      this.unset("gasUsed");
    } else {
      this.set("gasUsed", Value.fromBigInt(<BigInt>value));
    }
  }

  get blockTime(): BigInt | null {
    let value = this.get("blockTime");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set blockTime(value: BigInt | null) {
    if (!value) {
      this.unset("blockTime");
    } else {
      this.set("blockTime", Value.fromBigInt(<BigInt>value));
    }
  }

  get action(): string | null {
    let value = this.get("action");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set action(value: string | null) {
    if (!value) {
      this.unset("action");
    } else {
      this.set("action", Value.fromString(<string>value));
    }
  }

  get from(): string | null {
    let value = this.get("from");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set from(value: string | null) {
    if (!value) {
      this.unset("from");
    } else {
      this.set("from", Value.fromString(<string>value));
    }
  }

  get ethGasFee(): BigInt | null {
    let value = this.get("ethGasFee");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set ethGasFee(value: BigInt | null) {
    if (!value) {
      this.unset("ethGasFee");
    } else {
      this.set("ethGasFee", Value.fromBigInt(<BigInt>value));
    }
  }

  get evaGasFee(): BigInt | null {
    let value = this.get("evaGasFee");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set evaGasFee(value: BigInt | null) {
    if (!value) {
      this.unset("evaGasFee");
    } else {
      this.set("evaGasFee", Value.fromBigInt(<BigInt>value));
    }
  }

  get content(): string | null {
    let value = this.get("content");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set content(value: string | null) {
    if (!value) {
      this.unset("content");
    } else {
      this.set("content", Value.fromString(<string>value));
    }
  }

  get success(): boolean {
    let value = this.get("success");
    return value!.toBoolean();
  }

  set success(value: boolean) {
    this.set("success", Value.fromBoolean(value));
  }

  get failedReason(): string | null {
    let value = this.get("failedReason");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set failedReason(value: string | null) {
    if (!value) {
      this.unset("failedReason");
    } else {
      this.set("failedReason", Value.fromString(<string>value));
    }
  }
}

export class NftOrder extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NftOrder entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type NftOrder must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("NftOrder", id.toString(), this);
    }
  }

  static load(id: string): NftOrder | null {
    return changetype<NftOrder | null>(store.get("NftOrder", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string | null {
    let value = this.get("owner");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set owner(value: string | null) {
    if (!value) {
      this.unset("owner");
    } else {
      this.set("owner", Value.fromString(<string>value));
    }
  }

  get assetToken(): string | null {
    let value = this.get("assetToken");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set assetToken(value: string | null) {
    if (!value) {
      this.unset("assetToken");
    } else {
      this.set("assetToken", Value.fromString(<string>value));
    }
  }

  get amount(): BigInt | null {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt | null) {
    if (!value) {
      this.unset("amount");
    } else {
      this.set("amount", Value.fromBigInt(<BigInt>value));
    }
  }

  get price(): BigInt | null {
    let value = this.get("price");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set price(value: BigInt | null) {
    if (!value) {
      this.unset("price");
    } else {
      this.set("price", Value.fromBigInt(<BigInt>value));
    }
  }

  get deadline(): BigInt | null {
    let value = this.get("deadline");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set deadline(value: BigInt | null) {
    if (!value) {
      this.unset("deadline");
    } else {
      this.set("deadline", Value.fromBigInt(<BigInt>value));
    }
  }

  get tokenId(): BigInt | null {
    let value = this.get("tokenId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set tokenId(value: BigInt | null) {
    if (!value) {
      this.unset("tokenId");
    } else {
      this.set("tokenId", Value.fromBigInt(<BigInt>value));
    }
  }

  get blockTIme(): BigInt | null {
    let value = this.get("blockTIme");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set blockTIme(value: BigInt | null) {
    if (!value) {
      this.unset("blockTIme");
    } else {
      this.set("blockTIme", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Erc20Order extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Erc20Order entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Erc20Order must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Erc20Order", id.toString(), this);
    }
  }

  static load(id: string): Erc20Order | null {
    return changetype<Erc20Order | null>(store.get("Erc20Order", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get inputAmount(): BigInt {
    let value = this.get("inputAmount");
    return value!.toBigInt();
  }

  set inputAmount(value: BigInt) {
    this.set("inputAmount", Value.fromBigInt(value));
  }

  get inputToken(): string {
    let value = this.get("inputToken");
    return value!.toString();
  }

  set inputToken(value: string) {
    this.set("inputToken", Value.fromString(value));
  }

  get minRate(): BigInt {
    let value = this.get("minRate");
    return value!.toBigInt();
  }

  set minRate(value: BigInt) {
    this.set("minRate", Value.fromBigInt(value));
  }

  get outputToken(): string {
    let value = this.get("outputToken");
    return value!.toString();
  }

  set outputToken(value: string) {
    this.set("outputToken", Value.fromString(value));
  }

  get deadline(): BigInt {
    let value = this.get("deadline");
    return value!.toBigInt();
  }

  set deadline(value: BigInt) {
    this.set("deadline", Value.fromBigInt(value));
  }

  get receiptor(): string {
    let value = this.get("receiptor");
    return value!.toString();
  }

  set receiptor(value: string) {
    this.set("receiptor", Value.fromString(value));
  }

  get minInputPer(): BigInt {
    let value = this.get("minInputPer");
    return value!.toBigInt();
  }

  set minInputPer(value: BigInt) {
    this.set("minInputPer", Value.fromBigInt(value));
  }
}

export class TaskOrder extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TaskOrder entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TaskOrder must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TaskOrder", id.toString(), this);
    }
  }

  static load(id: string): TaskOrder | null {
    return changetype<TaskOrder | null>(store.get("TaskOrder", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get input(): Array<Bytes> | null {
    let value = this.get("input");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set input(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("input");
    } else {
      this.set("input", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }

  get startTime(): BigInt {
    let value = this.get("startTime");
    return value!.toBigInt();
  }

  set startTime(value: BigInt) {
    this.set("startTime", Value.fromBigInt(value));
  }

  get deadline(): BigInt {
    let value = this.get("deadline");
    return value!.toBigInt();
  }

  set deadline(value: BigInt) {
    this.set("deadline", Value.fromBigInt(value));
  }

  get lastExecTime(): BigInt {
    let value = this.get("lastExecTime");
    return value!.toBigInt();
  }

  set lastExecTime(value: BigInt) {
    this.set("lastExecTime", Value.fromBigInt(value));
  }

  get interval(): BigInt {
    let value = this.get("interval");
    return value!.toBigInt();
  }

  set interval(value: BigInt) {
    this.set("interval", Value.fromBigInt(value));
  }

  get blockTIme(): BigInt {
    let value = this.get("blockTIme");
    return value!.toBigInt();
  }

  set blockTIme(value: BigInt) {
    this.set("blockTIme", Value.fromBigInt(value));
  }
}
