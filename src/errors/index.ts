export class AuthorizationError extends Error {
	constructor() {
		super("Authorization is required in order to call this function");
		this.name = "AuthorizationError";
		this.stack = (<any>new Error()).stack;
	}
}
