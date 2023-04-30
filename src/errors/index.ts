export class AuthorizationError extends Error {
	constructor() {
		super("Authorization is required in order to call this function");
		this.name = "AuthorizationError";
		this.stack = (<any>new Error()).stack;
	}
}

export class ConnectionError extends Error {
	constructor(err: Error) {
		super(`There was an error connecting to BetBux: ${err}`);
		this.name = "ConnectionError";
		this.stack = (<any>new Error()).stack;
	}
}
