import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'

// styles
import "@/styles/main.css"
import "@/styles/reset.css"

import { AuthProvider } from '@/providers/AuthContext'
import { AppProps } from 'next/app'


function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
  )
}

export default App
