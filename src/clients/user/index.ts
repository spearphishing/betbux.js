import { doRequest } from "../../functions";
import { UserType } from "./types";

export default class Users {
	authorizationToken: string;

	constructor(authorizationToken: string) {
		this.authorizationToken = authorizationToken;
	}

	/**
	 * Fetches a BetBux user via their ID.
	 * @param {number} uid
	 * @returns {{ success: boolean, data?: UserType, reason?: string }}
	 */
	public async getUser(uid: number): Promise<{
		success: boolean;
		data?: UserType;
		reason?: string;
	}> {
		const userInfo = await doRequest<UserType | string>({
			url: `https://api.betbux.gg/user/user-profile/${uid}`,
			method: "GET",
		});

		if (typeof userInfo === "string") {
			return {
				success: false,
				reason: "User could not be found.",
			};
		}

		return {
			success: true,
			data: userInfo,
		};
	}
}
