export class AuthorizationError extends Error {
	constructor() {
		super("Authorization is required in order to call this function");
		this.name = "AuthorizationError";
		this.stack = (new Error() as any).stack;
	}
}
