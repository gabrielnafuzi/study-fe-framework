import { withoutNulls } from './utils/arrays'

export const DOM_TYPES = /** @type {const} */ ({
  TEXT: 'text',
  ELEMENT: 'element',
  FRAGMENT: 'fragment'
})

/**
 * @param {import('./types').ElementVDom["tag"]} tag
 * @param {import('./types').ElementVDom["props"]} props
 * @param {Array<import('./types').ElementVDom["children"]>} children
 * @returns {Omit<import('./types').ElementVDom, 'el' | 'listeners'>}
 */
export function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT
  }
}

/**
 * @param {string} str
 * @returns {import('./types').TextVDom}
 */
export function hString(str) {
  return {
    type: DOM_TYPES.TEXT,
    value: str
  }
}

/**
 * @param {import('./types').VDom} vNodes
 * @returns {import('./types').FragmentVDom}
 */
export function hFragment(vNodes) {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes))
  }
}

/**
 * @param {Array<import('./types').VDom>} children
 */
function mapTextNodes(children) {
  return children.map(child =>
    typeof child === 'string' || typeof child === 'number'
      ? hString(child)
      : child
  )
}
