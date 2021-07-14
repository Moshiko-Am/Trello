import { boardService } from '../services/board.service.js';

export const boardStore = {
	state: {
		selectedBoard: {},
		boards: {},
	},
	getters: {
		board({ selectedBoard }) {
			return selectedBoard;
		},
	},
	mutations: {
		getBoardById(state, boardId) {
			state.selectedBoard = state.boards.find(board => board._id === boardId)
		},
		setBoards(state, { boards }) {
			state.boards = boards
		},
		saveBoard(state, savedBoard) {
			const idx = state.boards.findIndex(board => board._id === savedBoard._id)
			state.boards.splice(idx, 1, savedBoard)
		}
	},
	actions: {
		async loadBoards({ commit }) {
			try {
				const boards = await boardService.query()
				commit({ type: 'setBoards', boards })
			} catch (err) {
				console.log('Couldn\'t load boards');
			}
		}, async addBoard({ commit }, { board }) {
			try {
				board = await boardService.add(board)
				commit({ type: 'addBoard', board })

				return board;
			} catch (err) {
				console.log('boardStore: Error in addBoard', err)
				throw err
			}
		},
		async removeBoard({ commit }, { boardId }) {
			try {
				await boardService.remove(boardId);
				commit({ type: 'removeBoard', boardId })
			} catch (err) {
				console.log('boardStore: Error in removeBoard', err)
				throw err
			}
		},
		async saveBoard({ commit }, { savedBoard }) {
			try {
				await boardService.save(savedBoard)
				commit({ type: 'saveBoard', savedBoard })
			} catch (err) {
				console.log(`couldn't save board`, err);
			}
		}
	},
};
