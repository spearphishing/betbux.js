export type InventoryItem = {
	limited_id: number;
	uaid: number;
	title: string;
	thumbnail: string;
	projected: false;
	limTypeNumber: number;
	priceRobux: number;
};

export type MarketPlaceEntry = {
	aduriteId: string;
	limited_id: string;
	marketPlace: string;
	price_usd: number;
	title: string;
	projected: false;
	thumbnail: string;
	limTypeNumber: number;
};
