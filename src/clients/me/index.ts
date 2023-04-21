import { Socket } from "socket.io-client";
import {
	doRequest,
	createWebsocketSession,
	AuthorizationRequired,
} from "../../functions";
import {
	StatusEarnDetailsType,
	WithdrawRobuxType,
	StatusEarnType,
	AffiliateType,
	AuthenticatedUserType,
	SingleTransaction,
	ChatResponse,
} from "./types";
import { AxiosError } from "axios";

export default class Me {
	authorizationToken: string;

	constructor(authorizationToken: string) {
		this.authorizationToken = authorizationToken;
	}

	/**
	 * Fetches details on the currently authenticated user.
	 * @returns {Promise<AuthenticatedUserType>}
	 */
	@AuthorizationRequired
	public async getAuthenticated(): Promise<AuthenticatedUserType> {
		return await doRequest<AuthenticatedUserType>({
			url: "https://api.betbux.gg/user/get-user",
			method: "GET",
			authorizationToken: this.authorizationToken,
		});
	}

	/**
	 * Attempt to withdraw robux given an amount.
	 * @param {number} amount
	 * @returns {Promise<WithdrawRobuxType>}
	 */
	@AuthorizationRequired
	public async withdrawRobux(amount: number): Promise<{
		success: boolean;
		data?: WithdrawRobuxType;
		reason?: string;
	}> {
		try {
			const withdrawData = await doRequest<WithdrawRobuxType>({
				url: "https://api.betbux.gg/p2p/withdraw-robux",
				method: "POST",
				authorizationToken: this.authorizationToken,
				payload: { amount },
			});

			return {
				success: true,
				data: withdrawData,
			};
		} catch (error) {
			return {
				success: false,
				reason: (error as AxiosError).message,
			};
		}
	}

	/**
	 * Cancels a robux transfer given a transfer type.
	 * @returns {Promise<{ success: boolean, reason?: string }>}
	 */
	@AuthorizationRequired
	public async cancelRobuxTransfer(): Promise<{
		success: boolean;
		reason?: string;
	}> {
		try {
			await doRequest({
				url: "https://api.betbux.gg/p2p/cancel-robux-transfer",
				method: "POST",
				authorizationToken: this.authorizationToken,
				payload: { type: "WITHDRAWAL" }, // TODO: Add cancel deposit.
			});

			return {
				success: true,
			};
		} catch (error) {
			return {
				success: false,
				reason: (error as AxiosError).message,
			};
		}
	}

	/**
	 * Gets details related to Status Earn.
	 * @returns {Promise<StatusEarnDetailsType["details"]>}
	 */
	@AuthorizationRequired
	public async getStatusEarnDetails(): Promise<
		StatusEarnDetailsType["details"]
	> {
		return (
			await doRequest<StatusEarnDetailsType>({
				url: "https://api.betbux.gg/earn/details",
				method: "GET",
				authorizationToken: this.authorizationToken,
			})
		).details;
	}

	/**
	 * Attempts to claim Status Earn.
	 * @returns {any}
	 */
	@AuthorizationRequired
	public async claimStatusEarn(): Promise<{
		success: boolean;
		reason?: string;
	}> {
		try {
			await doRequest<StatusEarnType>({
				url: "https://api.betbux.gg/earn/claim-statusearn",
				method: "POST",
				authorizationToken: this.authorizationToken,
			});

			return { success: true };
		} catch (error) {
			return { success: false, reason: (error as AxiosError).message };
		}
	}

	/**
	 * Fetches affiliate details.
	 * @returns {Promise<AffiliateType>}
	 */
	@AuthorizationRequired
	public async getAffiliateDetails(): Promise<AffiliateType> {
		return await doRequest<AffiliateType>({
			url: "https://api.betbux.gg/affiliates",
			method: "GET",
			authorizationToken: this.authorizationToken,
		});
	}

	/**
	 * Claims the authenticated users Affiliate Earn.
	 * @returns {Promise<{ success: boolean; reason?: string; }>}
	 */
	@AuthorizationRequired
	public async claimAffiliateEarn(): Promise<{
		success: boolean;
		reason?: string;
	}> {
		try {
			await doRequest({
				url: "https://api.betbux.gg/affiliates/claim-aff-bal",
				method: "POST",
				authorizationToken: this.authorizationToken,
			});

			return {
				success: true,
			};
		} catch (error) {
			return {
				success: false,
				reason: (error as AxiosError).message,
			};
		}
	}

	/**
	 * Updates the authentictaed users affiliate code.
	 * @param {string} newAffiliateCode
	 * @returns {Promise<{ success: boolean; reason?: string; }>}
	 */
	@AuthorizationRequired
	public async updateAffliateCode(newAffiliateCode: string): Promise<{
		success: boolean;
		reason?: string;
	}> {
		try {
			await doRequest({
				url: "https://api.betbux.gg/affiliates/update-affCode",
				method: "POST",
				authorizationToken: this.authorizationToken,
				payload: {
					newAffCode: newAffiliateCode,
				},
			});

			return {
				success: true,
			};
		} catch (error) {
			return {
				success: false,
				reason: (error as AxiosError).message,
			};
		}
	}

	/**
	 * Fetches the authenticated users transaction history.
	 * @param {number} pageSize
	 * @param {number} pageNumber
	 * @returns {Promise<{ success: boolean; transactionData?: SingleTransaction[]; reason?: string; }>}
	 */
	@AuthorizationRequired
	public async getTransactions(
		pageSize: number,
		pageNumber: number,
	): Promise<{
		success: boolean;
		transactionData?: SingleTransaction[];
		reason?: string;
	}> {
		try {
			const transactionData = await doRequest<SingleTransaction[] | []>({
				url: `https://api.betbux.gg/user/myTrans?pageSize=${pageSize}&pageNumber=${pageNumber}`,
				method: "GET",
				authorizationToken: this.authorizationToken,
			});

			if (transactionData.length === 0) {
				return {
					success: false,
					reason: "page not found",
				};
			}

			return {
				success: true,
				transactionData,
			};
		} catch (error) {
			return {
				success: false,
				reason: (error as AxiosError).message,
			};
		}
	}

	/**
	 * Send a message in the BetBux chat.
	 * @param {string} message
	 * @returns {Promise<ChatResponse>}
	 */
	@AuthorizationRequired
	public async sendMessage(message: string): Promise<ChatResponse> {
		const soc: Socket = await createWebsocketSession(this.authorizationToken);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				soc.emit("SEND_THE_MESSAGE", {
					content: message,
					battleId: "GENERAL",
				});
			}, 1000);

			soc.on("ERROR", (reason) => {
				soc.disconnect();

				reject({ success: false, reason });
			});

			soc.on("BROADCAST_THE_MESSAGE", (data) => {
				if (data[0].content === message) {
					soc.disconnect();

					resolve({ success: true });
				}
			});
		});
	}

	/**
	 * Send a tip via the sendMessage functionality.
	 * @param {number} recipientUserId
	 * @param {number} amountInRobux
	 * @returns {Promise<ChatResponse>}
	 */
	@AuthorizationRequired
	public async sendTip(
		recipientUserId: number,
		amountInRobux: number,
	): Promise<ChatResponse> {
		return this.sendMessage(`.tip ${recipientUserId} ${amountInRobux}`);
	}

	/**
	 * Start a giveaway via the sendMessage functionality.
	 * @param {number} amountInPeople
	 * @param {number} robuxPerPerson
	 * @returns {Promise<ChatResponse>}
	 */
	@AuthorizationRequired
	public async startGiveaway(
		amountInPeople: number,
		robuxPerPerson: number,
	): Promise<ChatResponse> {
		return this.sendMessage(`.giveaway ${amountInPeople} ${robuxPerPerson}`);
	}
}
