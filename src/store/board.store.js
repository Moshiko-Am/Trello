import { boardService } from '../services/board.service.js';

export const boardStore = {
	state: {
		board: {},
	},
	getters: {
		board({ board }) {
			return board;
		},
	},
	mutations: {
		setBoard(state, { board }) {
			state.board = board;
		},
	},
	actions: {
		async loadBoard({ commit }, boardId) {
			try {
				const board = await boardService.getById(boardId);
				commit({ type: 'setBoard', board });
			} catch (err) {
				console.log('cant find board');
			}
		},
	},
	modules: {},
};
