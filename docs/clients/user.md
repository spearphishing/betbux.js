## Table of contents

### Constructors

- [constructor](user.md#constructor)

### Properties

- [authorizationToken](user.md#authorizationtoken)

### Methods

- [getUser](user.md#getuser)

## Constructors

### constructor

• **new default**(`authorizationToken`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authorizationToken` | `string` |

#### Defined in

[user/index.ts:7](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/user/index.ts#L7)

## Properties

### authorizationToken

• `Readonly` **authorizationToken**: `string`

#### Defined in

[user/index.ts:5](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/user/index.ts#L5)

## Methods

### getUser

▸ **getUser**(`uid`): `Promise`<{ `data?`: `UserType` ; `reason?`: `string` ; `success`: `boolean`  }\>

Fetches a BetBux user via their ID.

#### Parameters

| Name | Type |
| :------ | :------ |
| `uid` | `number` |

#### Returns

`Promise`<{ `data?`: `UserType` ; `reason?`: `string` ; `success`: `boolean`  }\>

#### Defined in

[user/index.ts:16](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/user/index.ts#L16)
