import { useRouter } from 'next/router'
import { AcknowledgementLogbookDetail } from '../../../components'
import { useAppState } from '../../../components/state/AppState'

export default function AcknowledgementLogbookDetailPage() {
  const router = useRouter()
  const { selectedAcknowledgementEmployee, selectedAcknowledgementLogbook } = useAppState()

  if (!selectedAcknowledgementEmployee || !selectedAcknowledgementLogbook) {
    router.replace('/acknowledgement/logbooks')
    return null
  }

  return (
    <AcknowledgementLogbookDetail
      employee={selectedAcknowledgementEmployee}
      logbook={selectedAcknowledgementLogbook}
      onBack={() => router.push('/acknowledgement/logbooks')}
    />
  )
}