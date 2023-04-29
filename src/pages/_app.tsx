import '@/assets/styles/index.css'
// react
import { useEffect } from 'react'
// next
import type { AppProps } from 'next/app'
// zustand
import useSettings from "@/store/useSettings"
// components
import Header from '@/components/Header'

export default function App({ Component, pageProps }: AppProps) {
  // furigana
  const furiganaState = useSettings(state => state.furigana)
  const furiganaToggle = useSettings(state => state.furiganaToggle)
  useEffect(()=>{
    const furiganaCharacters = document.querySelectorAll<HTMLSpanElement>(".furigana span")
    furiganaCharacters.forEach(item => item.style.display = furiganaState ? "unset" : "none")
  })

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}