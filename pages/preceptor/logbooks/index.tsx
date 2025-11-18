import { useRouter } from 'next/router'
import { PreceptorLogbookList } from '../../../components'
import { useAppState } from '../../../components/state/AppState'

export default function PreceptorLogbooksPage() {
  const router = useRouter()
  const { selectedEmployee, setSelectedPreceptorLogbook } = useAppState()

  if (!selectedEmployee) {
    router.replace('/preceptor')
    return null
  }

  return (
    <PreceptorLogbookList
      employee={selectedEmployee}
      onBack={() => router.push('/preceptor')}
      onViewDetails={(l) => {
        setSelectedPreceptorLogbook(l)
        router.push('/preceptor/logbooks/detail')
      }}
    />
  )
}