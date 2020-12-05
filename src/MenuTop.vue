<template>
  <q-tabs
    v-if="menuRoutes.length > 0"
    :value="menuActive()"
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
              no-caps
              no-wrap
            >
              <template v-slot:label>
                <q-icon v-if="menuIcon && hasIcon(menu.meta)" :color="iconColor" :name="menu.meta.icon" left />
                <div v-if="hasTitle(menu.meta)">{{ menu.meta.title }}</div>
              </template>

              <template v-slot:default>
                <div v-for="(child, k) in menu.children" :key="'c-' + k" class="text-no-wrap">
                  <q-list>
                    <q-expansion-item v-if="child.children" :content-inset-level="0.6" group="subGroup">
                      <template v-slot:header>
                        <q-item-section v-if="menuIcon && hasIcon(child.meta)" side>
                          <q-icon :name="child.meta.icon" :color="iconColor" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label v-if="hasTitle(child.meta)" lines="1">{{ child.meta.title }}</q-item-label>
                        </q-item-section>
                      </template>

                      <template v-slot:default>
                        <div v-for="(subChild, m) in child.children" :key="'d-' + m">
                          <q-list>
                            <q-item v-if="subChild.external" v-close-popup tag="a" :href="subChild.path" target="_blank">
                              <q-item-section v-if="menuIcon && hasIcon(subChild.meta)" side>
                                <q-icon :name="subChild.meta.icon" :color="iconColor" />
                              </q-item-section>
                              <q-item-section>
                                <q-item-label v-if="hasTitle(subChild.meta)" lines="1">{{ subChild.meta.title }}</q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-item v-else v-ripple :to="{name: subChild.name}">
                              <q-item-section v-if="menuIcon && hasIcon(subChild.meta)" side>
                                <q-icon :name="subChild.meta.icon" :color="iconColor" />
                              </q-item-section>
                              <q-item-section>
                                <q-item-label v-if="hasTitle(subChild.meta)" lines="1">{{ subChild.meta.title }}</q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-separator v-if="subChild.meta && subChild.meta.separator" />
                          </q-list>
                        </div>
                      </template>
                    </q-expansion-item>

                    <q-item v-else-if="child.external" v-close-popup :href="child.path" tag="a" target="_blank">
                      <q-item-section v-if="menuIcon && hasIcon(child.meta)" side>
                        <q-icon :name="child.meta.icon" :color="iconColor" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-if="hasTitle(child.meta)" lines="1">{{ child.meta.title }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item v-else :to="{ name: child.name }" class="text-dark" exact>
                      <q-icon v-if="menuIcon && hasIcon(child.meta)" :color="iconColor" :name="child.meta.icon" size="sm" left />
                      <div>{{ child.meta.title }}</div>
                    </q-item>

                    <q-separator v-if="child.meta && child.meta.separator" />
                  </q-list>
                </div>
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
import { getMenuItems, isEmpty, hasProperty } from './index'

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
      menuRoutes: []
    }
  },
  created() {
    this.menuRoutes = getMenuItems(this.routes)
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
    },
    menuActive() {
      const matched = this.$route.matched
      if (matched) {
        for (var i in matched) {
          return matched[i].name
        }
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
