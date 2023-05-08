import { noop } from './utils/noop'

export class Dispatcher {
  /**
   * @type {Map<string, Array<(payload?: unknown) => void>>}
   */
  #subs = new Map()
  /**
   * @type {Array<() => void>}
   */
  #afterHandlers = []

  subscribe(
    /** @type {string} */ commandName,
    /** @type {() => void} */ handler
  ) {
    if (!this.#subs.has(commandName)) {
      this.#subs.set(commandName, [])
    }

    const handlers = this.#subs.get(commandName)

    if (handlers.includes(handler)) {
      return noop
    }

    handlers.push(handler)

    return () => {
      const idx = handlers.indexOf(handler)

      handlers.splice(idx, 1)
    }
  }

  afterEveryCommand(/** @type {() => void} */ handler) {
    this.#afterHandlers.push(handler)

    return () => {
      const idx = this.#afterHandlers.indexOf(handler)

      this.#afterHandlers.splice(idx, 1)
    }
  }

  dispatch(/** @type {string} */ commandName, /** @type {unknown} */ payload) {
    const handlers = this.#subs.get(commandName)

    if (handlers) {
      handlers.forEach(handler => handler(payload))
    } else {
      console.warn(`No handlers for command ${commandName}`)
    }

    this.#afterHandlers.forEach(handler => handler())
  }
}
