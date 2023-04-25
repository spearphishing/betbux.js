## Table of contents

### Constructors

- [constructor](admin.md#constructor)

### Properties

- [authorizationToken](admin.md#authorizationtoken)

### Methods

- [muteUser](admin.md#muteuser)
- [refundBattle](admin.md#refundbattle)

## Constructors

### constructor

• **new default**(`authorizationToken`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authorizationToken` | `string` |

#### Defined in

[admin/index.ts:7](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/admin/index.ts#L7)

## Properties

### authorizationToken

• `Readonly` **authorizationToken**: `string`

#### Defined in

[admin/index.ts:5](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/admin/index.ts#L5)

## Methods

### muteUser

▸ **muteUser**(`userId`, `mutePeriodInHours`): `Promise`<{ `reason?`: `string` ; `success`: `boolean`  }\>

Mutes a user for a given amount of times in hours.

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `number` |
| `mutePeriodInHours` | `number` |

#### Returns

`Promise`<{ `reason?`: `string` ; `success`: `boolean`  }\>

#### Defined in

[admin/index.ts:17](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/admin/index.ts#L17)

___

### refundBattle

▸ **refundBattle**(`gameMode`, `battleId`): `Promise`<{ `reason?`: `string` ; `success`: `boolean`  }\>

Refunds a battle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `gameMode` | `string` |
| `battleId` | `number` |

#### Returns

`Promise`<{ `reason?`: `string` ; `success`: `boolean`  }\>

#### Defined in

[admin/index.ts:52](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/admin/index.ts#L52)
