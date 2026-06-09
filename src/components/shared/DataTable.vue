<script setup lang="ts" generic="T extends Record<string, unknown>">
import EmptyState from './EmptyState.vue'
import LoadingSpinner from './LoadingSpinner.vue'

export interface Column<TRow> {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  render?: (row: TRow) => string
}

interface Props {
  columns: Column<T>[]
  rows: T[]
  rowKey: keyof T
  loading?: boolean
  emptyTitle?: string
  emptyDescription?: string
}

withDefaults(defineProps<Props>(), {
  loading: false,
  emptyTitle: 'No data',
  emptyDescription: undefined,
})
</script>

<template>
  <div class="relative overflow-hidden rounded-lg border border-gray-200 bg-white">
    <LoadingSpinner v-if="loading" />

    <template v-else>
      <div v-if="rows.length === 0">
        <EmptyState :title="emptyTitle" :description="emptyDescription" />
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="col in columns"
                :key="col.key"
                :class="[
                  'px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-500',
                  {
                    'text-left': col.align === 'left' || !col.align,
                    'text-center': col.align === 'center',
                    'text-right': col.align === 'right',
                  },
                ]"
              >
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="row in rows"
              :key="String(row[rowKey])"
              class="hover:bg-gray-50 transition-colors"
            >
              <td
                v-for="col in columns"
                :key="col.key"
                :class="[
                  'px-4 py-3 text-sm text-gray-700',
                  {
                    'text-left': col.align === 'left' || !col.align,
                    'text-center': col.align === 'center',
                    'text-right': col.align === 'right',
                  },
                ]"
              >
                <slot :name="col.key" :row="row" :value="row[col.key]">
                  {{ col.render ? col.render(row) : row[col.key] }}
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
