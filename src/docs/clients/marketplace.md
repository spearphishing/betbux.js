## Table of contents

### Constructors

- [constructor](marketplace.md#constructor)

### Properties

- [authorizationToken](marketplace.md#authorizationtoken)

### Methods

- [getInventory](marketplace.md#getinventory)
- [getListed](marketplace.md#getlisted)

## Constructors

### constructor

• **new default**(`authorizationToken`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authorizationToken` | `string` |

#### Defined in

[marketplace/index.ts:8](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/marketplace/index.ts#L8)

## Properties

### authorizationToken

• `Readonly` **authorizationToken**: `string`

#### Defined in

[marketplace/index.ts:6](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/marketplace/index.ts#L6)

## Methods

### getInventory

▸ **getInventory**(): `Promise`<{ `data?`: `InventoryItem`[] ; `reason?`: `string` ; `success`: `boolean`  }\>

Fetches the authenticated users limited inventory.

#### Returns

`Promise`<{ `data?`: `InventoryItem`[] ; `reason?`: `string` ; `success`: `boolean`  }\>

#### Defined in

[marketplace/index.ts:16](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/marketplace/index.ts#L16)

___

### getListed

▸ **getListed**(): `Promise`<{ `data?`: `MarketPlaceEntry`[] ; `reason?`: `string` ; `success`: `boolean`  }\>

#### Returns

`Promise`<{ `data?`: `MarketPlaceEntry`[] ; `reason?`: `string` ; `success`: `boolean`  }\>

#### Defined in

[marketplace/index.ts:43](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/marketplace/index.ts#L43)
