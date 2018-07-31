<template>
  <div>
    <img :src="icons.search" height="32" width="32"/>
    <span>Nenhum resultado encontrado</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      icons: {
        search: require('@icons/search.png')
      }
    }
  }
}
</script>

<style scoped>
  span {
    font-size: 11px;
    font-weight: bold;
  }
</style>
