export enum userRoles {
	"USER",
	"ADMIN",
}

export type UserType = {
	affCode: string | null;
	discord?: {
		id: string;
		username: string;
		discriminator: string;
	};
	displayName: string;
	joinedAt: string;
	level: number;
	role: userRoles;
	totalWager: number;
	nextLevel: number;
	statusEarnTotalEarned: number;
	totalaffEarned: number;
	_count: {
		supporters: number;
		myTiktokLinks: number;
		transactions: number;
	};
};
