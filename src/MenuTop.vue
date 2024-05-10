<template>
  <q-tabs
    :dense="dense"
    inline-label
    outside-arrows
    mobile-arrows
    :shrink="true"
    :active-color="activeColor"
    :active-bg-color="activeBgColor"
    :class="tabClass"
  >
    <div v-for="(route, index) in routes" :key="'p-' + index">
      <q-btn-dropdown
        v-if="route.children && route.children.length > 0"
        flat
        no-caps
        :icon="hasIcon(route.meta) ? route.meta.icon : none"
        :label="hasTitle(route.meta) ? route.meta.title : ''"
        :title="hasTitle(route.meta) ? route.meta.title : ''"
      >
        <q-list :class="menuClass">
          <div v-for="(child, cIndex) in route.children" :key="'p-c-' + cIndex">
            <q-item
              v-if="child.children && child.children.length > 0"
              clickable
              :dense="dense"
            >
              <q-item-section v-if="hasIcon(child.meta)" avatar>
                <q-icon :name="child.meta.icon" />
              </q-item-section>
              <q-item-section v-if="hasTitle(child.meta)" :title="child.meta.title">{{ child.meta.title }}</q-item-section>
              <q-item-section avatar>
                <q-icon name="keyboard_arrow_right" />
              </q-item-section>
              <q-menu
                anchor="top end"
                self="top middle"
                :class="menuClass"
              >
                <q-list style="min-width: 100px">
                  <div v-for="(subChild, sIndex) in child.children" :key="'p-c-s-' + sIndex">
                    <q-item
                      v-if="isExternal(subChild.meta)"
                      clickable
                      v-close-popup
                      :dense="dense"
                      :href="subChild.path"
                      target="_blank"
                    >
                      <q-item-section v-if="hasIcon(subChild.meta)" avatar>
                        <q-icon :name="subChild.meta.icon" />
                      </q-item-section>
                      <q-item-section v-if="hasTitle(subChild.meta)">
                        <q-item-label :title="subChild.meta.title">{{ subChild.meta.title }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      v-else
                      clickable
                      v-close-popup
                      :dense="dense"
                      :to="{ name: subChild.name }"
                    >
                      <q-item-section v-if="hasIcon(subChild.meta)" avatar>
                        <q-icon :name="subChild.meta.icon" />
                      </q-item-section>
                      <q-item-section v-if="hasTitle(subChild.meta)">
                        <q-item-label :title="subChild.meta.title">{{ subChild.meta.title }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator v-if="hasSeparator(subChild.meta)" />
                  </div>
                </q-list>
              </q-menu>
            </q-item>

            <div v-else>
              <q-item
                v-if="isExternal(child.meta)"
                clickable
                v-close-popup
                :dense="dense"
                :href="child.path"
                target="_blank"
              >
                <q-item-section v-if="hasIcon(child.meta)" avatar>
                  <q-icon :name="child.meta.icon" />
                </q-item-section>
                <q-item-section v-if="hasTitle(child.meta)">
                  <q-item-label :title="child.meta.title">{{ child.meta.title }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                v-else
                clickable
                v-close-popup
                :dense="dense"
                :to="{ name: child.name }"
              >
                <q-item-section v-if="hasIcon(child.meta)" avatar>
                  <q-icon :name="child.meta.icon" />
                </q-item-section>
                <q-item-section v-if="hasTitle(child.meta)">
                  <q-item-label :title="child.meta.title">{{ child.meta.title }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator v-if="hasSeparator(child.meta)" />
            </div>
          </div>
        </q-list>
      </q-btn-dropdown>

      <div v-else>
        <q-route-tab
          v-if="isExternal(route.meta)"
          no-caps
          :name="'p-' + index"
          :icon="hasIcon(route.meta) ? route.meta.icon : none"
          :label="hasTitle(route.meta) ? route.meta.title : ''"
          :title="hasTitle(route.meta) ? route.meta.title : ''"
          :href="route.path"
          target="_blank"
        />
        <q-route-tab
          v-else
          no-caps
          :name="'p-' + index"
          :icon="hasIcon(route.meta) ? route.meta.icon : none"
          :label="hasTitle(route.meta) ? route.meta.title : ''"
          :title="hasTitle(route.meta) ? route.meta.title : ''"
          :to="{ name: route.name }"
        />
        <q-separator v-if="hasSeparator(route.meta)" />
      </div>
    </div>

    <div v-if="showSearch">
      <q-input
        v-model="search"
        placeholder="search"
        :bg-color="inputBgColor"
        style="min-width: 120px"
        :input-class="inputClass"
        :input-style="inputStyle"
        :rounded="inputRounded"
        :outlined="inputOutlined"
        :dense="inputDense"
        clearable
        @keyup.enter="handleSearch"
      >
        <template v-slot:prepend>
          <q-btn round dense flat icon="search" @click="handleSearch" />
        </template>
      </q-input>
    </div>
  </q-tabs>
  <q-space />
</template>

<script>
import { defineComponent, ref } from 'vue'
import { isEmpty, hasProperty } from './index'

export default defineComponent({
  name: 'MenuTop',
  props: {
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
    const search = ref('')
    const none = ref()
    return {
      none,
      search,
      hasIcon (meta) {
        return !isEmpty(meta) && hasProperty(meta, 'icon') && !isEmpty(meta.icon)
      },
      hasTitle (meta) {
        return !isEmpty(meta) && hasProperty(meta, 'title') && !isEmpty(meta.title)
      },
      hasCaption (meta) {
        return !isEmpty(meta) && hasProperty(meta, 'caption') && !isEmpty(meta.caption)
      },
      hasSeparator (meta) {
        return !isEmpty(meta) && hasProperty(meta, 'separator') && meta.separator
      },
      isExternal (meta) {
        return !isEmpty(meta) && hasProperty(meta, 'external') && meta.external
      },
      isOpened (meta) {
        return !isEmpty(meta) && hasProperty(meta, 'opened') && meta.opened
      },
      handleSearch () {
        if (typeof props.searchCallback === 'function') {
          if (typeof search.value === 'string') {
            props.searchCallback(search.value.trim())
          } else {
            props.searchCallback('')
          }
        }
      }
    }
  }
})
</script>
