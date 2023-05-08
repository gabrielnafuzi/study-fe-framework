import { createApp, h } from 'https://unpkg.com/@nafuzi/study-fe-framework@1'

createApp({
  state: { counter: 0 },

  reducers: {
    add: (state, amount) => {
      return { ...state, counter: state.counter + amount }
    }
  },

  view: (state, emit) =>
    h('button', { on: { click: () => emit('add', 1) } }, [state.counter])
}).mount(document.getElementById('app'))
