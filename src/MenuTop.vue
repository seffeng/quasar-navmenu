<template>
  <q-tabs
    v-if="menuRoutes.length > 0"
    :value="menuActive"
    :vertical="menuVertical"
    :active-bg-color="menuActiveBgColor"
    :dense="menuDense"
    inline-label
    shrink
    no-caps
  >
    <div v-for="(menu, index) in menuRoutes" :key="'p-' + index">
      <div v-if="menu.children">
        <q-tab :name="menu.name" ripple>
          <template v-slot:default>
            <q-btn-dropdown
              align="left"
              class="ellipsis"
              auto-close
              no-caps
              no-wrap
            >
              <template v-slot:label>
                <q-icon v-if="menuIcon && hasIcon(menu.meta)" :color="iconColor" :name="menu.meta.icon" left />
                <div v-if="hasTitle(menu.meta)">{{ menu.meta.title }}</div>
              </template>

              <template v-slot:default>
                <q-list v-for="(child, k) in menu.children" :key="'c-' + k" class="text-no-wrap">
                  <q-item v-if="child.external">
                    <q-item-section>
                      <template v-slot:default>
                        <a :href="child.path" target="_blank" class="ellipsis row text-dark">
                          <q-icon v-if="menuIcon && hasIcon(child.meta)" :color="iconColor" :name="child.meta.icon" size="sm" left />
                          <div v-if="hasTitle(child.meta)">{{ child.meta.title }}</div>
                        </a>
                      </template>
                    </q-item-section>
                  </q-item>

                  <q-item v-else :to="{ name: child.name }" clickable class="text-dark" exact>
                    <q-icon v-if="menuIcon && hasIcon(child.meta)" :color="iconColor" :name="child.meta.icon" size="sm" left />
                    <div>{{ child.meta.title }}</div>
                  </q-item>

                  <q-separator v-if="child.meta && child.meta.separator" />
                </q-list>
              </template>
            </q-btn-dropdown>
          </template>
        </q-tab>
      </div>

      <div v-else>
        <q-tab v-if="menu.external" :name="menu.name" ripple>
          <template v-slot:default>
            <q-btn
              align="left"
              type="a"
              :href="menu.path"
              target="_blank"
              class="ellipsis"
              no-caps
              no-wrap
            >
              <q-icon v-if="menuIcon && hasIcon(menu.meta)" :color="iconColor" :name="menu.meta.icon" left />
              <div v-if="hasTitle(menu.meta)">{{ menu.meta.title }}</div>
            </q-btn>
          </template>
        </q-tab>

        <q-route-tab v-else :name="menu.name" :to="{ name: menu.name }" exact ripple>
          <template v-slot:default>
            <q-icon v-if="menuIcon && hasIcon(menu.meta)" :color="iconColor" :name="menu.meta.icon" size="sm" left />
            <div v-if="hasTitle(menu.meta)">{{ menu.meta.title }}</div>
          </template>
        </q-route-tab>
      </div>

      <q-separator v-if="menuVertical && menu.meta && menu.meta.separator" />
    </div>

    <div v-if="showSearch">
      <q-separator v-if="menuVertical" spaced />
      <q-input
        v-model="search"
        placeholder="search"
        :bg-color="inputBgColor"
        style="min-width: 120px"
        :rounded="inputRounded"
        :outlined="inputOutlined"
        :dense="inputDense"
        clearable
        @keyup.enter.native="handleSearch"
      >
        <template v-slot:prepend>
          <q-btn round dense flat icon="search" @click="handleSearch" />
        </template>
      </q-input>
    </div>
  </q-tabs>
</template>

<script>
import { getMenuItems, isEmpty, isNull, hasProperty } from './index'

export default {
  name: 'MenuTop',
  props: {
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
  },
  data() {
    return {
      search: '',
      menuActive: '',
      menuRoutes: []
    }
  },
  created() {
    this.menuRoutes = getMenuItems(this.routes)
    this.menuActive = !isNull(this.$route.meta) && !isEmpty(this.$route.meta.tag) ? this.$route.meta.tag : (this.$route.name || '')
  },
  methods: {
    handleSearch() {
      if (typeof this.searchCallback === 'function') {
        if (typeof this.search === 'string') {
          this.searchCallback(this.search.trim())
        } else {
          this.searchCallback('')
        }
      }
    },
    hasIcon(meta) {
      return !isEmpty(meta) && hasProperty(meta, 'icon') && !isEmpty(meta.icon)
    },
    hasTitle(meta) {
      return !isEmpty(meta) && hasProperty(meta, 'title')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
