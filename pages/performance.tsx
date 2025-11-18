import { useRouter } from 'next/router'
import { PerformanceIndicators } from '../components'
import { useAppState } from '../components/state/AppState'

export default function PerformancePage() {
  const router = useRouter()
  const { selectedLogbook, setPrefilledIndicator, setSelectedIndicator } = useAppState()

  if (!selectedLogbook) {
    router.replace('/')
    return null
  }

  return (
    <PerformanceIndicators
      logbookTitle={selectedLogbook.title}
      onBack={() => router.push('/')}
      onAddIndicator={(indicator) => {
        setPrefilledIndicator(indicator)
        router.push('/logbooks/add')
      }}
      onAddNewLogbook={() => router.push('/logbooks/add')}
      onViewIndicator={(indicator) => {
        setSelectedIndicator(indicator)
        router.push('/logbooks/filter')
      }}
    />
  )
}

export async function getServerSideProps() {
  return { props: {} }
}