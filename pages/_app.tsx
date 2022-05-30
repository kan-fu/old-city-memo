import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {AuthProvider} from '../context/context'
import Script from 'next/script'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>

      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
