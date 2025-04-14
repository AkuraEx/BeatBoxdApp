import type { AppProps } from 'next/app';
import Banner from "../components/banner";
import { AuthProvider } from '../context/AuthContext';
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Banner />
      <main>
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}
