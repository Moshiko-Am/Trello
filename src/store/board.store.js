import { boardService } from '../services/board.service.js';
import { templateService } from '../services/template.service.js';

export const boardStore = {
	state: {
		selectedBoard: {},
		boards: null,
		currFilter: '',
		templates: templateService.query(),
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
		boardsForDisplay(state) {
			const searchStr = new RegExp(state.currFilter, 'i');
			if (state.currFilter === '') return state.boards;
			return state.boards.filter((board) => {
				if (searchStr.test(board.title)) {
					return board;
				}
			});
		},
		templates(state) {
			return state.templates;
		},
	},
	mutations: {
		getBoardById(state, boardId) {
			state.selectedBoard = state.boards.find(
				(board) => board._id === boardId
			);
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
		cardChanged(state, { card }) {
			state.selectedBoard.groups[card.gIdx].cards.splice(
				card.cIdx,
				1,
				card.payload
			);
		},
		groupsChanged(state, { groups }) {
			state.selectedBoard.groups = groups;
		},
		titleChanged(state, { title }) {
			state.selectedBoard.title = title;
		},
		styleChanged(state, { style }) {
			state.selectedBoard.style = style.payload;
		},
		membersChanged(state, { members }) {
			state.selectedBoard.members = members;
		},
		setFilter(state, { filterBy }) {
			state.currFilter = filterBy;
		},
		removeBoard(state, { boardId }) {
			const idx = state.boards.findIndex(
				(board) => board._id === boardId
			);
			state.boards.splice(idx, 1);
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
