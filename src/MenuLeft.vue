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
        <q-expansion-item v-if="menu.children" :value="menu.name && menu.name === menuActive" :content-inset-level="0.6" group="group">
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
              <q-item v-if="child.external">
                <q-item-section>
                  <template v-slot:default>
                    <a :href="child.path" target="_blank" class="ellipsis row text-dark">
                      <q-icon v-if="menuIcon && hasIcon(child.meta)" :name="child.meta.icon" size="sm" left />
                      <div v-if="hasTitle(child.meta)">{{ child.meta.title }}</div>
                    </a>
                  </template>
                </q-item-section>
              </q-item>
              <q-item v-else v-ripple :to="{name: child.name}" clickable>
                <q-item-section v-if="menuIcon && hasIcon(child.meta)" side>
                  <q-icon :name="child.meta.icon" :color="iconColor" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">{{ child.meta.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </template>
        </q-expansion-item>

        <q-item v-else-if="menu.external">
          <q-item-section>
            <template v-slot:default>
              <a :href="menu.path" target="_blank" class="ellipsis row text-dark">
                <q-icon v-if="menuIcon && hasIcon(menu.meta)" :name="menu.meta.icon" size="sm" left />
                <div v-if="hasTitle(menu.meta)">{{ menu.meta.title }}</div>
              </a>
            </template>
          </q-item-section>
        </q-item>

        <q-item v-else v-ripple :to="{name: menu.name}" clickable>
          <q-item-section v-if="menuIcon && hasIcon(menu.meta)" side>
            <q-icon :name="menu.meta.icon" :color="iconColor" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="hasTitle(menu.meta)" lines="1">{{ menu.meta.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-list>
</template>

<script>
import { getMenuItems, isEmpty, isNull, hasProperty } from './index'

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
      if (typeof this.searchCallback === 'function' && typeof this.search === 'string') {
        this.searchCallback(this.search.trim())
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
