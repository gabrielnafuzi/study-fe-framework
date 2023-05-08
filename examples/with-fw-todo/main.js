import {
  createApp,
  h,
  hFragment
} from 'https://unpkg.com/@nafuzi/study-fe-framework@1'

import { CreateTodo, TodoList } from './components.js'
import { reducers, state } from './state.js'

function App(state, emit) {
  return hFragment([
    h('h1', {}, ['My TODOs']),
    CreateTodo(state, emit),
    TodoList(state, emit)
  ])
}

createApp({ state, reducers, view: App }).mount(document.getElementById('app'))
