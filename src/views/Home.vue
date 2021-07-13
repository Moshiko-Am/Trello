<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <helloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import helloWorld from "@/cmps/hello.world.vue";

export default {
  name: "Home",
  components: {
    helloWorld,
  },
};
</script>
