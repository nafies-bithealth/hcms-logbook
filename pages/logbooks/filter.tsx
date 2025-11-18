import { useRouter } from 'next/router'
import { FilteredLogbookList } from '../../components'
import { useAppState } from '../../components/state/AppState'

export default function FilteredLogbooksPage() {
  const router = useRouter()
  const { selectedIndicator, selectedLogbook, setPrefilledIndicator } = useAppState()

  if (!selectedIndicator) {
    router.replace('/')
    return null
  }

  const { name, package: pkg, competency } = selectedIndicator

  return (
    <FilteredLogbookList
      indicatorName={name}
      packageName={pkg}
      competency={competency}
      onBack={() => {
        if (selectedLogbook) router.push('/performance')
        else router.push('/')
      }}
      onAddLogbook={(prefilled) => {
        setPrefilledIndicator(prefilled)
        router.push('/logbooks/add')
      }}
    />
  )
}

export async function getServerSideProps() {
  return { props: {} }
}