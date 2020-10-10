<template>
  <MenuTop
    v-if="menuType === 'tabs'"
    :menu-vertical="menuVertical"
    :menu-icon="menuIcon"
    :menu-active-bg-color="menuActiveBgColor"
    :menu-dense="menuDense"
    :input-bg-color="inputBgColor"
    :input-rounded="inputRounded"
    :input-outlined="inputOutlined"
    :input-dense="inputDense"
    :icon-color="iconColor"
    :show-search="showSearch"
    :routes="routes"
    :search-callback="searchCallback"
  />

  <MenuLeft
    v-else
    :menu-icon="menuIcon"
    :input-bg-color="inputBgColor"
    :input-rounded="inputRounded"
    :input-outlined="inputOutlined"
    :input-dense="inputDense"
    :icon-color="iconColor"
    :show-search="showSearch"
    :routes="routes"
    :search-callback="searchCallback"
  />
</template>

<script>
import MenuTop from './MenuTop.vue'
import MenuLeft from './MenuLeft.vue'

export default {
  name: 'NavmenuItem',
  components: {
    MenuTop,
    MenuLeft
  },
  props: {
    menuType: {
      type: String,
      default: 'tabs'
    },
    menuVertical: {
      type: Boolean,
      default: false
    },
    menuActiveBgColor: {
      type: String,
      default: ''
    },
    menuDense: {
      type: Boolean,
      default: false
    },
    menuIcon: {
      type: Boolean,
      default: true
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
    iconColor: {
      type: String,
      default: ''
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    searchCallback: {
      type: Function,
      default: function() {
        return ''
      }
    },
    routes: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
