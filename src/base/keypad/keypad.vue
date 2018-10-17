<template>
  <transition name="pad-fade">
    <div class="keypad" v-show="showFlag" @click="hide">
      <div class="pad-wrapper" @click.stop>
        <div class="pad-header"
             @touchstart.prevent="deleteStart"
             @touchmove.prevent="deleteMove"
             @touchend.prevent="deleteEnd">
          <h1 class="title">
            <span class="text" ref="txtPad">{{number}}</span>
          </h1>
        </div>
        <div @click.stop="hitNum" ref="pad" class="pad-content" @touchstart.prevent="btnPress" @touchend.prevent="btnUp">
          <div class="item-1">
            <div class="text">1</div>
          </div>
          <div class="item-2">
            <div class="text">2</div>
          </div>
          <div class="item-3">
            <div class="text">3</div>
          </div>
          <div class="item-4">
            <div class="text">4</div>
          </div>
          <div class="item-5">
            <div class="text">5</div>
          </div>
          <div class="item-6">
            <div class="text">6</div>
          </div>
          <div class="item-7">
            <div class="text">7</div>
          </div>
          <div class="item-8">
            <div class="text">8</div>
          </div>
          <div class="item-9">
            <div class="text">9</div>
          </div>
          <div class="item-dot">
            <div class="text">.</div>
          </div>
          <div class="item-0">
            <div class="text">0</div>
          </div>
          <div class="item-clear">
            <div class="text">
              清空
            </div>
          </div>
          <div class="item-ok">
            <div class="text">确认</div>
          </div>
          <div class="item-back">
            <div class="text">
              <i class="icon-back"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'keypad',
  data() {
    return {
      showFlag: false,
      number: ''
    }
  },
  props: {
    inputNum: {
      type: String,
      default: ''
    }
  },
  created() {
    this.number = isNaN(this.inputNum) ? '' : this.inputNum
    this.touch = {}
  },
  computed: {
    trueNumber() {
      if (this.number.startsWith('.')) {
        return '0' + this.number
      } else {
        return this.number
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    clear() {
      this.number = ''
    },
    _getBtn(e) {
      var item = e.target
      while (item.children.length > 0) {
        item = item.children[0]
      }
      var num = item.innerText
      if (item.className === 'icon-back') {
        return item.className.slice(5)
      } else if (num === '确认') {
        return 'ok'
      } else if (num === '清空') {
        return 'clear'
      } else {
        return num
      }
    },
    hitNum(e) {
      var num = this._getBtn(e)
      if (num === 'back') {
        if (this.number !== '') {
          this.number = this.number.substring(0, this.number.length - 1)
        }
      } else if (num === 'ok') {
        this.hide()
      } else if (num === 'clear') {
        this.clear()
      } else if (num === '.') {
        if (this.number.indexOf('.') < 0) {
          this.number += num
        }
      } else {
        this.number += num
      }
      this.$emit('numberChange', this.trueNumber)
    },
    btnPress(e) {
      var num = this._getBtn(e)
      var btn = num === '.' ? this.$refs.pad.querySelector('.item-dot') : this.$refs.pad.querySelector(`.item-${num}`)
      btn.style.backgroundColor = 'grey'
    },
    btnUp(e) {
      var num = this._getBtn(e)
      var btn = num === '.' ? this.$refs.pad.querySelector('.item-dot') : this.$refs.pad.querySelector(`.item-${num}`)
      btn.style.backgroundColor = 'white'
    },
    deleteStart(e) {
      this.touch.initiated = true
      this.touch.moved = false
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    deleteMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      if (!this.touch.moved) {
        this.touch.moved = true
      }
      if (deltaX > 100) {
        this.number = ''
      }
    },
    deleteEnd(e) {
      this.touch.initiated = false
      this.$emit('numberChange', this.trueNumber)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .keypad {
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background-color $color-background-d
    &.pad-fade-enter-active, &.pad-fade-leave-active {
      transition opacity 0.3s
      .pad-wrapper {
        transition all 0.5s
      }
    }
    &.pad-fade-enter, &.pad-fade-leave-to {
      opacity 0
      .pad-wrapper {
        transform translate3d(0, 100%, 0)
      }
    }
    .pad-wrapper {
      position absolute
      left 0
      bottom 0
      width 100%
      background-color white
      .pad-header {
        position relative
        padding 20px 30px 10px 20px
        background-color #f7f7f7
        height 40px
        border-top 1px solid black
        border-bottom 1px solid black
        .title {
          display flex
          align-items center
          justify-content flex-end
          .text {
            font-size 30px
            color black
          }
        }
      }
      .pad-content {
        height 300px
        overflow hidden
        display grid
        grid-template-columns 25vw 25vw 25vw 25vw
        place-items center
        grid-template-rows auto
        color black
        font-size 20px
        grid-template-areas "btn-1 btn-2 btn-3 btn-back" "btn-4 btn-5 btn-6 btn-back" "btn-7 btn-8 btn-9 btn-ok" "btn-dot btn-0 btn-clear btn-ok"
        .item-1 {
          place-self stretch
          grid-area btn-1
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
          border-right 1px solid grey
        }
        .item-2 {
          place-self stretch
          grid-area btn-2
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
          border-right 1px solid grey
        }
        .item-3 {
          place-self stretch
          grid-area btn-3
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
          border-right 1px solid grey
        }
        .item-4 {
          place-self stretch
          grid-area btn-4
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
          border-right 1px solid grey
        }
        .item-5 {
          place-self stretch
          grid-area btn-5
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
          border-right 1px solid grey
        }
        .item-6 {
          place-self stretch
          grid-area btn-6
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
          border-right 1px solid grey
        }
        .item-7 {
          place-self stretch
          grid-area btn-7
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
          border-right 1px solid grey
        }
        .item-8 {
          place-self stretch
          grid-area btn-8
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
          border-right 1px solid grey
        }
        .item-9 {
          place-self stretch
          grid-area btn-9
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
          border-right 1px solid grey
        }
        .item-dot {
          place-self stretch
          grid-area btn-dot
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
          border-right 1px solid grey
        }
        .item-clear {
          place-self stretch
          grid-area btn-clear
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
          border-right 1px solid grey
        }
        .item-0 {
          place-self stretch
          grid-area btn-0
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
          border-right 1px solid grey
        }
        .item-ok {
          place-self stretch
          grid-area btn-ok
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
        }
        .item-back {
          place-self stretch
          grid-area btn-back
          display flex
          align-items center
          justify-content center
          border-bottom 1px solid grey
          .icon-back {
            font-size 40px
            font-weight bold
          }
        }
      }
    }
  }
</style>
