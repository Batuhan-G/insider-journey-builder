import { defineStore } from 'pinia'
import { ref } from 'vue'

interface UiState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
}

export const useUiStore = defineStore('ui', () => {
  const sidebarOpen = ref<UiState['sidebarOpen']>(true)
  const theme = ref<UiState['theme']>('light')

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }

  function setTheme(value: UiState['theme']) {
    theme.value = value
  }

  return { sidebarOpen, theme, toggleSidebar, setTheme }
})
