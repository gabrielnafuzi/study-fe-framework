import { h } from 'https://unpkg.com/@nafuzi/study-fe-framework@1'

function CreateTodoInput({ value, onChange, onSubmit }) {
  return h('input', {
    type: 'text',
    id: 'todo-input',
    value: value,
    on: {
      input: ({ target }) => onChange(target.value),
      keydown: ({ key }) => {
        if (key === 'Enter' && currentTodo.length >= 3) {
          onSubmit()
        }
      }
    }
  })
}

export function CreateTodo({ currentTodo }, emit) {
  function handleAddTodo() {
    emit('add-todo')
  }

  return h('div', {}, [
    h('label', { for: 'todo-input' }, ['New TODO']),
    CreateTodoInput({
      value: currentTodo,
      onChange: value => emit('update-current-todo', value),
      onSubmit: handleAddTodo
    }),
    h(
      'button',
      {
        disabled: currentTodo.length < 3,
        on: { click: handleAddTodo }
      },
      ['Add']
    )
  ])
}

export function TodoList({ todos, edit }, emit) {
  return h(
    'ul',
    {},
    todos.map((todo, idx) => TodoItem({ todo, idx, edit }, emit))
  )
}

function TodoItem({ todo, idx, edit }, emit) {
  const isEditing = edit.idx === idx

  if (isEditing) {
    return h('li', {}, [
      h('input', {
        value: edit.edited,
        on: { input: ({ target }) => emit('edit-todo', target.value) }
      }),
      h('button', { on: { click: () => emit('save-edited-todo') } }, ['Save']),
      h('button', { on: { click: () => emit('cancel-editing-todo') } }, [
        'Cancel'
      ])
    ])
  }

  return h('li', {}, [
    h('span', { on: { dblclick: () => emit('start-editing-todo', idx) } }, [
      todo
    ]),

    h('button', { on: { click: () => emit('remove-todo', idx) } }, ['Done'])
  ])
}
