import type React from "react"
import { useEffect, useState } from "react"
import Confetti from "react-confetti"

interface FeedbackDisplayProps {
  isCorrect: boolean
  funFact: string
  onNext: () => void
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ isCorrect, funFact, onNext }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="text-center space-y-4">
      {isCorrect && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}

      <div className="flex justify-center">
        {isCorrect ? (
          <div className="text-6xl animate-bounce">🎉</div>
        ) : (
          <div className="text-6xl animate-pulse">😢</div>
        )}
      </div>

      <h2 className={`text-xl font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
        {isCorrect ? "Correct!" : "Incorrect!"}
      </h2>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-1">Fun Fact:</h3>
        <p className="text-gray-600">{funFact}</p>
      </div>

      <button
        onClick={onNext}
        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Next Question
      </button>
    </div>
  )
}

export default FeedbackDisplay;
