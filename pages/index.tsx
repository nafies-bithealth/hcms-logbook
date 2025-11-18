import { useRouter } from 'next/router'
import { LogbookList } from '../components'
import { useAppState } from '../components/state/AppState'
import { useUIState } from '../components/state/UIState'

export default function HomePage() {
  const router = useRouter()
  const { setSelectedLogbook, setPrefilledIndicator, setSelectedIndicator } = useAppState()
  const { openSidebar } = useUIState()

  return (
    <LogbookList
      onMenuClick={openSidebar}
      onCardClick={(entry) => {
        setSelectedLogbook(entry)
        router.push('/performance')
      }}
      onAddLogbook={() => router.push('/logbooks/add')}
      onViewIndicator={(indicator) => {
        setSelectedIndicator(indicator)
        router.push('/logbooks/filter')
      }}
      onAddLogbookWithData={(data) => {
        setPrefilledIndicator(data)
        router.push('/logbooks/add')
      }}
    />
  )
}

export async function getServerSideProps() {
  return { props: {} }
}