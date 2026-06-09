import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DataTable from './DataTable.vue'
import type { Column } from './DataTable.vue'

interface Row extends Record<string, unknown> {
  id: number
  name: string
  status: string
}

const columns: Column<Row>[] = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
]

const rows: Row[] = [
  { id: 1, name: 'Welcome Flow', status: 'active' },
  { id: 2, name: 'Cart Recovery', status: 'draft' },
]

describe('DataTable', () => {
  it('renders column headers', () => {
    const wrapper = mount(DataTable, { props: { columns, rows, rowKey: 'id' } })
    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Status')
  })

  it('renders row data', () => {
    const wrapper = mount(DataTable, { props: { columns, rows, rowKey: 'id' } })
    expect(wrapper.text()).toContain('Welcome Flow')
    expect(wrapper.text()).toContain('Cart Recovery')
  })

  it('renders correct number of rows', () => {
    const wrapper = mount(DataTable, { props: { columns, rows, rowKey: 'id' } })
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
  })

  it('shows EmptyState when rows is empty', () => {
    const wrapper = mount(DataTable, {
      props: { columns, rows: [], rowKey: 'id', emptyTitle: 'No results' },
    })
    expect(wrapper.text()).toContain('No results')
    expect(wrapper.find('table').exists()).toBe(false)
  })

  it('shows LoadingSpinner when loading is true', () => {
    const wrapper = mount(DataTable, {
      props: { columns, rows, rowKey: 'id', loading: true },
    })
    expect(wrapper.find('table').exists()).toBe(false)
    expect(wrapper.find('[role="status"]').exists()).toBe(true)
  })

  it('uses render function when provided', () => {
    const cols: Column<Row>[] = [
      { key: 'name', label: 'Name', render: (row) => row.name.toUpperCase() },
    ]
    const wrapper = mount(DataTable, { props: { columns: cols, rows, rowKey: 'id' } })
    expect(wrapper.text()).toContain('WELCOME FLOW')
  })

  it('applies right alignment class when specified', () => {
    const cols: Column<Row>[] = [{ key: 'name', label: 'Name', align: 'right' }]
    const wrapper = mount(DataTable, { props: { columns: cols, rows, rowKey: 'id' } })
    expect(wrapper.find('th').classes()).toContain('text-right')
  })
})
