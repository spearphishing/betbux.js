import { GameOutcome } from "../clients/games/types";
import { createWebsocketSession } from "./requests";
import { Socket } from "socket.io-client";

type CreateGameResponse = {
	success: boolean;
	reason?: string;
	battleId?: number;
	socket?: Socket;
};

type GameArguments = {
	maxPlayers: number;
	rounds: number;
	isPrivate: boolean;
	battleCost: number;
}

type StairsArguments = GameArguments & { rocksPerRow: number };
type LudoArguments = GameArguments & { steps: number };
type MinesArguments = GameArguments & { minesNumber: number };

/**
 * Tries to create a game given a game mode.
 * @param {string} authorizationToken
 * @param {string} gameMode
 * @param {GameArguments | StairsArguments | LudoArguments | MinesArguments} argument
 * @returns {Promise<CreateGameResponse>}
 */
export async function createGame(
	authorizationToken: string,
	gameMode: string,
	argument: GameArguments | StairsArguments | LudoArguments | MinesArguments,
): Promise<CreateGameResponse> {
	const soc: Socket = await createWebsocketSession(authorizationToken);

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			soc.emit(`CREATE_${gameMode.toUpperCase()}_BATTLE`, argument);
		}, 100);

		soc.on(
			`CREATE_${gameMode.toUpperCase()}_BATTLE_SUCCESS`,
			(battleData: { battleId: number }) => {
				const { battleId } = battleData;

				soc.emit("JOIN-ROOM", `${gameMode.toUpperCase()}-${battleId}`);

				for (const _ of Array.from({ length: argument.maxPlayers - 1 })) {
					setTimeout(() => {
						soc.emit(`CALL_BOT_${gameMode.toUpperCase()}`, battleId);
					}, 1000);
				}

				resolve({
					success: true,
					battleId,
					socket: soc,
				});
			},
		);

		soc.on(`CREATE_${gameMode.toUpperCase()}_BATTLE_FAIL`, (reason: object) => {
			soc.disconnect();

			reject({
				success: false,
				reason,
			});
		});
	});
}

/**
 * Automate gameplay of a given game.
 * @param {string} authorizationToken
 * @param {"stairs" | "mines" | "ludo" | "triple"} gameMode
 * @param {(socket: Socket | undefined, battleId: number | undefined) => void} betFunction
 * @returns {Promise<GameOutcome>}
 */
export async function gameHandler(
	authorizationToken: string,
	gameMode: "stairs" | "mines" | "ludo" | "triple",
	betFunction: (
		socket: Socket | undefined,
		battleId: number | undefined,
	) => void,
	initializationArguments:
		| GameArguments
		| StairsArguments
		| LudoArguments
		| MinesArguments,
): Promise<GameOutcome> {
	const game: CreateGameResponse = await createGame(
		authorizationToken,
		gameMode,
		initializationArguments,
	);

	return new Promise((resolve, reject) => {
		if (game.success) {
			const betInterval = setInterval(() => {
				betFunction(game.socket, game.battleId);
			}, 1000);

			game.socket?.on(
				`${gameMode.toUpperCase()}_BATTLE_ENDED`,
				(winner: { id: string; displayName: string; balance: number }) => {
					clearInterval(betInterval);

					game.socket?.emit(
						"LEAVE-ROOM",
						`${gameMode.toUpperCase()}-${game.battleId}`,
					);
					game.socket?.disconnect();

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
