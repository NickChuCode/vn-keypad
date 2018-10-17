<template>
  <div id="app">
    <m-head></m-head>
    <rank></rank>
  </div>
</template>

<script>
import MHead from 'components/m-header/m-header'
import Rank from 'components/rank/rank'
export default {
  name: 'App',
  components: {
    MHead,
    Rank
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable";
</style>
