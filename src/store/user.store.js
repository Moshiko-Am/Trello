import { userService } from '../services/user.service.js';

export const userStore = {
	state: {
		users: [],
		loggedInUser: {
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
	},
	getters: {
		user(state) {
			return state.loggedInUser;
		},
		users(state) {
			return state.users;
		},
	},
	mutations: {
		setLoggedinUser(state, { user }) {
			state.loggedInUser = { ...user };
		},
		setUsers(state, { users }) {
			state.users = users;
		},
	},
	actions: {
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
				commit({ type: 'setLoggedinUser', user: null });
			} catch (err) {
				console.log('userStore: Error in logout', err);
				throw err;
			}
		},
	},
};
