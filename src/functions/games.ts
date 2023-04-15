import { createWebsocketSession } from "./requests";
import { Socket } from "socket.io-client";

export async function createLudoGame(
	authorizationToken: string,
	options: {
		cost: number;
		steps: 35 | 49 | 63;
	},
): Promise<{
	success: boolean;
	reason?: string;
	battleId?: number;
	socket?: Socket;
}> {
	const soc: Socket = await createWebsocketSession(authorizationToken);

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			soc.emit("CREATE_LUDO_BATTLE", {
				maxPlayers: 2,
				steps: options.steps,
				rounds: 1,
				isPrivate: false,
				battleCost: options.cost,
			});
		}, 1000);

		soc.on("CREATE_LUDO_BATTLE_SUCCESS", (battleData: { battleId: number }) => {
			const { battleId } = battleData;

			soc.emit("JOIN-ROOM", `LUDO-${battleId}`);
			soc.emit("CALL_BOT_LUDO", battleId);

			resolve({
				success: true,
				battleId,
				socket: soc,
			});
		});

		soc.on("CREATE_LUDO_BATTLE_FAIL", (reason) => {
			soc.disconnect();

			reject({
				success: false,
				reason,
			});
		});
	});
}
