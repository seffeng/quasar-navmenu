# Vue Quasar NavMenuItem

## 安装

```shell
npm install q-navmenu-item
```

## 示例

```vue
<template>
  <q-nav-menu :routes="routes" :search-callback="search" />
</template>

<script>
import QNavMenu from 'q-navmenu-item'
export default {
  components: {
    QNavMenu
  },
  data() {
    return {
      routes: [
        {
          path: '/',
          name: 'Level-1',
          meta: {
            title: '一级导航-1',
            caption: '一级导航描述-1',
            icon: 'menu',
            requiresAuth: false,
            separator: true, // 是否显示分割线
            opened: true // 是否展开子级
          },
          children: [
            {
                path: 'level-1-1',
                name: 'Level-1-1',
                meta: {
                    title: '二级导航-1-1',
                    caption: '二级导航描述-1-1',
                    icon: 'menu',
                    requiresAuth: false,
                    separator: true,
                    opened: false
                },
                children: [
                    {
                        path: 'level-1-1-1',
                        name: 'Level-1-1-1',
                        meta: {
                            title: '三级导航-1-1-1',
                            caption: '三级导航描述-1-1-1',
                            icon: 'menu',
                            requiresAuth: false,
                            separator: true
                        }
                    }
                ]
            }
          ]
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
| vertical            | boolean   | true  | 类型[true-垂直（适用于侧边导航）, false-水平(适用于头部导航)] |
| bordered        | boolean  | true | 展示边框（仅vertical=true时生效） |
| active-color | string   | ''    | 菜单激活时颜色（仅vertical=false时生效） |
| active-bg-color | string | '' | 菜单背景颜色（仅vertical=false时生效） |
| dense | boolean | false | 紧凑模式 |
| expand-icon | string | - | 展开图标（vertical=false时为二级菜单图标） |
| expanded-icon | string | -      | 展开后图标（vertical=false时为一级菜单图标） |
| tab-class | string | '' | 菜单样式 |
| menu-class | string | '' | 菜单样式 |
| input-bg-color       | string   | '' | 搜索框背景                                 |
| input-rounded        | boolean  | true  | 搜索框 rounded                             |
| input-outlined       | boolean  | true  | 搜索框 outlined                            |
| input-dense          | boolean  | true  | 搜索框 dense                               |
| input-class | string   | ''    | 搜索框 class                 |
| input-style | string | '' | 搜索框样式 |
| show-search          | boolean  | true  | 是否显示搜索                               |
| search-callback      | function | -     | 搜索回调方法，返回搜索框value值            |
| search-icon | string | search | 搜索框图标 |
| search-placeholder | string | search | 搜索框 placeholder |

## 备注

* 当前路由只支持到 3 级，即只能有两层（个） children， 结构参考`示例`
* 注意：当 children 内只有一个菜单时，将不会显示层级，直接将子菜单显示到上一层级
