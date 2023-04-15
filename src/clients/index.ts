import Me from "./me";
import Users from "./user";
import MarketPlace from "./marketplace";
import Games from "./games";

export class Client {
	#authorizationToken: string | null;

	constructor(authorizationToken: string | null) {
		this.#authorizationToken = authorizationToken;

		Object.defineProperty(this, "me", {
			get: () => new Me(this.#authorizationToken || ""),
		});

		Object.defineProperty(this, "users", {
			get: () => new Users(this.#authorizationToken || ""),
		});

		Object.defineProperty(this, "marketplace", {
			get: () => new MarketPlace(this.#authorizationToken || ""),
		});

		Object.defineProperty(this, "games", {
			get: () => new Games(this.#authorizationToken || ""),
		});

		return;
	}
}
