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
	players?: { id: string; displayName: string }[];
};

interface GameData {
	id: number;
	active: boolean;
	finished: boolean;
	spots: 2 | 3;
	gameCost: number;
	currentPlayer: string;
	totalRounds: number;
	currentRound: number;
	createdAt: string;
	creator: string;
	isPrivate: boolean;
	players: {
		state: "LOST" | "NONE";
		currentRow: number;
		currentIndex: number;
		displayName: string;
		id: string;
	}[];
}

export type StairsGameData = GameData & {
	ladders: number[][];
	stones: number[][];
	filledItems: object;
	currentRow: number;
	stonesPerRow: number;
};

export type LudoGameData = GameData & {
	mapName: string;
	totalSteps: number;
	currentStep: number;
	boosters: {
		[key: string]: number;
	};
	slowers: {
		[key: string]: number;
	};
};

export type MinesGameData = GameData & {
	minesNumber: 2 | 3 | 4;
	creatorClientSeed?: string;
	serverSeed?: string;
	hashedServerSeed?: string;
	bombsHistory: {
		index: number;
		shouldExplode: boolean;
		flipperId: string;
	}[];
};

export type TripleGameData = GameData & {
	tripleHistory: number[];
	chosenTiles: {
		[key: string]: {
			displayName: string;
			id: string;
			state: "NONE" | "WINNER";
			identifyingColor: number;
		};
	};
	tripleSolution: number[];
};
