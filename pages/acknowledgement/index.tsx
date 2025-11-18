import { useRouter } from 'next/router'
import { AcknowledgementEmployeeList } from '../../components'
import { useAppState } from '../../components/state/AppState'

export default function AcknowledgementEmployeePage() {
  const router = useRouter()
  const { setSelectedAcknowledgementEmployee } = useAppState()

  return (
    <AcknowledgementEmployeeList
      onBack={() => router.push('/')}
      onSelectEmployee={(e) => {
        setSelectedAcknowledgementEmployee(e)
        router.push('/acknowledgement/logbooks')
      }}
    />
  )
}