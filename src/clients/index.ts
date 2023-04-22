import Me from "./me";
import Users from "./user";
import MarketPlace from "./marketplace";
import Games from "./games";
import Admin from "./admin";
import { Auth } from "./auth";

export class Client {
	readonly #authorizationToken: string | null;

	constructor(authorizationToken: string | null) {
		this.#authorizationToken = authorizationToken;

		const clients = [
			{ name: "me", classDef: Me },
			{ name: "users", classDef: Users },
			{ name: "marketplace", classDef: MarketPlace },
			{ name: "games", classDef: Games },
			{ name: "admin", classDef: Admin },
			{ name: "auth", classDef: Auth },
		];

		for (const { name, classDef } of clients) {
			Object.defineProperty(this, name, {
				get() {
					return new classDef(this.#authorizationToken || "");
				},
			});
		}

		return;
	}
}
