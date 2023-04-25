## Table of contents

### Constructors

- [constructor](auth.md#constructor)

### Properties

- [authorizationToken](auth.md#authorizationtoken)

### Methods

- [loginWithCredentials](auth.md#loginwithcredentials)

## Constructors

### constructor

• **new default**(`authorizationToken`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authorizationToken` | `string` |

#### Defined in

[auth/index.ts:8](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/auth/index.ts#L8)

## Properties

### authorizationToken

• `Readonly` **authorizationToken**: `string`

#### Defined in

[auth/index.ts:6](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/auth/index.ts#L6)

## Methods

### loginWithCredentials

▸ **loginWithCredentials**(`username`, `password`, `captchaId?`, `captchaToken?`): `Promise`<{ `loginData?`: `LoginFieldData` \| `SuccessfulLoginData` ; `reason?`: `string` ; `success`: `boolean`  }\>

Attempts to login/initiate a login sessionsession with the provided credentials.

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |
| `password` | `string` |
| `captchaId?` | `string` |
| `captchaToken?` | `string` |

#### Returns

`Promise`<{ `loginData?`: `LoginFieldData` \| `SuccessfulLoginData` ; `reason?`: `string` ; `success`: `boolean`  }\>

#### Defined in

[auth/index.ts:20](https://github.com/9ggy/betbux.js/blob/4746ca9/src/clients/auth/index.ts#L20)
