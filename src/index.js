/**
 *
 * @param {string} path
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 *
 * @param {string} str
 */
export function isEmpty(str) {
  return isNull(str) || (typeof (str) === 'string' && str.trim() === '')
}

/**
 *
 * @param {*} val
 */
export function isNull(val) {
  return val === undefined || val === null
}

/**
 *
 * @param {object} obj
 * @param {*} attr
 */
export function hasProperty(obj, attr) {
  // eslint-disable-next-line no-prototype-builtins
  return typeof obj === 'object' && obj.hasOwnProperty(attr)
}

/**
 * 菜单处理
 * @param {object} router
 */
export function getMenuItems(router) {
  const menuItems = []
  for (var i in router) {
    if (!isNull(router[i].children) && router[i].children.length > 0) {
      const children = router[i].children
      const child = []
      for (var j in children) {
        if (isNull(children[j].hidden) || children[j].hidden === false) {
          child.push({
            name: children[j].name,
            path: children[j].path,
            external: isExternal(children[j].path),
            meta: children[j].meta
          })
        }
      }
      if (child.length > 1) {
        menuItems.push({
          name: router[i].name,
          path: router[i].path,
          external: isExternal(router[i].path),
          meta: router[i].meta,
          children: child
        })
      } else {
        for (var k in child) {
          menuItems.push({
            name: child[k].name,
            path: child[k].path,
            external: isExternal(child[k].path),
            meta: child[k].meta
          })
        }
      }
    } else if (isNull(router[i].hidden) || router[i].hidden === false) {
      menuItems.push({
        name: router[i].name,
        path: router[i].path,
        external: isExternal(router[i].path),
        meta: router[i].meta
      })
    }
  }
  return menuItems
}
