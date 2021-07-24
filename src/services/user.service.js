import { storageService } from './async-storage.service.js';
import { httpService } from './http.service';
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service';
const USER_KEY = 'loggedinUser';
const USERS_DB = 'allUsers';
const URL = 'user/';
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

async function query() {
	try {
		// const users = await storageService.query(USERS_DB);
		const users = await httpService.get(URL)
		if (!users.length) {
			storageService.postMany(USERS_DB, users);
			return users;
		}
		return users;
	} catch (err) {
		console.log(err);
	}
}

async function getById(userId) {
    // const user = await storageService.get(USER_KEY, userId);
    try {
        const user = await httpService.get(`user/${userId}`);
        return user;
    } catch (err) {
        console.log('Failed to get user', err);
    }
    // gWatchedUser = user;
    // return user;
}

async function remove(userId) {
    // return storageService.remove(USER_KEY, userId);
    try {
        return httpService.delete(`user/${userId}`);
    } catch (err) {
        console.log('Failed to delete user', err);
    }
}

async function update(user) {
    // await storageService.put(USER_KEY, user);

    try {
        console.log(user._id);
        user = await httpService.put(`user/${user._id}`, user);
        if (getLoggedinUser()._id === user._id || getLoggedinUser.isAdmin)
            _saveLocalUser(user);
        return user;
    } catch (err) {
        console.log('Failed to update user', err);
    }

    // Handle case in which admin updates other user's details
    // if (getLoggedinUser()._id === user._id || getLoggedinUser.isAdmin) _saveLocalUser(user);
    // return user;
}

async function login(userCred) {
    // const users = await storageService.query(USER_KEY);
    // const user = users.find((user) => user.username === userCred.username);
    // return user;
    // return _saveLocalUser(user)

    try {
        const user = await httpService.post('auth/login', userCred);
        // socketService.emit('login', user._id);
        if (user) return _saveLocalUser(user);
    } catch (err) {
        console.log('username or password are incorrect', err);
    }
}
async function signup(userCred) {
    // const user = await storageService.post(USER_KEY, userCred);
    // return _saveLocalUser(user);
    try {
        const user = await httpService.post('auth/signup', userCred);
        // socketService.emit('set-user-socket', user._id);
        return _saveLocalUser(user);
    } catch (err) {
        console.log('Failed to create user', err);
    }
}
async function logout() {
    try {
        sessionStorage.removeItem(USER_KEY);
        // socketService.emit('unset-user-socket');
        return await httpService.post('auth/logout');
    } catch (err) {
        console.log('failed to logout', err);
    }
}
function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || 'null');
}


function _saveLocalUser(user) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
}


// This is relevant when backend is connected
// (async () => {
//     var user = getLoggedinUser()
//     if (user) socketService.emit('set-user-socket', user._id)
// })();

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