import { createLudoGame } from "../../functions";

export default class Games {
	#authorizationToken: string;

	constructor(authorizationToken: string) {
		this.#authorizationToken = authorizationToken;
	}

	public async test() {
		return await createLudoGame(this.#authorizationToken, {
			cost: 500000,
			steps: 35,
		});
	}
}
