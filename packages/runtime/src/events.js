/**
 * @template {keyof HTMLElementEventMap} EventName
 * @param {EventName} eventName
 * @param {(this: HTMLElement, ev: HTMLElementEventMap[EventName]) => any} handler
 * @param {HTMLElement} el
 */
export function addEventListener(eventName, handler, el) {
  el.addEventListener(eventName, handler)

  return handler
}

/**
 * @param {import("./types").Listeners} listeners
 * @param {HTMLElement} el
 */
export function addEventListeners(listeners = {}, el) {
  /** @type {import("./types").Listeners} */
  const addedListeners = {}

  Object.entries(listeners).forEach(([eventName, handler]) => {
    const listener = addEventListener(eventName, handler, el)
    addedListeners[eventName] = listener
  })

  return addedListeners
}

/**
 * @param {import("./types").Listeners} listeners
 * @param {HTMLElement} el
 */
export function removeEventListeners(listeners = {}, el) {
  Object.entries(listeners).forEach(([eventName, handler]) => {
    el.removeEventListener(eventName, handler)
  })
}
