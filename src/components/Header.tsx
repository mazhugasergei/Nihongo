// react
import { useEffect } from 'react'
// next
import Link from 'next/link'
// zustand
import useSettings from "@/store/useSettings"

export default () => {
  // furigana
  const furiganaState = useSettings(state => state.furigana)
  const furiganaToggle = useSettings(state => state.furiganaToggle)
  useEffect(()=>{
    const furiganaCharacters = document.querySelectorAll<HTMLSpanElement>(".furigana span")
    furiganaCharacters.forEach(item => item.style.display = furiganaState ? "unset" : "none")
    document.body.style.lineHeight = furiganaState ? "1.8" : "1.5"
  }, [furiganaState])

  return (
    <header>
      <Link href="/">Home</Link>   
      <button onClick={furiganaToggle} style={{ cursor: "pointer", userSelect: "none" }}><div className="furigana">あ<span>あ</span></div></button>
    </header>
  )
}