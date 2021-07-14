<template>
  <group-list />
</template>

<script>
// @ is an alias to /src
import groupList from "@/cmps/group.list.vue";
export default {
  name: "Home",
  components: {
    groupList,
  },
};
</script>
