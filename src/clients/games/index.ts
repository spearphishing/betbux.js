import { createLudoGame } from "../../functions";
import { Socket } from "socket.io-client";

export default class Games {
	#authorizationToken: string;

	constructor(authorizationToken: string) {
		this.#authorizationToken = authorizationToken;
	}

	public async playLudo(
		cost: number,
		steps: 35 | 49 | 63,
	): Promise<{
		success: boolean;
		winner?: { id: string; displayName: string; balance: number };
	}> {
		const ludoGames: {
			success: boolean;
			reason?: string;
			battleId?: number;
			socket?: Socket;
		} = await createLudoGame(this.#authorizationToken, {
			cost,
			steps,
		});

		return new Promise((resolve, reject) => {
			if (ludoGames.success) {
				console.log(`Game made with bot ID #${ludoGames.battleId}`);

				ludoGames.socket?.on(
					"LUDO_BATTLE_ENDED",
					(winner: { id: string; displayName: string; balance: number }) => {
						ludoGames.socket?.emit("LEAVE-ROOM", `LUDO-${ludoGames.battleId}`);
						ludoGames.socket?.disconnect();

						resolve({
							success: true,
							winner,
						});
					},
				);
			} else {
				reject({
					success: false,
				});
			}
		});

		// 42["JOIN-ROOM","LUDO-68374"]

		// 42["CALL_BOT_LUDO",68374]

		// 42["LEAVE-ROOM","LUDO-68367"]

		// 42["ROLL_DICE",68374]

		// 42["LUDO_BATTLE_ENDED",{"id":"1","displayName":"BOT 1","balance":10044}]
	}
}
