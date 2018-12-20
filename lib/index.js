import VnKeypad from './base/keypad/keypad.vue'

// 导出模块
export default VnKeypad

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('vn-keypad', VnKeypad)
}
