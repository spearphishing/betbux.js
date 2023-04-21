import { AxiosError } from "axios";
import { doRequest, createGame, AuthorizationRequired } from "../../functions";
import { FeedGame, GameOutcome, AllBattles } from "./types";
import { Socket } from "socket.io-client";

export default class Games {
	authorizationToken: string;

	constructor(authorizationToken: string) {
		this.authorizationToken = authorizationToken;
	}

	private getRandomNumberInclusive(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Fetches the live feed of user bets
	 * @returns {anyPromise<FeedGame[]>}
	 */
	public async liveFeed(): Promise<FeedGame[]> {
		return await doRequest<FeedGame[]>({
			url: "https://api.betbux.gg/user/live-feed",
			method: "GET",
		});
	}

	/**
	 * Fetches a list of active battles given a game mode.
	 * @param {"stairs" | "mines" | "ludo" | "triple"} gameMode
	 * @returns {Promise<{ data: AllBattles[] | [] }>}
	 */
	public async getActiveBattles(
		gameMode: "stairs" | "mines" | "ludo" | "triple",
	): Promise<{
		data: AllBattles[] | [];
	}> {
		return await doRequest<{ data: AllBattles[] | [] }>({
			url: `https://api.betbux.gg/${gameMode}/get-active-battles`,
			method: "GET",
		});
	}

	/**
	 * Fetch dayta about a specific game via its battleId.
	 * @param {"stairs" | "mines" | "ludo" | "triple"} gameMode
	 * @param {number} battleId
	 * @returns {Promise<{ success: boolean; gameData?: AllBattles | { error: string }; reason?: string; }>}
	 */
	public async getGameData(
		gameMode: "stairs" | "mines" | "ludo" | "triple",
		battleId: number,
	): Promise<{
		success: boolean;
		gameData?:
			| AllBattles
			| { error: "No stairs battle by that id was found..." };
		reason?: string;
	}> {
		try {
			const gameData = await doRequest<
				AllBattles | { error: "No stairs battle by that id was found..." }
			>({
				url: `https://api.betbux.gg/${gameMode}/get-battle/${battleId}`,
				method: "GET",
			});

			return {
				success: true,
				gameData,
			};
		} catch (err) {
			return {
				success: false,
				reason: (err as AxiosError).message,
			};
		}
	}

	/**
	 * Play a game of ludo given a cost and amount of steps.
	 * @param {number} cost
	 * @param {35 | 49 | 63} steps
	 * @returns {Promise<GameOutcome>}
	 */
	@AuthorizationRequired
	public async playLudo(
		cost: number,
		steps: 35 | 49 | 63,
		players: 2 | 3 = 2,
	): Promise<GameOutcome> {
		const ludoGame: {
			success: boolean;
			reason?: string;
			battleId?: number;
			socket?: Socket;
		} = await createGame(this.authorizationToken, "LUDO", {
			maxPlayers: players,
			steps,
			rounds: 1,
			isPrivate: false,
			battleCost: cost,
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
	@AuthorizationRequired
	public async playStairs(
		cost: number,
		rocks: 3 | 2 | 4,
		players: 2 | 3 = 2,
	): Promise<GameOutcome> {
		const stairsGame: {
			success: boolean;
			reason?: string;
			battleId?: number;
			socket?: Socket;
		} = await createGame(this.authorizationToken, "STAIRS", {
			maxPlayers: players,
			rounds: 1,
			rocksPerRow: rocks,
			isPrivate: false,
			battleCost: cost,
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

	/**
	 * Play a game of mines.
	 * @param {number} cost
	 * @param {3 | 2 | 4} mines
	 * @param {2 | 3 = 2} players
	 * @returns {Promise<GameOutcome>}
	 */
	@AuthorizationRequired
	public async playMines(
		cost: number,
		mines: 3 | 2 | 4,
		players: 2 | 3 = 2,
	): Promise<GameOutcome> {
		const minesGame: {
			success: boolean;
			reason?: string;
			battleId?: number;
			socket?: Socket;
		} = await createGame(this.authorizationToken, "MINES", {
			maxPlayers: players,
			rounds: 1,
			minesNumber: mines,
			isPrivate: false,
			battleCost: cost,
		});

		return new Promise((resolve, reject) => {
			if (minesGame.success) {
				minesGame.socket?.on("MINES_BATTLE_ENDED", (winner) => {
					clearInterval(pickMineInterval);

					minesGame.socket?.emit("LEAVE-ROOM", `MINES-${minesGame.battleId}`);
					minesGame.socket?.disconnect();

					resolve({
						success: true,
						...winner,
					});
				});

				const pickMineInterval = setInterval(() => {
					const rand = this.getRandomNumberInclusive(0, 24);
					minesGame.socket?.emit("FLIP_MINES_TILE", minesGame.battleId, rand);
				}, 1000);
			} else {
				reject({
					success: false,
				});
			}
		});
	}

	/**
	 * Play a game of triple
	 * @param {number} cost
	 * @param {2 | 3 = 2} players
	 * @returns {Promise<GameOutcome>}
	 */
	@AuthorizationRequired
	public async playTriple(
		cost: number,
		players: 2 | 3 = 2,
	): Promise<GameOutcome> {
		const tripleGame: {
			success: boolean;
			reason?: string;
			battleId?: number;
			socket?: Socket;
		} = await createGame(this.authorizationToken, "TRIPLE", {
			maxPlayers: players,
			rounds: 1,
			isPrivate: false,
			battleCost: cost,
		});

		return new Promise((resolve, reject) => {
			if (tripleGame.success) {
				tripleGame.socket?.on("TRIPLE_BATTLE_ENDED", (winner) => {
					clearInterval(chooseCellInterval);

					tripleGame.socket?.emit(
						"LEAVE-ROOM",
						`TRIPLE-${tripleGame.battleId}`,
					);
					tripleGame.socket?.disconnect();

					resolve({
						success: true,
						winner,
					});
				});

				const chooseCellInterval = setInterval(() => {
					const rand = this.getRandomNumberInclusive(0, 34);
					tripleGame.socket?.emit(
						"CHANGE_CHOSEN_TILES",
						tripleGame.battleId,
						rand,
					);
				}, 500);
			} else {
				reject({
					success: false,
				});
			}
		});
	}
}
