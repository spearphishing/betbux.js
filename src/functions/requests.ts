// Socket debugging
// process.env.DEBUG = "*";

import axios from "axios";
import { io, Socket } from "socket.io-client";

type OptionsType = {
	url: string;
	method: string;
	authorizationToken?: string;
	payload?: object;
};

/**
 * Executes an HTTP request according to given options.
 * @param {OptionsType} options
 * @returns {ResponseType}
 */
export async function doRequest<ResponseType>(
	options: OptionsType,
): Promise<ResponseType> {
	const { data } = await axios.request({
		method: options.method,
		maxBodyLength: Infinity,
		url: options.url,
		headers: {
			Authorization: options.authorizationToken,
		},
		data: options.payload,
	});

	return data;
}

/**
 * Creates and returns an authorized websocket connection.
 * @param {string} authenticationToken
 * @returns {Promise<Socket>}
 */
export function createWebsocketSession(
	authenticationToken: string,
): Promise<Socket> {
	return new Promise((resolve, reject) => {
		const socket: Socket = io("wss://api.betbux.gg");

		socket.on("connect", () => {
			setTimeout(() => {
				socket.emit("WS_AUTH", authenticationToken);

				resolve(socket);
			}, 1000); // time to fully connect (needed)
		});

		socket.on("connect_error", (err: Error) => {
			reject(new Error(`Unable to connect to betbux: ${err}`));
		});
	});
}
