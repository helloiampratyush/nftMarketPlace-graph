import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { itemBought } from "../generated/schema"
import { itemBought as itemBoughtEvent } from "../generated/nftMarketPlace/nftMarketPlace"
import { handleitemBought } from "../src/nft-market-place"
import { createitemBoughtEvent } from "./nft-market-place-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let buyer = Address.fromString("0x0000000000000000000000000000000000000001")
    let nftAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenID = BigInt.fromI32(234)
    let Price = BigInt.fromI32(234)
    let newitemBoughtEvent = createitemBoughtEvent(
      buyer,
      nftAddress,
      tokenID,
      Price
    )
    handleitemBought(newitemBoughtEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("itemBought created and stored", () => {
    assert.entityCount("itemBought", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "itemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "buyer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "itemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nftAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "itemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenID",
      "234"
    )
    assert.fieldEquals(
      "itemBought",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "Price",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
