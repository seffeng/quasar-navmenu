# Vue Quasar NavMenuItem

## 安装

```shell
npm install q-navmenu-item
```

## 示例

```vue
<template>
  <q-navmenu-item :routes="routes" :search-callback="search" />
</template>

<script>
import QNavmenuItem from 'q-navmenu-item'
export default {
  components: {
    QNavmenuItem
  },
  data() {
    return {
      routes: [
        {
          path: 'https://www.wuhuawu.com',
          name: 'http',
          meta: {
            title: '测试-外链',
            icon: 'menu',
            requiresAuth: false,
            separator: true,
            allow: true
          }
        }
      ]
    }
  },
  methods: {
    search(str) {
      console.log(str)
    }
  }
}
</script>
```

## 参数

| 参数                 | 类型     | 默认  | 说明                                       |
| -------------------- | -------- | ----- | ------------------------------------------ |
| routes               | array    | -     | 必须，路由                                 |
| menu-type            | string   | tabs  | 类型[tabs(q-tabs), item(q-item)]           |
| menu-vertical        | boolean  | false | menu-type为 tabs 时[true-垂直，false-水平] |
| menu-active-bg-color | string   | ''    | menu-type为 tabs 时，菜单激活颜色          |
| menu-icon            | boolean  | true  | 是否显示图标                               |
| input-bg-color       | string   | white | 搜索框背景                                 |
| input-rounded        | boolean  | true  | 搜索框 rounded                             |
| input-outlined       | boolean  | true  | 搜索框 outlined                            |
| input-dense          | boolean  | true  | 搜索框 dense                               |
| icon-color           | string   | ''    | 图标颜色                                   |
| show-search          | boolean  | true  | 是否显示搜索                               |
| search-callback      | function | -     | 搜索回调方法，返回搜索框value值            |

## 备注

* 当前路由只支持到 3 级，即只能有两层（个） children

* 示例：[vue-web-demo](https://github.com/seffeng/vue-web-demo/tree/quasar)

  