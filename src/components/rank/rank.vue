<template>
    <div class="rank" ref="rank">
      <div class="box-wrapper">
        <div class="input-box" @click.stop="show">
          <input ref="numInput" @focus="closeKeyboard" class="box" :placeholder="placeholder" v-model="cash">
          <i class="icon-dismiss" @click="clear" v-show="cash"></i>
        </div>
      </div>
      <keypad ref="calculator" :inputNum="cash" @numberChange="changeValue"></keypad>
    </div>
</template>
<script>
import Keypad from 'base/keypad/keypad'
export default {
  data() {
    return {
      placeholder: '请输入金额',
      cash: ''
    }
  },
  components: {
    Keypad
  },
  methods: {
    clear() {
      this.cash = ''
    },
    show() {
      this.$refs.calculator.show()
    },
    changeValue(val) {
      this.cash = val
    },
    closeKeyboard() {
      this.$refs.numInput.blur()
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .rank {
    position fixed
    width 100%
    top 88px
    bottom 0
    .box-wrapper {
      margin 20px
      .input-box {
        display flex
        align-items center
        box-sizing border-box
        width 100%
        padding 0 6px
        height 70px
        background $color-highlight-background
        border-radius 6px
        .box {
          flex 1
          margin 0 5px
          line-height 30px
          background $color-highlight-background
          font-size 25px
          &::placeholder {
            color $color-text-d
          }
        }
        .icon-dismiss {
          font-size 30px
          color black
        }
      }
    }
  }
</style>
