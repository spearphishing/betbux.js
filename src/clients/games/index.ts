import { createLudoGame, createStairsGame } from "../../functions";
import { Socket } from "socket.io-client";

type GameOutcome = {
	success: boolean;
	winner?: { id: string; displayName: string; balance: number };
	reason?: string;
};

export default class Games {
	#authorizationToken: string;

	constructor(authorizationToken: string) {
		this.#authorizationToken = authorizationToken;
	}

	public async playLudo(
		cost: number,
		steps: 35 | 49 | 63,
	): Promise<GameOutcome> {
		const ludoGame: {
			success: boolean;
			reason?: string;
			battleId?: number;
			socket?: Socket;
		} = await createLudoGame(this.#authorizationToken, {
			cost,
			steps,
		});

		return new Promise((resolve, reject) => {
			if (ludoGame.success) {
				const diceRollInterval = setInterval(() => {
					ludoGame.socket?.emit("ROLL_DICE", ludoGame.battleId);
				}, 1000);

				ludoGame.socket?.on(
					"LUDO_BATTLE_ENDED",
					(winner: { id: string; displayName: string; balance: number }) => {
						clearInterval(diceRollInterval);

						ludoGame.socket?.emit("LEAVE-ROOM", `LUDO-${ludoGame.battleId}`);
						ludoGame.socket?.disconnect();

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

	public async playStairs(
		cost: number,
		rocks: 3 | 2 | 4,
	): Promise<GameOutcome> {
		const stairsGame: {
			success: boolean;
			reason?: string;
			battleId?: number;
			socket?: Socket;
		} = await createStairsGame(this.#authorizationToken, {
			rocks,
			cost,
		});

		return new Promise((resolve, reject) => {
			if (stairsGame.success) {
				stairsGame.socket?.on("STAIRS_BATTLE_ENDED", (winner) => {
					stairsGame.socket?.emit(
						"LEAVE-ROOM",
						`STAIRS-${stairsGame.battleId}`,
					);
					stairsGame.socket?.disconnect();

					resolve({
						success: true,
						winner,
					});
				});
			} else {
				reject({
					success: false,
				});
			}
		});
	}
}
