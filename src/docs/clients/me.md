## Table of contents

### Constructors

- [constructor](me.md#constructor)

### Properties

- [authorizationToken](me.md#authorizationtoken)

### Methods

- [cancelRobuxTransfer](me.md#cancelrobuxtransfer)
- [claimAffiliateEarn](me.md#claimaffiliateearn)
- [claimStatusEarn](me.md#claimstatusearn)
- [getAffiliateDetails](me.md#getaffiliatedetails)
- [getAuthenticated](me.md#getauthenticated)
- [getStatusEarnDetails](me.md#getstatusearndetails)
- [getTransactions](me.md#gettransactions)
- [sendMessage](me.md#sendmessage)
- [sendTip](me.md#sendtip)
- [startGiveaway](me.md#startgiveaway)
- [updateAffliateCode](me.md#updateaffliatecode)
- [withdrawRobux](me.md#withdrawrobux)

## Constructors

### constructor

• **new default**(`authorizationToken`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authorizationToken` | `string` |

#### Defined in

[me/index.ts:21](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L21)

## Properties

### authorizationToken

• `Readonly` **authorizationToken**: `string`

#### Defined in

[me/index.ts:19](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L19)

## Methods

### cancelRobuxTransfer

▸ **cancelRobuxTransfer**(): `Promise`<{ `reason?`: `string` ; `success`: `boolean`  }\>

Cancels a robux transfer given a transfer type.

#### Returns

`Promise`<{ `reason?`: `string` ; `success`: `boolean`  }\>

#### Defined in

[me/index.ts:73](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L73)

___

### claimAffiliateEarn

▸ **claimAffiliateEarn**(): `Promise`<{ `reason?`: `string` ; `success`: `boolean`  }\>

Claims the authenticated users Affiliate Earn.

#### Returns

`Promise`<{ `reason?`: `string` ; `success`: `boolean`  }\>

#### Defined in

[me/index.ts:153](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L153)

___

### claimStatusEarn

▸ **claimStatusEarn**(): `Promise`<{ `reason?`: `string` ; `success`: `boolean`  }\>

Attempts to claim Status Earn.

#### Returns

`Promise`<{ `reason?`: `string` ; `success`: `boolean`  }\>

#### Defined in

[me/index.ts:118](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L118)

___

### getAffiliateDetails

▸ **getAffiliateDetails**(): `Promise`<`AffiliateType`\>

Fetches affiliate details.

#### Returns

`Promise`<`AffiliateType`\>

#### Defined in

[me/index.ts:140](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L140)

___

### getAuthenticated

▸ **getAuthenticated**(): `Promise`<`AuthenticatedUserType`\>

Fetches details on the currently authenticated user.

#### Returns

`Promise`<`AuthenticatedUserType`\>

#### Defined in

[me/index.ts:29](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L29)

___

### getStatusEarnDetails

▸ **getStatusEarnDetails**(): `Promise`<{ `StatusEarnBalance`: `number` ; `discord?`: { `avatar`: `string` ; `discriminator`: `string` ; `id`: `string` ; `username`: `string`  } ; `discordStatus?`: `string` ; `nextPayout`: `string` ; `statusEarnRate`: `string` ; `statusEarnTotalEarned`: `number` ; `statusEarnTotalPayouts`: `number`  }\>

Gets details related to Status Earn.

#### Returns

`Promise`<{ `StatusEarnBalance`: `number` ; `discord?`: { `avatar`: `string` ; `discriminator`: `string` ; `id`: `string` ; `username`: `string`  } ; `discordStatus?`: `string` ; `nextPayout`: `string` ; `statusEarnRate`: `string` ; `statusEarnTotalEarned`: `number` ; `statusEarnTotalPayouts`: `number`  }\>

#### Defined in

[me/index.ts:101](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L101)

___

### getTransactions

▸ **getTransactions**(`pageSize`, `pageNumber`): `Promise`<{ `reason?`: `string` ; `success`: `boolean` ; `transactionData?`: `SingleTransaction`[]  }\>

Fetches the authenticated users transaction history.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pageSize` | `number` |
| `pageNumber` | `number` |

#### Returns

`Promise`<{ `reason?`: `string` ; `success`: `boolean` ; `transactionData?`: `SingleTransaction`[]  }\>

#### Defined in

[me/index.ts:213](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L213)

___

### sendMessage

▸ **sendMessage**(`message`): `Promise`<`ChatResponse`\>

Send a message in the BetBux chat.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`Promise`<`ChatResponse`\>

#### Defined in

[me/index.ts:253](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L253)

___

### sendTip

▸ **sendTip**(`recipientUserId`, `amountInRobux`): `Promise`<`ChatResponse`\>

Send a tip via the sendMessage functionality.

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipientUserId` | `number` |
| `amountInRobux` | `number` |

#### Returns

`Promise`<`ChatResponse`\>

#### Defined in

[me/index.ts:287](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L287)

___

### startGiveaway

▸ **startGiveaway**(`amountInPeople`, `robuxPerPerson`): `Promise`<`ChatResponse`\>

Start a giveaway via the sendMessage functionality.

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountInPeople` | `number` |
| `robuxPerPerson` | `number` |

#### Returns

`Promise`<`ChatResponse`\>

#### Defined in

[me/index.ts:301](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L301)

___

### updateAffliateCode

▸ **updateAffliateCode**(`newAffiliateCode`): `Promise`<{ `reason?`: `string` ; `success`: `boolean`  }\>

Updates the authentictaed users affiliate code.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newAffiliateCode` | `string` |

#### Returns

`Promise`<{ `reason?`: `string` ; `success`: `boolean`  }\>

#### Defined in

[me/index.ts:181](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L181)

___

### withdrawRobux

▸ **withdrawRobux**(`amount`): `Promise`<{ `data?`: `WithdrawRobuxType` ; `reason?`: `string` ; `success`: `boolean`  }\>

Attempt to withdraw robux given an amount.

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `number` |

#### Returns

`Promise`<{ `data?`: `WithdrawRobuxType` ; `reason?`: `string` ; `success`: `boolean`  }\>

#### Defined in

[me/index.ts:43](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/me/index.ts#L43)
