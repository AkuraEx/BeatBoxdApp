import type { AppProps } from 'next/app';
import Banner from "../components/banner"
import "../styles/globals.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main>
        <Banner />
        <Component {...pageProps} />
      </main>
    </>
  );
}
