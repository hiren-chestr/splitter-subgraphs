import { BigInt } from '@graphprotocol/graph-ts';
import { MockDai, Approval, Transfer } from '../generated/MockDai/MockDai';
import { DaiTransfer, Approval as ApprovalData } from '../generated/schema';

export function handleApproval(event: Approval): void {
  let entity = ApprovalData.load(event.transaction.from.toHex());

  if (!entity) {
    entity = new ApprovalData(event.transaction.from.toHex());
    entity.count = BigInt.fromI32(0);
  }
  entity.count = entity.count.plus(BigInt.fromI32(1));
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;

  entity.save();
}

export function handleTransfer(event: Transfer): void {
  let entity = DaiTransfer.load(event.transaction.from.toHex());

  if (!entity) {
    entity = new DaiTransfer(event.transaction.from.toHex());
  }
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.amount = event.params.value;

  entity.save();
}
