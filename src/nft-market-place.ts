import {
  itemBought as itemBoughtEvent,
  itemCanceled as itemCanceledEvent,
  itemListed as itemListedEvent
} from "../generated/nftMarketPlace/nftMarketPlace"
import { itemBought, itemCanceled, itemListed } from "../generated/schema"

export function handleitemBought(event: itemBoughtEvent): void {
  let entity = new itemBought(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.buyer = event.params.buyer
  entity.nftAddress = event.params.nftAddress
  entity.tokenID = event.params.tokenID
  entity.Price = event.params.Price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleitemCanceled(event: itemCanceledEvent): void {
  let entity = new itemCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seller = event.params.seller
  entity.nftAddress = event.params.nftAddress
  entity.tokenID = event.params.tokenID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleitemListed(event: itemListedEvent): void {
  let entity = new itemListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seller = event.params.seller
  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
