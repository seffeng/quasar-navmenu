<template>
  <q-list class="q-mt-sm">
    <div v-if="showSearch" class="q-pa-sm">
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

    <div v-if="menuRoutes.length > 0">
      <div v-for="(menu, index) in menuRoutes" :key="'p-' + index">
        <q-list v-if="menu.children">
          <q-expansion-item :value="menu.name && isActive(menu.name)" :content-inset-level="0.6" group="group">
            <template v-slot:header>
              <q-item-section v-if="menuIcon && hasIcon(menu.meta)" side>
                <q-icon :name="menu.meta.icon" :color="iconColor" />
              </q-item-section>
              <q-item-section>
                <q-item-label v-if="hasTitle(menu.meta)" lines="1">{{ menu.meta.title }}</q-item-label>
                <q-item-label v-if="hasSubTitle(menu.meta)" caption lines="1">{{ menu.meta.subTitle }}</q-item-label>
              </q-item-section>
            </template>
            <template v-slot:default>
              <div v-for="(child, k) in menu.children" :key="'c-' + k">
                <q-list v-if="child.children">
                  <q-expansion-item :value="child.name && isActive(child.name)" :content-inset-level="0.6" group="subGroup">
                    <template v-slot:header>
                      <q-item-section v-if="menuIcon && hasIcon(child.meta)" side>
                        <q-icon :name="child.meta.icon" :color="iconColor" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-if="hasTitle(child.meta)" lines="1">{{ child.meta.title }}</q-item-label>
                        <q-item-label v-if="hasSubTitle(child.meta)" caption lines="1">{{ child.meta.subTitle }}</q-item-label>
                      </q-item-section>
                    </template>

                    <template v-slot:default>
                      <div v-for="(subChild, m) in child.children" :key="'d-' + m">
                        <q-list>
                          <q-item v-if="subChild.external" tag="a" :href="subChild.path" target="_blank">
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
                  <q-separator v-if="child.meta && child.meta.separator" />
                </q-list>

                <q-list v-else>
                  <q-item v-if="child.external" tag="a" :href="child.path" target="_blank">
                    <q-item-section v-if="menuIcon && hasIcon(child.meta)" side>
                      <q-icon :name="child.meta.icon" :color="iconColor" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label v-if="hasTitle(child.meta)" lines="1">{{ child.meta.title }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-else v-ripple :to="{name: child.name}">
                    <q-item-section v-if="menuIcon && hasIcon(child.meta)" side>
                      <q-icon :name="child.meta.icon" :color="iconColor" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label v-if="hasTitle(child.meta)" lines="1">{{ child.meta.title }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator v-if="child.meta && child.meta.separator" />
                </q-list>
              </div>
            </template>
          </q-expansion-item>
        </q-list>

        <q-list v-else-if="menu.external">
          <q-item tag="a" :href="menu.path" target="_blank">
            <q-item-section v-if="menuIcon && hasIcon(menu.meta)" side>
              <q-icon :name="menu.meta.icon" :color="iconColor" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="hasTitle(menu.meta)" lines="1">{{ menu.meta.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list v-else>
          <q-item v-ripple :to="{name: menu.name}">
            <q-item-section v-if="menuIcon && hasIcon(menu.meta)" side>
              <q-icon :name="menu.meta.icon" :color="iconColor" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="hasTitle(menu.meta)" lines="1">{{ menu.meta.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-separator v-if="menu.meta && menu.meta.separator" />
      </div>
    </div>
  </q-list>
</template>

<script>
import { getMenuItems, isEmpty, hasProperty } from './index'

export default {
  name: 'MenuLeft',
  props: {
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
    hasSubTitle(meta) {
      return !isEmpty(meta) && hasProperty(meta, 'subTitle') && !isEmpty(meta.subTitle)
    },
    fetchNameItems() {
      const matched = this.$route.matched
      const nameItems = []
      if (matched) {
        for (var i in matched) {
          nameItems.push(matched[i].name)
        }
      }
      return nameItems
    },
    isActive(name) {
      return this.fetchNameItems().indexOf(name) !== -1
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
