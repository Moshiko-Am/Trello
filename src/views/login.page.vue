<template>
  <section class="login-page">
    <h3 v-if="!isSignup">Log in to Trailing</h3>
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
      <transition name="fade">
        <el-input
          v-if="isSignup"
          placeholder="Full Name"
          v-model="signupCr.fullname"
        ></el-input>
      </transition>
      <button v-if="isSignup" @click="signup" class="btn signup">
        Sign up
      </button>
      <button v-else class="btn login" @click="login">Log in</button>
    </form>
    <div v-if="isSignup" @click="toggleSignup" class="link">
      Already have an account
    </div>
    <div v-else @click="toggleSignup" class="link">Sign up for an account</div>
  </section>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      loginCr: {
        username: "",
        password: "",
      },
      signupCr: {
        username: "",
        password: "",
        fullname: "",
      },
      isSignup: false,
    };
  },
  methods: {
    toggleSignup() {
      this.isSignup = !this.isSignup;
    },
    async login() {
      if (!this.loginCr.username || !this.loginCr.password) return;
      try {
        const logged = await this.$store.dispatch({
          type: "login",
          userCred: this.loginCr,
        });
        if (logged) this.$router.push("/boards");
      } catch (err) {
        console.log(err, "cant login");
      }
    },
    async signup() {
      if (
        !this.signupCr.username ||
        !this.signupCr.password ||
        !this.signupCr.fullname
      )
        return;
      try {
        const user = await this.$store.dispatch({
          type: "signup",
          userCred: this.signupCr,
        });
        if (user) this.$router.push("/boards");
      } catch (err) {
        console.log(err, "cant signup");
      }
    },
  },
  created() {
    this.$store.commit("clearStyle");
  },
};
</script>

<style></style>
