// react
import { useEffect, useRef, useState } from "react"

export default () => {
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0)
  const maxQuestions = 3
  const [inputs, setInputs] = useState<string []>([])
  const answers = ["は", "を", "の"]

  // furigana
  const [furigana, setFurigana] = useState(true)
  const furiganaSwitch = useRef(null)
  const furiganaSwitchHandler = (e: any) => {
    const furiganaCharacters = document.querySelectorAll<HTMLSpanElement>(".furigana span")
    furiganaCharacters.forEach((item) => {
      item.style.display = e.target.checked ? "unset" : "none"
    })
  }

  const inputChange = (e: any) => {
    let tmp = [...inputs]
    tmp[e.target.dataset.index] = e.target.value
    setInputs(tmp)
  }

  const nextClick = () => {
    setCurrentQuestionNum(currentQuestionNum + 1)
  }
  const prevClick = () => {
    if(currentQuestionNum !== 0) setCurrentQuestionNum(currentQuestionNum - 1)
  }

  const submitForm = (e: any) => {
    e.preventDefault()
    if(currentQuestionNum !== maxQuestions){
      e.target.querySelectorAll("input[type=text]")[currentQuestionNum].focus()
    }
    else{
      console.log("submitted") // submit form
    }
  }

  useEffect(()=>{
    document.querySelectorAll<HTMLParagraphElement>(".question").forEach((question, i) => {
      if(i != currentQuestionNum) question.style.display = "none"
      else question.style.display = "unset"
    })
  }, [currentQuestionNum])

  return (
    <main>
      <form onSubmit={submitForm}>
        <div className="topbar">
          <div className="progress-cont">
            <div className="progress" style={{ width: `${currentQuestionNum * 100 / maxQuestions}%` }} />
          </div>
          <div className="controls">
            <input type="checkbox" id="showHideFurigana" onChange={furiganaSwitchHandler} defaultChecked />
            <label htmlFor="showHideFurigana"><div className="furigana">あ<span>あ</span></div></label>
          </div>
        </div>

        <div className="question">
          <div className="furigana">私<span>わたし</span></div>
          <input type="text" className="l-2" maxLength={2} data-index={0} onChange={inputChange} />
          <div className="furigana">松田<span>まつだ</span></div>
          <div className="furigana">樹<span>いつき</span></div>
          です。
        </div>
        <div className="question">
          <div className="furigana">水<span>みず</span></div>
          <input type="text" className="l-2" maxLength={2} data-index={1} onChange={inputChange} />
          <div className="furigana">飲<span>のみ</span></div>
          みます。
        </div>
        <div className="question">
          <div className="furigana">彼女<span>かのじょ</span></div>
          <input type="text" className="l-2" maxLength={2} data-index={2} onChange={inputChange} />
          <div className="furigana">目<span>め</span></div>
          は
          <div className="furigana">緑色<span>みどりいろ</span></div>
          です。
        </div>

        { currentQuestionNum === maxQuestions && 
          <div className="results">
            <div>{ inputs.reduce((total, current, i) => current === answers[i] ? total + 1 : total, 0) } / { maxQuestions }</div>
            <div>{ inputs.reduce((total, current, i) => current === answers[i] ? total + 1 : total, 0) / maxQuestions * 100 }%</div>
          </div>
        }

        { currentQuestionNum < maxQuestions ?
            <nav className="grid">
              <button type="button" onClick={prevClick} className="btn">Previous</button>
              <button onClick={nextClick} className={ currentQuestionNum + 1 === maxQuestions ? "btn black" : "btn" }>{ currentQuestionNum + 1 === maxQuestions ? "See resaults" : "Next" }</button>
            </nav>
          :
            <nav>
              <a href="/" className="btn black">Home</a>
            </nav>
        }

      </form>
    </main>
  )
}