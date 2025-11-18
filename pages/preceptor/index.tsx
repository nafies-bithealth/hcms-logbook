import { useRouter } from 'next/router'
import { PreceptorEmployeeList } from '../../components'
import { useAppState } from '../../components/state/AppState'
import { useUIState } from '../../components/state/UIState'

export default function PreceptorEmployeePage() {
  const router = useRouter()
  const { setSelectedEmployee } = useAppState()
  const { openSidebar } = useUIState()

  return (
    <PreceptorEmployeeList
      onBack={() => router.push('/')}
      onSelectEmployee={(e) => {
        setSelectedEmployee(e)
        router.push('/preceptor/logbooks')
      }}
      openSidebar={openSidebar}
    />
  )
}

export async function getServerSideProps() {
  return { props: {} }
}