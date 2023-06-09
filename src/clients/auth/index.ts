import { AxiosError } from "axios";
import { doRequest, generateRandomDeviceID } from "../../functions";
import { LoginFieldData, SuccessfulLoginData } from "./types";

export default class Auth {
	readonly authorizationToken: string;

	constructor(authorizationToken: string) {
		this.authorizationToken = authorizationToken;
	}

	/**
	 * Attempts to login/initiate a login session with the provided credentials.
	 * @param {string} username
	 * @param {string} password
	 * @param {string} captchaId?
	 * @param {string} captchaToken?
	 * @returns {Promise<{ success: boolean, loginData?: LoginFieldData | SuccessfulLoginData, reason?: string }>}
	 */
	public async loginWithCredentials(
		username: string,
		password: string,
		captchaId?: string,
		captchaToken?: string,
	): Promise<{
		success: boolean;
		loginData?: LoginFieldData | SuccessfulLoginData;
		reason?: string;
	}> {
		try {
			const loginData = await doRequest<LoginFieldData | SuccessfulLoginData>({
				url: "https://api.betbux.gg/login/roblox-user-pass",
				method: "POST",
				payload: {
					username,
					password,
					captchaId,
					captchaToken,
					deviceId: generateRandomDeviceID(),
				},
			});

			return {
				success: true,
				loginData,
			};
		} catch (error) {
			return {
				success: false,
				reason: (error as AxiosError).message,
			};
		}
	}
}
