// import { storageService } from './async-storage.service.js';
import { httpService } from './http.service.js';

const URL = 'board/';
// const BOARD_KEY = 'boardsDB';

export const boardService = {
    query,
    getById,
    remove,
    add,
    save,
};

query();

async function query() {
    try {
        // const boards = await storageService.query(BOARD_KEY);
        const boards = await httpService.get(URL);
        // if (!boards.length) {
        // 	storageService.postMany(BOARD_KEY, gBoards);
        // 	return gBoards;
        // }
        return boards;
    } catch (err) {
        console.log(err);
    }
}

async function getById(boardId) {
    try {
        // const board = await storageService.get(BOARD_KEY, boardId);
        const board = httpService.get(URL + boardId);
        return board;
    } catch (err) {
        console.log(err);
    }
}

async function remove(boardId) {
    // return storageService.delete('board', boardId);
    try {
        const res = await httpService.delete(`board/${boardId}`);
        return res;
    } catch (err) {
        console.log('Failed to delete board', err);
    }
}
async function add(board) {
    // const addedBoard = storageService.post(BOARD_KEY, board);
    try {
        const addedBoard = httpService.post(URL, { board: board });
        return addedBoard;
    } catch (err) {
        console.log(`couldn't create board`, err);
    }

    // return addedBoard;
}

async function save(boardToSave) {
    try {
        // const savedBoard = await storageService.put(BOARD_KEY, boardToSave);
        const savedBoard = await httpService.put(URL, { board: boardToSave });
        return savedBoard;
    } catch (err) {
        console.log(`couldn't save board`, err);
    }
}