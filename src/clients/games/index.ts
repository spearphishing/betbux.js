import { createLudoGame, createStairsGame, doRequest } from "../../functions";
import { feedGame, GameOutcome } from "./types";
import { Socket } from "socket.io-client";

export default class Games {
	#authorizationToken: string;

	constructor(authorizationToken: string) {
		this.#authorizationToken = authorizationToken;
	}

	private getRandomNumberInclusive(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Fetches the live feed of user bets
	 * @returns {anyPromise<feedGame[]>}
	 */
	public async liveFeed(): Promise<feedGame[]> {
		return await doRequest({
			url: "https://api.betbux.gg/user/live-feed",
			method: "GET",
		});
	}

	/**
	 * Play a game of ludo given a cost and amount of steps.
	 * @param {number} cost
	 * @param {35 | 49 | 63} steps
	 * @returns {Promise<GameOutcome>}
	 */
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

	/**
	 * Play a game of stairs given a cost and a number of rocks per stair.
	 * @param {number} cost
	 * @param {3 | 2 | 4 } rocks
	 * @returns {Promise<GameOutcome>}
	 */
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
					clearInterval(climbStairInterval);

					stairsGame.socket?.emit(
						"LEAVE-ROOM",
						`STAIRS-${stairsGame.battleId}`,
					);
					stairsGame.socket?.disconnect();

					resolve({
						success: true,
						...winner,
					});
				});

				const climbStairInterval = setInterval(() => {
					const rand = this.getRandomNumberInclusive(0, 15);
					stairsGame.socket?.emit("CLIMB_LADDER", stairsGame.battleId, rand);
				}, 1000);
			} else {
				reject({
					success: false,
				});
			}
		});
	}
}
