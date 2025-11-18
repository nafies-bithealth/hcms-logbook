import React, { createContext, useContext, useState } from 'react'

interface UIStateValue {
  sidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
}

const UIStateContext = createContext<UIStateValue | undefined>(undefined)

export function UIStateProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const openSidebar = () => setSidebarOpen(true)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <UIStateContext.Provider value={{ sidebarOpen, openSidebar, closeSidebar }}>
      {children}
    </UIStateContext.Provider>
  )
}

export function useUIState() {
  const ctx = useContext(UIStateContext)
  if (!ctx) throw new Error('useUIState must be used within UIStateProvider')
  return ctx
}