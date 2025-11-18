import { useRouter } from 'next/router'
import { AcknowledgementEmployeeList } from '../../components'
import { useAppState } from '../../components/state/AppState'
import { useUIState } from '../../components/state/UIState'

export default function AcknowledgementEmployeePage() {
  const router = useRouter()
  const { setSelectedAcknowledgementEmployee } = useAppState()
  const { openSidebar } = useUIState()

  return (
    <AcknowledgementEmployeeList
      onBack={() => router.push('/')}
      onSelectEmployee={(e) => {
        setSelectedAcknowledgementEmployee(e)
        router.push('/acknowledgement/logbooks')
      }}
      openSidebar={openSidebar}
    />
  )
}

export async function getServerSideProps() {
  return { props: {} }
}