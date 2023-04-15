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
			soc.disconnect();
			const { battleId } = battleData;

			resolve({
				success: true,
				battleId,
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
