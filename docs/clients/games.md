## Table of contents

### Constructors

- [constructor](games.md#constructor)

### Properties

- [authorizationToken](games.md#authorizationtoken)

### Methods

- [getActiveBattles](games.md#getactivebattles)
- [getGameData](games.md#getgamedata)
- [getRandomNumberInclusive](games.md#getrandomnumberinclusive)
- [liveFeed](games.md#livefeed)
- [playLudo](games.md#playludo)
- [playMines](games.md#playmines)
- [playStairs](games.md#playstairs)
- [playTriple](games.md#playtriple)

## Constructors

### constructor

• **new default**(`authorizationToken`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authorizationToken` | `string` |

#### Defined in

[games/index.ts:9](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/games/index.ts#L9)

## Properties

### authorizationToken

• `Readonly` **authorizationToken**: `string`

#### Defined in

[games/index.ts:7](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/games/index.ts#L7)

## Methods

### getActiveBattles

▸ **getActiveBattles**(`gameMode`): `Promise`<{ `data`: [] \| `AllBattles`[]  }\>

Fetches a list of active battles given a game mode.

#### Parameters

| Name | Type |
| :------ | :------ |
| `gameMode` | ``"stairs"`` \| ``"mines"`` \| ``"ludo"`` \| ``"triple"`` |

#### Returns

`Promise`<{ `data`: [] \| `AllBattles`[]  }\>

#### Defined in

[games/index.ts:35](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/games/index.ts#L35)

___

### getGameData

▸ **getGameData**(`gameMode`, `battleId`): `Promise`<{ `gameData?`: `AllBattles` \| { `error`: ``"No stairs battle by that id was found..."``  } ; `reason?`: `string` ; `success`: `boolean`  }\>

Fetch dayta about a specific game via its battleId.

#### Parameters

| Name | Type |
| :------ | :------ |
| `gameMode` | ``"stairs"`` \| ``"mines"`` \| ``"ludo"`` \| ``"triple"`` |
| `battleId` | `number` |

#### Returns

`Promise`<{ `gameData?`: `AllBattles` \| { `error`: ``"No stairs battle by that id was found..."``  } ; `reason?`: `string` ; `success`: `boolean`  }\>

#### Defined in

[games/index.ts:52](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/games/index.ts#L52)

___

### getRandomNumberInclusive

▸ `Private` **getRandomNumberInclusive**(`min`, `max`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `number` |
| `max` | `number` |

#### Returns

`number`

#### Defined in

[games/index.ts:13](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/games/index.ts#L13)

___

### liveFeed

▸ **liveFeed**(): `Promise`<`FeedGame`[]\>

Fetches the live feed of user bets

#### Returns

`Promise`<`FeedGame`[]\>

#### Defined in

[games/index.ts:23](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/games/index.ts#L23)

___

### playLudo

▸ **playLudo**(`cost`, `steps`, `players?`): `Promise`<`GameOutcome`\>

Play a game of ludo given a cost and amount of steps.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `cost` | `number` | `undefined` |
| `steps` | ``35`` \| ``49`` \| ``63`` | `undefined` |
| `players` | ``2`` \| ``3`` | `2` |

#### Returns

`Promise`<`GameOutcome`\>

#### Defined in

[games/index.ts:88](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/games/index.ts#L88)

___

### playMines

▸ **playMines**(`cost`, `mines`, `players?`): `Promise`<`GameOutcome`\>

Play a game of mines.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `cost` | `number` | `undefined` |
| `mines` | ``2`` \| ``3`` \| ``4`` | `undefined` |
| `players` | ``2`` \| ``3`` | `2` |

#### Returns

`Promise`<`GameOutcome`\>

#### Defined in

[games/index.ts:149](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/games/index.ts#L149)

___

### playStairs

▸ **playStairs**(`cost`, `rocks`, `players?`): `Promise`<`GameOutcome`\>

Play a game of stairs given a cost and a number of rocks per stair.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `cost` | `number` | `undefined` |
| `rocks` | ``2`` \| ``3`` \| ``4`` | `undefined` |
| `players` | ``2`` \| ``3`` | `2` |

#### Returns

`Promise`<`GameOutcome`\>

#### Defined in

[games/index.ts:116](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/games/index.ts#L116)

___

### playTriple

▸ **playTriple**(`cost`, `players?`): `Promise`<`GameOutcome`\>

Play a game of triple

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `cost` | `number` | `undefined` |
| `players` | ``2`` \| ``3`` | `2` |

#### Returns

`Promise`<`GameOutcome`\>

#### Defined in

[games/index.ts:181](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/games/index.ts#L181)
