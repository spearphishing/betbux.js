export type feedGame = {
	betAmount: number;
	game: "MINES" | "STAIRS" | "LUDO" | "TRIPLE";
	multi: number;
	payout: number;
	time: string;
	user: {
		id: string;
		displayName: string;
		balance: number;
	}[];
};

export type GameOutcome = {
	success: boolean;
	winner?: { id: string; displayName: string; balance: number };
	reason?: string;
};
