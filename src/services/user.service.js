var gUsers = [
	{
		_id: 'u101',
		fullname: 'Abi Abambi',
		username: 'abi1',
		password: 'aBambi123',
		imgUrl: 'http://some-img.jpg',
		mentions: [
			{
				id: 'm101',
				boardId: 'm101',
				cardId: 't101',
			},
		],
	},
];

import { storageService } from './async-storage.service.js';
// import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service';
const USER_KEY = 'loggedinUser';
const USERS_DB = 'allUsers';
// var gWatchedUser = null;

export const userService = {
	query,
	login,
	logout,
	signup,
	getById,
	remove,
	update,
	getLoggedinUser,
};

window.userService = userService;
// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})
// userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 100})

// async function getUsers() {
// 	try{
//         return storageService.query(USER_KEY);

//     }
// 	// return httpService.get(`user`)
// }
async function query() {
	try {
		const users = await storageService.query(USERS_DB);
		if (!users.length) {
			console.log('hey');
			storageService.postMany(USERS_DB, gUsers);
			return gUsers;
		}
		return users;
	} catch (err) {
		console.log(err);
	}
}

async function getById(userId) {
	const user = await storageService.get(USER_KEY, userId);
	// const user = await httpService.get(`user/${userId}`)
	// gWatchedUser = user;
	return user;
}
function remove(userId) {
	return storageService.remove(USER_KEY, userId);
	// return httpService.delete(`user/${userId}`)
}

async function update(user) {
	await storageService.put(USER_KEY, user);
	// user = await httpService.put(`user/${user._id}`, user)
	// Handle case in which admin updates other user's details
	if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
	return user;
}

async function login(userCred) {
	const users = await storageService.query(USER_KEY);
	const user = users.find((user) => user.username === userCred.username);
	return user;
	// return _saveLocalUser(user)

	// const user = await httpService.post('auth/login', userCred)
	// socketService.emit('login', user._id);
	// if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
	const user = await storageService.post(USER_KEY, userCred);
	// const user = await httpService.post('auth/signup', userCred)
	// socketService.emit('set-user-socket', user._id);
	return _saveLocalUser(user);
}
async function logout() {
	sessionStorage.removeItem(USER_KEY);
	// socketService.emit('unset-user-socket');
	// return await httpService.post('auth/logout')
}

function _saveLocalUser(user) {
	sessionStorage.setItem(USER_KEY, JSON.stringify(user));
	return user;
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(USER_KEY) || 'null');
}

// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
// 	var user = getLoggedinUser();
// 	// Dev Helper: Listens to when localStorage changes in OTHER browser

// 	// Here we are listening to changes for the watched user (comming from other browsers)
// 	window.addEventListener('storage', async () => {
// 		if (!gWatchedUser) return;
// 		const freshUsers = await storageService.query(USER_KEY);
// 		const watchedUser = freshUsers.find((u) => u._id === gWatchedUser._id);
// 		if (!watchedUser) return;
// 		if (gWatchedUser.score !== watchedUser.score) {
// 			console.log(
// 				'Watched user score changed - localStorage updated from another browser'
// 			);
// 			socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser);
// 		}
// 		gWatchedUser = watchedUser;
// 	});
// })();

// This is relevant when backend is connected
// (async () => {
//     var user = getLoggedinUser()
//     if (user) socketService.emit('set-user-socket', user._id)
// })();
