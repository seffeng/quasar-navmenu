<template>
  <menu-side
    v-if="vertical"
    :routes="menu()"
    :bordered="bordered"
    :dense="dense"
    :tab-class="tabClass"
    :menu-class="menuClass"
    :show-search="showSearch"
    :search-callback="searchCallback"
    :input-bg-color="inputBgColor"
    :input-rounded="inputRounded"
    :input-outlined="inputOutlined"
    :input-dense="inputDense"
    :input-class="inputClass"
    :input-style="inputStyle"
  />

  <menu-top
    v-else
    :routes="menu()"
    :active-color="activeColor"
    :active-bg-color="activeBgColor"
    :dense="dense"
    :tab-class="tabClass"
    :menu-class="menuClass"
    :show-search="showSearch"
    :search-callback="searchCallback"
    :input-bg-color="inputBgColor"
    :input-rounded="inputRounded"
    :input-outlined="inputOutlined"
    :input-dense="inputDense"
    :input-class="inputClass"
    :input-style="inputStyle"
  />
</template>

<script>
import { defineComponent } from 'vue'
import MenuTop from './MenuTop.vue'
import MenuSide from './MenuSide.vue'
import { routerToMenu } from './index'

export default defineComponent({
  name: 'NavMenu',
  components: {
    MenuTop,
    MenuSide
  },
  props: {
    vertical: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: true
    },
    activeColor: {
      type: String,
      default: ''
    },
    activeBgColor: {
      type: String,
      default: ''
    },
    dense: {
      type: Boolean,
      default: false
    },
    tabClass: {
      type: String,
      default: ''
    },
    menuClass: {
      type: String,
      default: ''
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    searchCallback: {
      type: Function,
      default () {
        return ''
      }
    },
    inputBgColor: {
      type: String,
      default: ''
    },
    inputRounded: {
      type: Boolean,
      default: true
    },
    inputOutlined: {
      type: Boolean,
      default: true
    },
    inputDense: {
      type: Boolean,
      default: true
    },
    inputClass: {
      type: String,
      default: ''
    },
    inputStyle: {
      type: String,
      default: ''
    },
    routes: {
      type: Array,
      required: true
    }
  },

  setup (props) {
    return {
      menu () {
        return routerToMenu(props.routes)
      }
    }
  }
})
</script>
