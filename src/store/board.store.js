import { boardService } from '../services/board.service.js';

export const boardStore = {
	state: {
		selectedBoard: {},
		boards: null,
	},
	getters: {
		board({ selectedBoard }) {
			return selectedBoard;
		},
		boardStyle({ selectedBoard }) {
			if (selectedBoard) return selectedBoard.style;
		},
		boards({ boards }) {
			return boards;
		},
	},
	mutations: {
		getBoardById(state, boardId) {
			state.selectedBoard = state.boards.find(
				(board) => board._id === boardId
			);
			console.log(state.selectedBoard);
			return state.selectedBoard;
		},
		setBoards(state, { boards }) {
			state.boards = boards;
		},
		saveBoard(state, { savedBoard }) {
			const idx = state.boards.findIndex(
				(board) => board._id === savedBoard._id
			);
			state.boards.splice(idx, 1, savedBoard);
			state.selectedBoard = savedBoard;
		},
		addBoard(state, { board }) {
			state.boards.push(board);
			state.selectedBoard = board;
		},
		clearStyle(state) {
			state.selectedBoard = null;
		},
	},
	actions: {
		async loadBoards({ commit }) {
			try {
				const boards = await boardService.query();
				commit({ type: 'setBoards', boards });
			} catch (err) {
				console.log("Couldn't load boards");
			}
		},
		async addBoard({ commit }, { board }) {
			try {
				board = await boardService.add(board);
				commit({ type: 'addBoard', board });
				return board;
			} catch (err) {
				console.log('boardStore: Error in addBoard', err);
				throw err;
			}
		},
		async removeBoard({ commit }, { boardId }) {
			try {
				await boardService.remove(boardId);
				commit({ type: 'removeBoard', boardId });
			} catch (err) {
				console.log('boardStore: Error in removeBoard', err);
				throw err;
			}
		},
		async saveBoard({ commit }, { board }) {
			try {
				const savedBoard = await boardService.save(board);
				commit({ type: 'saveBoard', savedBoard });
			} catch (err) {
				console.log(`couldn't save board`, err);
			}
		},
	},
};
