/**
 * @param {HTMLElement} el
 * @param {Record<string, unknown>} attrs
 */
export function setAttributes(el, attrs) {
  const { class: className, style, ...otherAttrs } = attrs

  if (className) {
    setClass(el, className)
  }

  if (style) {
    Object.entries(style).forEach(([prop, value]) => {
      setStyle(el, prop, value)
    })
  }

  for (const [name, value] of Object.entries(otherAttrs)) {
    setAttribute(el, name, value)
  }
}

/**
 * @param {HTMLElement} el
 * @param {string | Array<string>} className
 */
export function setClass(el, className) {
  el.className = ''

  if (typeof className === 'string') {
    el.className = className
  }

  if (Array.isArray(className)) {
    el.classList.add(...className)
  }
}

/**
 * @param {HTMLElement} el
 * @param {keyof CSSStyleDeclaration} name
 * @param {string} value
 */
export function setStyle(el, name, value) {
  el.style[name] = value
}

/**
 * @param {HTMLElement} el
 * @param {keyof CSSStyleDeclaration} name
 */
export function removeStyle(el, name) {
  el.style[name] = null
}

/**
 * @param {HTMLElement} el
 * @param {string} name
 * @param {string} value
 */
export function setAttribute(el, name, value) {
  if (value == null) {
    removeAttribute(el, name)

    return
  }

  if (name.startsWith('data-')) {
    el.setAttribute(name, value)

    return
  }

  el[name] = value
}

/**
 * @param {HTMLElement} el
 * @param {string} name
 */
export function removeAttribute(el, name) {
  el[name] = null
  el.removeAttribute(name)
}
