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
          if (!isNull(children[j].children) && children[j].children.length > 0) {
            const tmpSubChildren = children[j].children
            const subChildren = []
            for (var m in tmpSubChildren) {
              subChildren.push({
                name: tmpSubChildren[m].name,
                path: tmpSubChildren[m].path,
                external: isExternal(tmpSubChildren[m].path),
                meta: tmpSubChildren[m].meta
              })
            }
            if (subChildren.length > 1) {
              child.push({
                name: children[j].name,
                path: children[j].path,
                external: isExternal(children[j].path),
                meta: children[j].meta,
                children: subChildren
              })
            } else {
              for (var n in subChildren) {
                child.push({
                  name: subChildren[n].name,
                  path: subChildren[n].path,
                  external: isExternal(subChildren[n].path),
                  meta: subChildren[n].meta
                })
              }
            }
          } else {
            child.push({
              name: children[j].name,
              path: children[j].path,
              external: isExternal(children[j].path),
              meta: children[j].meta
            })
          }
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
