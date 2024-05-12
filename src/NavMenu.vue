<template>
  <menu-side
    v-if="vertical"
    :routes="menu()"
    :bordered="bordered"
    :dense="dense"
    :expand-icon="expandIcon"
    :expanded-icon="expandedIcon"
    :tab-class="tabClass"
    :menu-class="menuClass"
    :show-search="showSearch"
    :search-callback="searchCallback"
    :search-icon="searchIcon"
    :search-placeholder="searchPlaceholder"
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
    :expand-icon="expandIcon"
    :expanded-icon="expandedIcon"
    :tab-class="tabClass"
    :menu-class="menuClass"
    :show-search="showSearch"
    :search-callback="searchCallback"
    :search-icon="searchIcon"
    :search-placeholder="searchPlaceholder"
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
    expandIcon: {
      type: String
    },
    expandedIcon: {
      type: String
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
    searchIcon: {
      type: String,
      default: 'search'
    },
    searchPlaceholder: {
      type: String,
      default: 'search'
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
