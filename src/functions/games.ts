import { createWebsocketSession } from "./requests";
import { Socket } from "socket.io-client";

type CreateGameResponse = {
	success: boolean;
	reason?: string;
	battleId?: number;
	socket?: Socket;
};

interface GameArguments {
	maxPlayers: number;
	rounds: number;
	isPrivate: boolean;
	battleCost: number;
}

type StairsArguments = GameArguments & {
	rocksPerRow: number;
};

type LudoArguments = GameArguments & {
	steps: number;
};

export async function createGame(
	authorizationToken: string,
	gameMode: string,
	argument: StairsArguments | LudoArguments,
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

		soc.on(`CREATE_${gameMode.toUpperCase()}_BATTLE_FAIL`, (reason) => {
			soc.disconnect();

			reject({
				success: false,
				reason,
			});
		});
	});
}
