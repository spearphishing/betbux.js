import { userRoles } from "../user/types";

export type AuthenticatedUserType = {
	code: number;
	user: {
		id: string;
		muted: boolean | null;
		disabled: boolean | null;
		loginMethod: string;
		isDisabledWithdraw: boolean;
		email: string | null;
		robloxCookie: string;
		robloxCombination: null;
		displayName: string;
		role: userRoles;
		balance: number;
		totalWager: number;
		affBalance: number;
		totalDeposited: number;
		lastDeposited: string | null;
		freeRobux: number;
		totalaffEarned: number;
		affCode: string | null;
		StatusEarnBalance: number;
		nextPayout: string | null;
		discordStatus: string | null;
		statusEarnTotalEarned: number;
		statusEarnTotalPayouts: number;
		rakeback: number;
		level: number;
		nextLevel: number;
		joinedAt: string;
		deviceId: string | null;
		inviterId: string | null;
		cookieCountry: string;
	};
};

export type StatusEarnDetailsType = {
	details: {
		StatusEarnBalance: number;
		nextPayout: string;
		statusEarnTotalEarned: number;
		statusEarnTotalPayouts: number;
		discordStatus?: string;
		discord?: {
			avatar: string;
			username: string;
			discriminator: string;
			id: string;
		};
		statusEarnRate: string;
	};
};

export type WithdrawRobuxType = {
	remaining: number;
	original: number;
	userId?: string;
	existed?: boolean;
};

export type StatusEarnType = {
	error?: string;
	code?: number;
	message: string;
};

export type AffiliateType = {
	affBalance: number;
	affCode: string;
	totalaffEarned: number;
	inviter: string | null;
	supporters: string[];
	_count: {
		supporters: number;
	};
};

export type SingleTransaction = {
	id: number;
	userId: string;
	initBy: unknown; // i have no idea what initBy is
	transactionAmount: number;
	transactionType: string;
	balanceAfter: number;
	timeStamp: string;
};
