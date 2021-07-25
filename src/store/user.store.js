import { userService } from '../services/user.service.js';
import { socketService } from "../services/socket.service.js"
export const userStore = {
	state: {
		users: [],
		loggedInUser: userService.getLoggedinUser() || {
			username: 'guest',
			fullname: 'Guest User',
			_id:''
		},
	},
	getters: {
		loggedInUser(state) {
			return state.loggedInUser;
		},
		users(state) {
			return state.users;
		},
		user(state) {
			return state.users.find(user => user._id === state.loggedInUser._id) || {
				username: 'guest',
				fullname: 'Guest User',
				_id:''
			}
		}
	},
	mutations: {
		setLoggedinUser(state, { user }) {
			state.loggedInUser = JSON.parse(JSON.stringify(user));
		},
		setUsers(state, { users }) {
			state.users = users;
		},
		updateUser(state, { updatedUser }) {
			const id = updatedUser._id;
			const userIdx = state.users.findIndex((user) => {
				return user._id === id;
			});
			state.users.splice(userIdx, 1, updatedUser);
		},
	},
	actions: {
		async updateUser({ commit }, { userToUpdate }) {
			const updatedUser = await userService.update(userToUpdate);
			commit({ type: 'updateUser', updatedUser });
		},
		async loadUsers({ commit }) {
			try {
				const users = await userService.query();
				commit({ type: 'setUsers', users });
			} catch (err) {
				console.log("Couldn't load users");
			}
		},
		async login({ commit }, { userCred }) {
			try {
				const user = await userService.login(userCred);
				socketService.emit("user-watch", user._id);
				commit({ type: 'setLoggedinUser', user });
				return user;
			} catch (err) {
				console.log('userStore: Error in login', err);
				throw err;
			}
		},
		async signup({ commit }, { userCred }) {
			try {
				const user = await userService.signup(userCred);
				commit({ type: 'setLoggedinUser', user });
				return user;
			} catch (err) {
				console.log('userStore: Error in signup', err);
				throw err;
			}
		},
		async logout({ commit }) {
			try {
				await userService.logout();
				commit({
					type: 'setLoggedinUser',
					user: { username: 'guest', fullname: 'Guest User' },
				});
			} catch (err) {
				console.log('userStore: Error in logout', err);
				throw err;
			}
		},
	},
};
