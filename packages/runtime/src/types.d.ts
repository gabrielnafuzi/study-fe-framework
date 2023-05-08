export type Listeners = Partial<{
  [EventKey in keyof HTMLElementEventMap]: (
    this: HTMLElement,
    ev: HTMLElementEventMap[EventKey]
  ) => any
}>

type TextVDom = {
  type: 'text'
  el?: Text
  value: string
}

type ElementVDom = {
  type: 'element'
  tag: keyof HTMLElementTagNameMap
  el: HTMLElement
  props: Record<string, unknown> & { on?: Listeners }
  listeners?: Listeners
  children: Array<VDom>
}

type FragmentVDom = {
  type: 'fragment'
  el?: HTMLElement
  children: Array<VDom>
}

export type VDom = TextVDom | ElementVDom | FragmentVDom
