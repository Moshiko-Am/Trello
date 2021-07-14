export const userStore = {
    state: {
        loggedInUser : {},
	},
	getters: {
		user(state){
            return state.loggedInUser
        }
	},
	mutations: {
        setLoggedinUser(state, { user }) {
            // Yaron: needed this workaround as for score not reactive from birth
            state.loggedInUser = {...user}
        },
	},
	actions: {
        async login({ commit }, { userCred }) {
            try {
                const user = await userService.login(userCred);
                commit({ type: 'setLoggedinUser', user })
                return user;
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup({ commit }, { userCred }) {
            try {
                const user = await userService.signup(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user;
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }

        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
	},
}