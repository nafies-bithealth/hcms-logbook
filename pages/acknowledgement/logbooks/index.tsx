import { useRouter } from 'next/router'
import { AcknowledgementLogbookList } from '../../../components'
import { useAppState } from '../../../components/state/AppState'

export default function AcknowledgementLogbooksPage() {
  const router = useRouter()
  const { selectedAcknowledgementEmployee, setSelectedAcknowledgementLogbook } = useAppState()

  if (!selectedAcknowledgementEmployee) {
    router.replace('/acknowledgement')
    return null
  }

  return (
    <AcknowledgementLogbookList
      employee={selectedAcknowledgementEmployee}
      onBack={() => router.push('/acknowledgement')}
      onViewDetails={(l) => {
        setSelectedAcknowledgementLogbook(l)
        router.push('/acknowledgement/logbooks/detail')
      }}
    />
  )
}