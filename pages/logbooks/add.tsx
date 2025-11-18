import { useRouter } from 'next/router'
import { AddLogbook } from '../../components'
import { useAppState } from '../../components/state/AppState'

export default function AddLogbookPage() {
  const router = useRouter()
  const { prefilledIndicator, setPrefilledIndicator } = useAppState()

  return (
    <AddLogbook
      onBack={() => {
        setPrefilledIndicator(null)
        router.back()
      }}
      prefilledData={prefilledIndicator}
    />
  )
}