<template>
  <div class="order-page">
    <input v-model="formData.email">
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        email: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
