<template>
	<section class="login-page">
		<h3 v-if="!isSignup">Log in</h3>
		<h3 v-else>Sign Up</h3>
		<form>
			<el-input
				v-if="isSignup"
				placeholder="Username"
				v-model="signupCr.username"
			></el-input>
			<el-input
				v-else
				placeholder="Username"
				v-model="loginCr.username"
			></el-input>
			<el-input
				placeholder="Password"
				show-password
				v-if="isSignup"
				v-model="signupCr.password"
			></el-input>
			<el-input
				v-else
				placeholder="Password"
				show-password
				v-model="loginCr.password"
			></el-input>
			<el-input
				v-if="isSignup"
				placeholder="Full Name"
				v-model="signupCr.fullname"
			></el-input>
			<button v-if="isSignup" @click="signup" class="btn signup">
				Sign up
			</button>
			<button v-else class="btn login" @click="login">Log in</button>
		</form>
		<span v-if="isSignup" @click="toggleSignup"
			>Already have an account</span
		>
		<span v-else @click="toggleSignup">Create an account</span>
	</section>
</template>

<script>
// import { extend } from 'vee-validate';
// import { ValidationProvider } from 'vee-validate';
// extend('positive', (value) => {
// 	return value >= 0;
// });
export default {
	name: 'Login',
	components: {
		// ValidationProvider,
	},
	data() {
		return {
			loginCr: {
				username: '',
				password: '',
			},
			signupCr: {
				username: '',
				password: '',
				fullname: '',
			},
			isSignup: false,
		};
	},
	methods: {
		toggleSignup() {
			this.isSignup = !this.isSignup;
		},
		async login() {
			if(!this.loginCr.username || !this.loginCr.password) return
			try {
				const logged = await this.$store.dispatch({
					type: 'login',
					userCred: this.loginCr,
				});
				if (logged) this.$router.push('/boards');
			} catch (err) {
				console.log(err, 'cant login');
			}
		},
		signup() {
			if(!this.signupCr.username || !this.signupCr.password || !this.signupCr.fullname) return
			try {
				const user = this.$store.dispatch({ type: 'signup', userCred: this.signupCr });
				if(user) this.$router.push('/boards')
			} catch(err){
				console.log(err,'cant signup');
			}
			
			
		},
	},
	created() {
		this.$store.commit('clearStyle');
	},
};
</script>

<style></style>
