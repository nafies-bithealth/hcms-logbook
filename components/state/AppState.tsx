import React, { createContext, useContext, useMemo, useState } from 'react'

interface LogbookEntry {
  id: string
  title: string
  currentLog: number
  totalLog: number
  percentage: number
  level: string
  levelType: 'current' | 'target'
}

interface Employee {
  id: string
  name: string
  employeeId: string
  department: string
  departmentCode: string
  pendingCount: number
  position: string
}

interface PreceptorLogbook {
  id: string
  performanceIndicator: string
  packageLevel: string
  competency: string
  date: Date
  remarks: string
  status: 'pending' | 'approved' | 'rejected'
}

interface AcknowledgementLogbook {
  id: string
  performanceIndicator: string
  packageLevel: string
  competency: string
  date: Date
  remarks: string
  status: 'pending' | 'acknowledged' | 'rejected'
}

interface IndicatorData {
  id: string
  name: string
  package: string
  competency: string
}

interface PrefilledIndicator {
  name: string
  package: string
  competency: string
}

interface AppStateValue {
  selectedLogbook: LogbookEntry | null
  setSelectedLogbook: (l: LogbookEntry | null) => void
  prefilledIndicator: PrefilledIndicator | null
  setPrefilledIndicator: (p: PrefilledIndicator | null) => void
  selectedIndicator: IndicatorData | null
  setSelectedIndicator: (i: IndicatorData | null) => void
  selectedEmployee: Employee | null
  setSelectedEmployee: (e: Employee | null) => void
  selectedPreceptorLogbook: PreceptorLogbook | null
  setSelectedPreceptorLogbook: (l: PreceptorLogbook | null) => void
  selectedAcknowledgementEmployee: Employee | null
  setSelectedAcknowledgementEmployee: (e: Employee | null) => void
  selectedAcknowledgementLogbook: AcknowledgementLogbook | null
  setSelectedAcknowledgementLogbook: (l: AcknowledgementLogbook | null) => void
  clearAllSelections: () => void
}

const AppStateContext = createContext<AppStateValue | undefined>(undefined)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [selectedLogbook, setSelectedLogbook] = useState<LogbookEntry | null>(null)
  const [prefilledIndicator, setPrefilledIndicator] = useState<PrefilledIndicator | null>(null)
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorData | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [selectedPreceptorLogbook, setSelectedPreceptorLogbook] = useState<PreceptorLogbook | null>(null)
  const [selectedAcknowledgementEmployee, setSelectedAcknowledgementEmployee] = useState<Employee | null>(null)
  const [selectedAcknowledgementLogbook, setSelectedAcknowledgementLogbook] = useState<AcknowledgementLogbook | null>(null)

  const clearAllSelections = () => {
    setSelectedLogbook(null)
    setPrefilledIndicator(null)
    setSelectedIndicator(null)
    setSelectedEmployee(null)
    setSelectedPreceptorLogbook(null)
    setSelectedAcknowledgementEmployee(null)
    setSelectedAcknowledgementLogbook(null)
  }

  const value = useMemo<AppStateValue>(() => ({
    selectedLogbook,
    setSelectedLogbook,
    prefilledIndicator,
    setPrefilledIndicator,
    selectedIndicator,
    setSelectedIndicator,
    selectedEmployee,
    setSelectedEmployee,
    selectedPreceptorLogbook,
    setSelectedPreceptorLogbook,
    selectedAcknowledgementEmployee,
    setSelectedAcknowledgementEmployee,
    selectedAcknowledgementLogbook,
    setSelectedAcknowledgementLogbook,
    clearAllSelections,
  }), [
    selectedLogbook,
    prefilledIndicator,
    selectedIndicator,
    selectedEmployee,
    selectedPreceptorLogbook,
    selectedAcknowledgementEmployee,
    selectedAcknowledgementLogbook,
  ])

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}