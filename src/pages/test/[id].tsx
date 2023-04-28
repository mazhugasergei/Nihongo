// react
import { useEffect, useState } from "react"
// next
import Link from "next/link"
// fetch from file
import path from "path"
import fs from "fs"



interface context {
  params: {
    id: string
  }
}

interface ComponentProps {
  questions: [ [ string[] | number | string ] ]
  answers: string[]
}



export const getServerSideProps = async (context: context) => {
  const { id } = context.params

  const filePath = path.join(process.cwd(), `src/api/tests/${id}.json`)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const data = JSON.parse(fileContents)

  return {
    props: data
  }
}



export default ({ questions, answers }: ComponentProps) => {
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0)
  const [inputs, setInputs] = useState<string[]>([])

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
      <form className="test" onSubmit={submitForm}>

        {/* Progress bar */}
        <div className="progress-cont"><div className="progress" style={{ width: `${currentQuestionNum * 100 / answers.length}%` }} /></div>

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
              <div>{ (inputs.reduce((total, current, i) => current === answers[i] ? total + 1 : total, 0) / answers.length * 100).toFixed(2) }%</div>
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
              <Link href="/" className="btn black">Home</Link>
            </nav>
        }

      </form>
    </main>
  )
}