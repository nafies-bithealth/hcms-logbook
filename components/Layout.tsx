import React from 'react'
import { useRouter } from 'next/router'
import { Sidebar as LegacySidebar } from '../src/components/Sidebar'
import { useUIState } from './state/UIState'
import { useAppState } from './state/AppState'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { sidebarOpen, openSidebar, closeSidebar } = useUIState()
  const { clearAllSelections } = useAppState()

  const path = router.pathname
  const currentMenu = path.startsWith('/preceptor')
    ? 'preceptor'
    : path.startsWith('/acknowledgement')
      ? 'acknowledgement'
      : 'logbook'

  const handleMenuSelect = (menu: string) => {
    clearAllSelections()
    if (menu === 'preceptor') router.push('/preceptor')
    else if (menu === 'acknowledgement') router.push('/acknowledgement')
    else router.push('/')
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="md:grid md:grid-cols-[280px_1fr] md:min-h-screen">
        <div className="md:hidden">
          <LegacySidebar
            isOpen={sidebarOpen}
            onClose={closeSidebar}
            currentMenu={currentMenu}
            onMenuSelect={handleMenuSelect}
            mode="overlay"
          />
        </div>
        <main className="w-full">
          {React.cloneElement(children as React.ReactElement<any>, { onMenuClick: openSidebar })}
        </main>
      </div>
    </div>
  )
}