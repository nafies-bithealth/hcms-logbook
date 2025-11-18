import { useRouter } from 'next/router'
import { PreceptorEmployeeList } from '../../components'
import { useAppState } from '../../components/state/AppState'

export default function PreceptorEmployeePage() {
  const router = useRouter()
  const { setSelectedEmployee } = useAppState()

  return (
    <PreceptorEmployeeList
      onBack={() => router.push('/')}
      onSelectEmployee={(e) => {
        setSelectedEmployee(e)
        router.push('/preceptor/logbooks')
      }}
    />
  )
}