import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { questions as allQuestions, shortQuestions } from './data/questions'
import { useResultCalculation } from './hooks/useResultCalculation'
import { ResultCard } from './components/ResultCard'
import { RotateCcw, Home } from 'lucide-react'

function App() {
  const [searchParams] = useSearchParams();
  const isShortMode = searchParams.get('mode') === 'short';
  const questions = isShortMode ? shortQuestions : allQuestions;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const result = useResultCalculation(answers, questions)

  const handleAnswer = (value: number) => {
    const question = questions[currentQuestionIndex]
    setAnswers(prev => ({ ...prev, [question.id]: value }))

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentQuestionIndex(0)
    setIsFinished(false)
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-claude-bg py-12 px-4 font-serif">
        <ResultCard 
          archetype={result.archetype} 
          scores={result.scores} 
          badges={result.badges} 
        />
        <div className="text-center mt-8 pb-12 flex justify-center gap-4">
          <button 
            onClick={handleReset}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-claude-bg bg-claude-text hover:bg-claude-accent transition-colors shadow-sm"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            重新测试
          </button>
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 border border-claude-border text-base font-medium rounded-md text-claude-text bg-claude-surface hover:border-claude-accent hover:text-claude-accent transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex) / questions.length) * 100

  return (
    <div className="min-h-screen bg-claude-bg flex flex-col items-center justify-center p-4 font-serif selection:bg-claude-accent selection:text-white">
      <div className="w-full max-w-2xl bg-claude-surface rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-claude-border overflow-hidden transform transition-all">
        {/* Progress Bar */}
        <div className="w-full bg-claude-border h-1.5">
          <div 
            className="bg-claude-accent h-1.5 transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <span className="text-sm font-medium text-claude-text-light tracking-widest uppercase">
              第 {currentQuestionIndex + 1} 题，共 {questions.length} 题
            </span>
            <h2 className="mt-6 text-2xl md:text-3xl font-bold text-claude-text leading-relaxed min-h-[5rem] flex items-center justify-center">
              {currentQuestion.text}
            </h2>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => handleAnswer(1.0)}
              className="w-full p-4 text-lg font-bold text-claude-green bg-claude-green-light/30 border border-claude-border rounded-lg hover:bg-claude-green-light hover:border-claude-green transition-all focus:outline-none focus:ring-2 focus:ring-claude-green"
            >
              强烈同意
            </button>
            <button 
              onClick={() => handleAnswer(0.5)}
              className="w-full p-4 text-lg font-medium text-claude-text bg-claude-bg border border-claude-border rounded-lg hover:bg-claude-green-light/50 hover:border-claude-green/50 transition-all focus:outline-none focus:ring-2 focus:ring-claude-green/50"
            >
              同意
            </button>
            <button 
              onClick={() => handleAnswer(0)}
              className="w-full p-4 text-lg font-medium text-claude-text-light bg-claude-bg border border-claude-border rounded-lg hover:bg-claude-surface hover:border-claude-text-light transition-all focus:outline-none focus:ring-2 focus:ring-claude-text-light"
            >
              中立 / 不确定
            </button>
            <button 
              onClick={() => handleAnswer(-0.5)}
              className="w-full p-4 text-lg font-medium text-claude-text bg-claude-bg border border-claude-border rounded-lg hover:bg-claude-red-light/50 hover:border-claude-red/50 transition-all focus:outline-none focus:ring-2 focus:ring-claude-red/50"
            >
              不同意
            </button>
            <button 
              onClick={() => handleAnswer(-1.0)}
              className="w-full p-4 text-lg font-bold text-claude-red bg-claude-red-light/30 border border-claude-border rounded-lg hover:bg-claude-red-light hover:border-claude-red transition-all focus:outline-none focus:ring-2 focus:ring-claude-red"
            >
              强烈不同意
            </button>
          </div>
          
          <div className="mt-8 flex justify-between items-center text-sm text-claude-text-light">
             {currentQuestionIndex === 0 ? (
               <Link 
                 to="/"
                 className="px-4 py-2 hover:bg-claude-border rounded-lg hover:text-claude-text transition-colors"
               >
                 返回首页
               </Link>
             ) : (
               <button 
                 onClick={handleBack}
                 className="px-4 py-2 hover:bg-claude-border rounded-lg hover:text-claude-text transition-colors"
               >
                 上一题
               </button>
             )}
             <span className="tracking-wider">CS-IDEOLOGIES (CSTI)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
