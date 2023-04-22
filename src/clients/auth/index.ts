import { AxiosError } from "axios";
import { doRequest, generateRandomDeviceID } from "../../functions";
import { LoginFieldData, SuccessfulLoginData } from "./types";

export class Auth {
	readonly authorizationToken: string;

	constructor(authorizationToken: string) {
		this.authorizationToken = authorizationToken;
	}

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
