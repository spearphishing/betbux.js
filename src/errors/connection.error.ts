export class ConnectionError extends Error {
	constructor(err: Error) {
		super(`There was an error connecting to BetBux: ${err}`);
		this.name = "ConnectionError";
		this.stack = (new Error() as any).stack;
	}
}
