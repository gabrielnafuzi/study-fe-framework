import { DOM_TYPES } from './h'
import { setAttributes } from './attributes'
import { addEventListeners } from './events'

/**
 * @param {import("./types").VDom} vdom
 * @param {HTMLElement} parentEl
 */
export function mountDOM(vdom, parentEl) {
  const { type } = vdom

  switch (type) {
    case DOM_TYPES.TEXT: {
      createTextNode(vdom, parentEl)

      break
    }

    case DOM_TYPES.ELEMENT: {
      createElementNode(vdom, parentEl)

      break
    }

    case DOM_TYPES.FRAGMENT: {
      createFragmentNodes(vdom, parentEl)

      break
    }

    default: {
      throw new Error(`Can't mount DOM of type: ${type}`)
    }
  }
}

/**
 * @param {import('./types').TextVDom} vdom
 * @param {HTMLElement} parentEl
 */
function createTextNode(vdom, parentEl) {
  const { value } = vdom

  const textNode = document.createTextNode(value)
  vdom.el = textNode

  parentEl.append(textNode)
}

/**
 * @param {import('./types').ElementVDom} vdom
 * @param {HTMLElement} parentEl
 */
function createElementNode(vdom, parentEl) {
  const { tag, props, children } = vdom

  const element = document.createElement(tag)
  addProps(element, props, vdom)
  vdom.el = element

  children.forEach(child => mountDOM(child, element))
  parentEl.append(element)
}

/**
 * @param {HTMLElement} el
 * @param {Record<string, unknown> & { on: import('./types').Listeners }} props
 * @param {import('./types').ElementVDom} vdom
 */
function addProps(el, props, vdom) {
  const { on: events, ...attrs } = props

  vdom.listeners = addEventListeners(events, el)
  setAttributes(el, attrs)
}

/**
 * @param {import('./types').FragmentVDom} vdom
 * @param {HTMLElement} parentEl
 */
function createFragmentNodes(vdom, parentEl) {
  const { children } = vdom
  vdom.el = parentEl

  children.forEach(child => mountDOM(child, parentEl))
}
