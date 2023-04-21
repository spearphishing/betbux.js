import { doRequest, AuthorizationRequired } from "../../functions";
import { InventoryItem, MarketPlaceEntry } from "./types";
import { AxiosError } from "axios";

export default class MarketPlace {
	authorizationToken: string;

	constructor(authorizationToken: string) {
		this.authorizationToken = authorizationToken;
	}

	/**
	 * Fetches the authenticated users limited inventory.
	 * @returns {Promise<{ success: boolean; data?: InventoryItem[]; reason?: string }>}
	 */
	@AuthorizationRequired
	public async getInventory(): Promise<{
		success: boolean;
		data?: InventoryItem[];
		reason?: string;
	}> {
		try {
			const userInventory: { data: InventoryItem[] } = await doRequest<{
				data: InventoryItem[];
			}>({
				url: "https://api.betbux.gg/marketplace/list-inventory",
				method: "GET",
				authorizationToken: this.authorizationToken,
			});

			return {
				success: true,
				...userInventory,
			};
		} catch (error) {
			return {
				success: false,
				reason: (error as AxiosError).message,
			};
		}
	}

	@AuthorizationRequired
	public async getListed(): Promise<{
		success: boolean;
		data?: MarketPlaceEntry[];
		reason?: string;
	}> {
		try {
			const listedItems: MarketPlaceEntry[] = (
				await doRequest<{ data: MarketPlaceEntry[] }>({
					url: "https://api.betbux.gg/marketplace/get-listed",
					method: "GET",
					authorizationToken: this.authorizationToken,
				})
			).data;

			return {
				success: true,
				data: listedItems,
			};
		} catch (error) {
			return {
				success: false,
				reason: (error as AxiosError).message,
			};
		}
	}
}
