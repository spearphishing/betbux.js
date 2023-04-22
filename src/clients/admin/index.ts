import { AxiosError } from "axios";
import { doRequest, AuthorizationRequired } from "../../functions";

export default class Admin {
	readonly authorizationToken: string;

	constructor(authorizationToken: string) {
		this.authorizationToken = authorizationToken;
	}

	/**
	 * Mutes a user for a given amount of times in hours.
	 * @param {number} userId
	 * @param {number} mutePeriodInHours
	 * @returns {anPromise<{ success: boolean, reason?: string; }>}
	 */
	@AuthorizationRequired
	public async muteUser(
		userId: number,
		mutePeriodInHours: number,
	): Promise<{
		success: boolean;
		reason?: string;
	}> {
		try {
			doRequest({
				url: `https://api.betbux.gg/admin/users/mute/${userId}`,
				method: "POST",
				authorizationToken: this.authorizationToken,
				payload: {
					mutePeriodInHours,
				},
			});

			return {
				success: true,
			};
		} catch (err) {
			return {
				success: false,
				reason: (err as AxiosError).message,
			};
		}
	}

	/**
	 * Refunds a battle.
	 * @param {string} gameMode
	 * @param {number} battleId
	 * @returns {Promise<{ success: boolean, reason?: string; }>}
	 */
	@AuthorizationRequired
	public async refundBattle(
		gameMode: string,
		battleId: number,
	): Promise<{ success: boolean; reason?: string }> {
		try {
			await doRequest({
				url: "https://api.betbux.gg/admin/refund-battle",
				method: "POST",
				authorizationToken: this.authorizationToken,
				payload: {
					gameMode,
					battleId,
				},
			});

			return {
				success: true,
			};
		} catch (err) {
			return {
				success: false,
				reason: (err as AxiosError).message,
			};
		}
	}
}
