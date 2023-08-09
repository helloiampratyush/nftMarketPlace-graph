import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  itemBought as ItemBoughtEvent,
  itemCanceled as ItemCanceledEvent,
  itemListed as ItemListedEvent,
} from "../generated/nftMarketPlace/nftMarketPlace";
import {
  itemListed,
  activeItem,
  itemBought,
  itemCanceled,
} from "../generated/schema";

export function handleitemListed(event: ItemListedEvent): void {
  let ItemListed = itemListed.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let ActiveItem = activeItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!ItemListed) {
    ItemListed = new itemListed(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  if (!ActiveItem) {
    ActiveItem = new activeItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  ItemListed.seller = event.params.seller;
  ActiveItem.seller = event.params.seller;

  ItemListed.nftAddress = event.params.nftAddress;
  ActiveItem.nftAddress = event.params.nftAddress;

  ItemListed.tokenId = event.params.tokenId;
  ActiveItem.tokenId = event.params.tokenId;

  ItemListed.price = event.params.price;
  ActiveItem.price = event.params.price;

  ActiveItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  ItemListed.save();
  ActiveItem.save();
}

export function handleitemCanceled(event: ItemCanceledEvent): void {
  let ItemCanceled = itemCanceled.load(
    getIdFromEventParams(event.params.tokenID, event.params.nftAddress)
  );
  let ActiveItem = activeItem.load(
    getIdFromEventParams(event.params.tokenID, event.params.nftAddress)
  );
  if (!ItemCanceled) {
    ItemCanceled = new itemCanceled(
      getIdFromEventParams(event.params.tokenID, event.params.nftAddress)
    );
  }
  ItemCanceled.seller = event.params.seller;
  ItemCanceled.nftAddress = event.params.nftAddress;
  ItemCanceled.tokenId = event.params.tokenID;
  ActiveItem!.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
  );

  ItemCanceled.save();
  ActiveItem!.save();
}

export function handleitemBought(event: ItemBoughtEvent): void {
  let ItemBought = itemBought.load(
    getIdFromEventParams(event.params.tokenID, event.params.nftAddress)
  );
  let ActiveItem = activeItem.load(
    getIdFromEventParams(event.params.tokenID, event.params.nftAddress)
  );
  if (!ItemBought) {
    ItemBought = new itemBought(
      getIdFromEventParams(event.params.tokenID, event.params.nftAddress)
    );
  }
  ItemBought.buyer = event.params.buyer;
  ItemBought.nftAddress = event.params.nftAddress;
  ItemBought.tokenId = event.params.tokenID;
  ActiveItem!.buyer = event.params.buyer;

  ItemBought.save();
  ActiveItem!.save();
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString();
}
