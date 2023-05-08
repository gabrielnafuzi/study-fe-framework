import { expect, test, vi } from 'vitest'
import { h } from '../h'

test('returns correct object', () => {
  const mockOnClick = vi.fn()

  expect(
    h('form', { class: 'login-form', action: 'login' }, [
      h('input', { type: 'text', name: 'user' }),
      h('input', { type: 'password', name: 'pass' }),
      h('button', { on: { click: mockOnClick } }, ['Login'])
    ])
  ).toStrictEqual({
    tag: 'form',
    type: 'element',
    props: { class: 'login-form', action: 'login' },
    children: [
      {
        tag: 'input',
        type: 'element',
        children: [],
        props: { type: 'text', name: 'user' }
      },
      {
        tag: 'input',
        type: 'element',
        children: [],
        props: { type: 'password', name: 'pass' }
      },
      {
        tag: 'button',
        type: 'element',
        props: { on: { click: mockOnClick } },
        children: [{ type: 'text', value: 'Login' }]
      }
    ]
  })
})
