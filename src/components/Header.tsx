// react
import { useEffect, useRef } from 'react'
// next
import Link from 'next/link'
// zustand
import useSettings from "@/store/useSettings"

export default () => {
  const furiganaToggleButton = useRef<HTMLDivElement>(null)

  // furigana
  const furiganaState = useSettings(state => state.furigana)
  const furiganaToggle = useSettings(state => state.furiganaToggle)
  useEffect(()=>{
    const furiganaCharacters = document.querySelectorAll<HTMLSpanElement>(".furigana span")
    furiganaCharacters.forEach(item => item.style.display = furiganaState ? "unset" : "none")
    document.body.style.lineHeight = furiganaState ? "1.8" : "1.5"
  }, [furiganaState])

  const hnadleFuriganaToggle = (e: any) => {
    if(e.code === "Space"){
      e.preventDefault()
      furiganaToggle()
    }
  }

  return (
    <header>
      <Link href="/">Home</Link>
      <div ref={furiganaToggleButton} onClick={furiganaToggle} onKeyDown={hnadleFuriganaToggle} tabIndex={0} style={{ cursor: "pointer", userSelect: "none" }}><div className="furigana">あ<span>あ</span></div></div>
    </header>
  )
}