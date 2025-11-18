import { useRouter } from 'next/router'
import { PreceptorLogbookDetail } from '../../../components'
import { useAppState } from '../../../components/state/AppState'

export default function PreceptorLogbookDetailPage() {
  const router = useRouter()
  const { selectedEmployee, selectedPreceptorLogbook } = useAppState()

  if (!selectedEmployee || !selectedPreceptorLogbook) {
    router.replace('/preceptor/logbooks')
    return null
  }

  return (
    <PreceptorLogbookDetail
      employee={selectedEmployee}
      logbook={selectedPreceptorLogbook}
      onBack={() => router.push('/preceptor/logbooks')}
    />
  )
}

export async function getServerSideProps() {
  return { props: {} }
}