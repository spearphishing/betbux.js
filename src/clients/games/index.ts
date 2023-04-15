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
		reason?: string;
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

				const diceRollInterval = setInterval(() => {
					ludoGames.socket?.emit("ROLL_DICE", ludoGames.battleId);
				}, 1000);

				ludoGames.socket?.on(
					"LUDO_BATTLE_ENDED",
					(winner: { id: string; displayName: string; balance: number }) => {
						clearInterval(diceRollInterval);

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
	}
}
