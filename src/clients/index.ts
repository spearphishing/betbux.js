import Me from "./me";
import Users from "./user";
import MarketPlace from "./marketplace";
import Games from "./games";
import Admin from "./admin";

export class Client {
	#authorizationToken: string | null;

	constructor(authorizationToken: string | null) {
		this.#authorizationToken = authorizationToken;

		const clients = [
			{ name: "me", classDef: Me },
			{ name: "users", classDef: Users },
			{ name: "marketplace", classDef: MarketPlace },
			{ name: "games", classDef: Games },
			{ name: "admin", classDef: Admin },
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
