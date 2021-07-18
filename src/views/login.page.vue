<template>
  <section class="login-page">
    <h3 v-if="!isSignup">Log in</h3>
    <h3 v-else>Sign Up</h3>
    <form>
      <el-input
        v-if="!isSignup"
        placeholder="Username"
        v-model="loginCr.username"
      ></el-input>
      <el-input
        v-else
        placeholder="Username"
        v-model="signupCr.username"
      ></el-input>
      <el-input
        v-if="!isSignup"
        placeholder="Password"
        v-model="loginCr.password"
      ></el-input>
      <el-input
        v-else
        placeholder="Password"
        v-model="signupCr.password"
      ></el-input>
      <el-input
        v-if="!isSignup"
        placeholder="Full Name"
        v-model="signupCr.fullname"
      ></el-input>
      <button v-if="!isSignup" class="btn login" @click="login">Log in</button>
      <button v-else @click="signup" class="btn signup">Sign up</button>
    </form>
    <span v-if="isSignup" @click="toggleSignup">Already have an account</span>
    <span v-else @click="toggleSignup">Create an account</span>
  </section>
</template>

<script>
export default {
  name: "Login",
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
    login() {
      console.log("Logged in", this.loginCr);
      //   this.$store.dispatch({ type: "login", loginCr: this.loginCr });
    },
    signup() {
      console.log("signed up", this.signupCr);
      //   this.$store.dispatch({ type: "signup", signupCr: this.signupCr });
    },
  },
};
</script>

<style>
</style>