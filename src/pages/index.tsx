// react
import { useEffect, useState } from "react"
// zustand
import useSettings from "@/store/useSettings"

export default () => {
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0)
  const [inputs, setInputs] = useState<string[]>([])
  const questions = [
    [ ["私", "わたし"], 2, ["松田", "まつだ"], ["樹", "いつき"], "です。" ],
    [ ["水", "みず"], 2, ["飲", "のみ"], "ます。" ],
    [ ["彼女", "かのじょ"], 2, ["目", "め"], "は", ["緑色", "みどりいろ"], "です。" ]
  ]
  const answers = ["は", "を", "の"]

  // furigana
  const furiganaState = useSettings(state => state.furigana)
  const furiganaToggle = useSettings(state => state.furiganaToggle)
  useEffect(()=>{
    const furiganaCharacters = document.querySelectorAll<HTMLSpanElement>(".furigana span")
    furiganaCharacters.forEach(item => item.style.display = furiganaState ? "unset" : "none")
  }, [furiganaState])

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
    if(currentQuestionNum !== answers.length) e.target.querySelectorAll("input[type=text]")[currentQuestionNum].focus()
    else console.log("submitted") // submit form
  }

  useEffect(()=>{
    document.querySelectorAll<HTMLParagraphElement>(".question").forEach((question, i) => {
      if(i != currentQuestionNum) question.style.display = "none"
      else question.style.display = "flex"
    })
  }, [currentQuestionNum])

  return (
    <main>
      <form onSubmit={submitForm}>
        
        {/* Topbar with Progress and FuriganaToggler */}
        <div className="topbar">
          <div className="progress-cont"><div className="progress" style={{ width: `${currentQuestionNum * 100 / answers.length}%` }} /></div>
          <div tabIndex={0} onClick={furiganaToggle}><div className="furigana">あ<span>あ</span></div></div>
        </div>

        {/* Questions */}
        <div className="questions">
          {
            questions.map((question, i) => (
              <div className="question" key={`question_${i}`}>
                {
                  question.map((item, j) => {
                    switch(typeof item){
                      case "string":
                        return ( <div key={`item_${j}`}>{ item }</div> )
                      case "object":
                        return ( <div className="furigana" key={`item_${j}`}>{ item[0] }<span>{ item[1] }</span></div> )
                      case "number":
                        return ( <input type="text" maxLength={item} data-index={i} onChange={inputChange} style={{ width: `${item}rem` }} key={`item_${j}`} /> )
                    }
                  })
                }
              </div>
            ))
          }
        </div>

        {/* Results Screen */}
        {
          currentQuestionNum === answers.length && 
            <div className="results">
              <div>{ inputs.reduce((total, current, i) => current === answers[i] ? total + 1 : total, 0) } / { answers.length }</div>
              <div>{ inputs.reduce((total, current, i) => current === answers[i] ? total + 1 : total, 0) / answers.length * 100 }%</div>
            </div>
        }

        {/* Navigation Buttons */}
        {
          currentQuestionNum < answers.length ?
            <nav className="grid">
              <button type="button" onClick={prevClick} className="btn">Previous</button>
              <button onClick={nextClick} className={ currentQuestionNum + 1 === answers.length ? "btn black" : "btn" }>{ currentQuestionNum + 1 === answers.length ? "See resaults" : "Next" }</button>
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