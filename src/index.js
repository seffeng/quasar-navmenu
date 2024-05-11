/**
 *
 * @param {string} path
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
   *
   * @param {string} str
   */
export function isEmpty (str) {
  return isNull(str) || (typeof (str) === 'string' && str.trim() === '')
}

/**
   *
   * @param {*} val
   */
export function isNull (val) {
  return val === undefined || val === null
}

/**
   *
   * @param {object} obj
   * @param {*} attr
   */
export function hasProperty (obj, attr) {
  // eslint-disable-next-line no-prototype-builtins
  return typeof obj === 'object' && obj.hasOwnProperty(attr)
}

/**
   * 菜单处理
   * @param {object} router
   */
export function routerToMenu (router) {
  const menuItems = []
  for (const i in router) {
    if (!isNull(router[i].children) && router[i].children.length > 0) {
      const children = router[i].children
      const child = []
      for (const j in children) {
        if (isNull(children[j].meta) || isNull(children[j].meta.hidden) || children[j].meta.hidden === false) {
          if (!isNull(children[j].children) && children[j].children.length > 0) {
            const tmpSubChildren = children[j].children
            const subChildren = []
            for (const m in tmpSubChildren) {
              subChildren.push({
                name: tmpSubChildren[m].name,
                path: tmpSubChildren[m].path,
                meta: {
                  external: isExternal(tmpSubChildren[m].path),
                  title: isEmpty(tmpSubChildren[m].meta.title) ? tmpSubChildren[m].path : tmpSubChildren[m].meta.title,
                  caption: isEmpty(tmpSubChildren[m].meta.caption) ? '' : tmpSubChildren[m].meta.caption,
                  icon: isEmpty(tmpSubChildren[m].meta.icon) ? '' : tmpSubChildren[m].meta.icon,
                  requiresAuth: isNull(tmpSubChildren[m].meta.requiresAuth) ? true : tmpSubChildren[m].meta.requiresAuth,
                  separator: isNull(tmpSubChildren[m].meta.separator) ? false : tmpSubChildren[m].meta.separator
                }
              })
            }
            if (subChildren.length > 1) {
              child.push({
                name: children[j].name,
                path: children[j].path,
                meta: {
                  external: isExternal(children[j].path),
                  title: isEmpty(children[j].meta.title) ? children[j].path : children[j].meta.title,
                  caption: isEmpty(children[j].meta.caption) ? '' : children[j].meta.caption,
                  icon: isEmpty(children[j].meta.icon) ? '' : children[j].meta.icon,
                  requiresAuth: isNull(children[j].meta.requiresAuth) ? true : children[j].meta.requiresAuth,
                  separator: isNull(children[j].meta.separator) ? false : children[j].meta.separator,
                  opened: isNull(children[j].meta.opened) ? false : children[j].meta.opened
                },
                children: subChildren
              })
            } else {
              for (const n in subChildren) {
                child.push({
                  name: subChildren[n].name,
                  path: subChildren[n].path,
                  meta: {
                    external: isExternal(tmpSubChildren[n].path),
                    title: isEmpty(tmpSubChildren[n].meta.title) ? tmpSubChildren[n].path : tmpSubChildren[n].meta.title,
                    caption: isEmpty(tmpSubChildren[n].meta.caption) ? '' : tmpSubChildren[n].meta.caption,
                    icon: isEmpty(tmpSubChildren[n].meta.icon) ? '' : tmpSubChildren[n].meta.icon,
                    requiresAuth: isNull(tmpSubChildren[n].meta.requiresAuth) ? true : tmpSubChildren[n].meta.requiresAuth,
                    separator: isNull(tmpSubChildren[n].meta.separator) ? false : tmpSubChildren[n].meta.separator
                  }
                })
              }
            }
          } else {
            child.push({
              name: children[j].name,
              path: children[j].path,
              meta: {
                external: isExternal(children[j].path),
                title: isEmpty(children[j].meta.title) ? children[j].path : children[j].meta.title,
                caption: isEmpty(children[j].meta.caption) ? '' : children[j].meta.caption,
                icon: isEmpty(children[j].meta.icon) ? '' : children[j].meta.icon,
                requiresAuth: isNull(children[j].meta.requiresAuth) ? true : children[j].meta.requiresAuth,
                separator: isNull(children[j].meta.separator) ? false : children[j].meta.separator
              }
            })
          }
        }
      }
      if (child.length > 1) {
        menuItems.push({
          name: router[i].name,
          path: router[i].path,
          meta: {
            external: isExternal(router[i].path),
            title: isEmpty(router[i].meta.title) ? router[i].path : router[i].meta.title,
            caption: isEmpty(router[i].meta.caption) ? '' : router[i].meta.caption,
            icon: isEmpty(router[i].meta.icon) ? '' : router[i].meta.icon,
            requiresAuth: isNull(router[i].meta.requiresAuth) ? true : router[i].meta.requiresAuth,
            separator: isNull(router[i].meta.separator) ? false : router[i].meta.separator,
            opened: isNull(router[i].meta.opened) ? false : router[i].meta.opened
          },
          children: child
        })
      } else {
        for (const k in child) {
          menuItems.push({
            name: child[k].name,
            path: child[k].path,
            meta: {
              external: isExternal(child[k].path),
              title: isEmpty(child[k].meta.title) ? child[k].path : child[k].meta.title,
              caption: isEmpty(child[k].meta.caption) ? '' : child[k].meta.caption,
              icon: isEmpty(child[k].meta.icon) ? '' : child[k].meta.icon,
              requiresAuth: isNull(child[k].meta.requiresAuth) ? true : child[k].meta.requiresAuth,
              separator: isNull(child[k].meta.separator) ? false : child[k].meta.separator
            }
          })
        }
      }
    } else if (isNull(router[i].meta) || isNull(router[i].meta.hidden) || router[i].meta.hidden === false) {
      menuItems.push({
        name: router[i].name,
        path: router[i].path,
        meta: {
          external: isExternal(router[i].path),
          title: isEmpty(router[i].meta.title) ? router[i].path : router[i].meta.title,
          caption: isEmpty(router[i].meta.caption) ? '' : router[i].meta.caption,
          icon: isEmpty(router[i].meta.icon) ? '' : router[i].meta.icon,
          requiresAuth: isNull(router[i].meta.requiresAuth) ? true : router[i].meta.requiresAuth,
          separator: isNull(router[i].meta.separator) ? false : router[i].meta.separator
        }
      })
    }
  }
  return menuItems
}
