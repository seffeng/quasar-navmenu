<template>
  <div :class="tabClass">
    <q-list v-if="routes.length > 0" :bordered="bordered" :dense="dense" :class="menuClass">
      <div v-if="showSearch" class="q-pa-sm">
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

      <div v-for="(route, index) in routes" :key="'p-' + index">
        <q-expansion-item
          v-if="route.children && route.children.length > 0"
          :dense="dense"
          :icon="hasIcon(route.meta) ? route.meta.icon : ''"
          :label="hasTitle(route.meta) ? route.meta.title : ''"
          :title="hasTitle(route.meta) ? route.meta.title : ''"
          :caption="hasCaption(route.meta) ? route.meta.caption : ''"
          :default-opened="isOpened(route.meta)"
          :label-lines="1"
          :caption-lines="2"
        >
          <div v-for="(child, cIndex) in route.children" :key="'p-c-' + cIndex">
            <q-expansion-item
              v-if="child.children && child.children.length > 0"
              :dense="dense"
              :header-inset-level="0.3"
              :content-inset-level="0.6"
              :default-opened="isOpened(child.meta)"
              :icon="hasIcon(child.meta) ? child.meta.icon : ''"
              :label="hasTitle(child.meta) ? child.meta.title : ''"
              :title="hasTitle(child.meta) ? child.meta.title : ''"
              :caption="hasCaption(child.meta) ? child.meta.caption : ''"
              :label-lines="1"
              :caption-lines="2"
            >
              <div v-for="(subChild, sIndex) in child.children" :key="'p-c-s-' + sIndex">
                <q-expansion-item
                  v-if="isExternal(subChild.meta)"
                  :dense="dense"
                  :icon="hasIcon(subChild.meta) ? subChild.meta.icon : ''"
                  :label="hasTitle(subChild.meta) ? subChild.meta.title : ''"
                  :title="hasTitle(subChild.meta) ? subChild.meta.title : ''"
                  :caption="hasCaption(subChild.meta) ? subChild.meta.caption : ''"
                  :hide-expand-icon="true"
                  :href="subChild.path"
                  target="_blank"
                  :label-lines="1"
                  :caption-lines="2"
                />
                <q-expansion-item
                  v-else
                  :dense="dense"
                  :icon="hasIcon(subChild.meta) ? subChild.meta.icon : ''"
                  :label="hasTitle(subChild.meta) ? subChild.meta.title : ''"
                  :title="hasTitle(subChild.meta) ? subChild.meta.title : ''"
                  :caption="hasCaption(subChild.meta) ? subChild.meta.caption : ''"
                  :hide-expand-icon="true"
                  :to="{ name: subChild.name }"
                  :label-lines="1"
                  :caption-lines="2"
                />
                <q-separator v-if="hasSeparator(subChild.meta)" />
              </div>
            </q-expansion-item>

            <div v-else>
              <q-expansion-item
                v-if="isExternal(child.meta)"
                :dense="dense"
                :header-inset-level="0.3"
                :content-inset-level="0.6"
                :icon="hasIcon(child.meta) ? child.meta.icon : ''"
                :label="hasTitle(child.meta) ? child.meta.title : ''"
                :title="hasTitle(child.meta) ? child.meta.title : ''"
                :caption="hasCaption(child.meta) ? child.meta.caption : ''"
                :hide-expand-icon="true"
                :href="child.path"
                target="_blank"
                :label-lines="1"
                :caption-lines="2"
              />
              <q-expansion-item
                v-else
                :dense="dense"
                :header-inset-level="0.3"
                :content-inset-level="0.6"
                :icon="hasIcon(child.meta) ? child.meta.icon : ''"
                :label="hasTitle(child.meta) ? child.meta.title : ''"
                :title="hasTitle(child.meta) ? child.meta.title : ''"
                :caption="hasCaption(child.meta) ? child.meta.caption : ''"
                :hide-expand-icon="true"
                :to="{ name: child.name }"
                :label-lines="1"
                :caption-lines="2"
              />
              <q-separator v-if="hasSeparator(child.meta)" />
            </div>
          </div>
        </q-expansion-item>

        <div v-else>
          <q-expansion-item
            v-if="isExternal(route.meta)"
            :dense="dense"
            :icon="hasIcon(route.meta) ? route.meta.icon : ''"
            :label="hasTitle(route.meta) ? route.meta.title : ''"
            :title="hasTitle(route.meta) ? route.meta.title : ''"
            :caption="hasCaption(route.meta) ? route.meta.caption : ''"
            :hide-expand-icon="true"
            :href="route.path"
            target="_blank"
            :label-lines="1"
            :caption-lines="2"
          />
          <q-expansion-item
            v-else
            :dense="dense"
            :icon="hasIcon(route.meta) ? route.meta.icon : ''"
            :label="hasTitle(route.meta) ? route.meta.title : ''"
            :title="hasTitle(route.meta) ? route.meta.title : ''"
            :caption="hasCaption(route.meta) ? route.meta.caption : ''"
            :hide-expand-icon="true"
            :to="{ name: route.name }"
            :label-lines="1"
            :caption-lines="2"
          />

          <q-separator v-if="hasSeparator(route.meta)" />
        </div>
      </div>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { isEmpty, hasProperty } from './index'

export default defineComponent({
  name: 'MenuSide',
  props: {
    bordered: {
      type: Boolean,
      default: true
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

    return {
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
