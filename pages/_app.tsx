import type { AppProps } from 'next/app'
import '../src/styles/globals.css'
import '../src/index.css'
import { AppStateProvider } from '../components/state/AppState'
import { UIStateProvider } from '../components/state/UIState'
import Layout from '../components/Layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider>
      <UIStateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIStateProvider>
    </AppStateProvider>
  )
}