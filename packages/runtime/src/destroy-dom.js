// @ts-check
import { removeEventListeners } from './events'
import { DOM_TYPES } from './h'

/**
 * @param {import('./types').VDom} vdom
 */
export function destroyDOM(vdom) {
  const { type } = vdom

  switch (type) {
    case DOM_TYPES.TEXT: {
      removeTextNode(vdom)

      break
    }

    case DOM_TYPES.ELEMENT: {
      removeElementNode(vdom)

      break
    }

    case DOM_TYPES.FRAGMENT: {
      removeFragmentNodes(vdom)

      break
    }

    default: {
      throw new Error(`Can't destroy DOM of type: ${type}`)
    }
  }

  delete vdom.el
}

/**
 * @param {import('./types').TextVDom} vdom
 */
function removeTextNode(vdom) {
  const { el } = vdom
  el?.remove()
}

/**
 * @param {import('./types').ElementVDom} vdom
 */
function removeElementNode(vdom) {
  const { el, children, listeners } = vdom

  el.remove()
  children.forEach(destroyDOM)

  if (listeners) {
    removeEventListeners(listeners, el)

    delete vdom.listeners
  }
}

/**
 *  @param {import('./types').FragmentVDom} vdom
 */
function removeFragmentNodes(vdom) {
  const { children } = vdom

  children.forEach(destroyDOM)
}
