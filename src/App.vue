<template>
  <div id="app">
    <m-head></m-head>
    <example></example>
  </div>
</template>

<script>
import MHead from 'components/m-header/m-header'
import Example from 'components/example/example'
export default {
  name: 'App',
  components: {
    MHead,
    Example
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable";
</style>
