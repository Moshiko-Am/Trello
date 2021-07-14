<template>
  <section class="card-preview">
      <h3>{{card.title}}</h3>
  </section>
</template>

<script>
export default {
    props: {
        card: Object
    }
}
</script>