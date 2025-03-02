import type React from "react"
import { useState, useEffect } from "react"
import AnswerOptions from "./AnswerOptions"
import FeedbackDisplay from "./FeedbackDisplay"
import ScoreTracker from "./ScoreTracker"
import ChallengeButton from "./ChallengeButton"

interface Question {
  id: string
  clue: string
  options: string[]
}

interface AnswerResponse {
  correct: boolean
  funFact: string
  city: string
}

interface Score {
  attempted: number
  correct: number
}

const QuizGame: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<AnswerResponse | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState<Score>({ attempted: 0, correct: 0 })
  const [username, setUsername] = useState<string | null>(null)

  const fetchQuestion = async () => {
    setIsLoading(true)
    setSelectedAnswer(null)
    setFeedback(null)
    setShowFeedback(false)

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/question/get-question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username || undefined,
        }),
      })

      if (response.ok) {
        const data: Question = await response.json()
        setQuestion(data)
      } else {
        console.error("Failed to fetch question")
      }
    } catch (error) {
      console.error("Error fetching question:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswer = async (answer: string) => {
    if (!question) return

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/question/submit-answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username || undefined,
          cityId: question.id,
          answer,
        }),
      })

      if (response.ok) {
        const data: AnswerResponse = await response.json()
        setFeedback(data)
        setShowFeedback(true)

        // Update local score
        setScore((prev) => ({
          attempted: prev.attempted + 1,
          correct: data.correct ? prev.correct + 1 : prev.correct,
        }))
      } else {
        console.error("Failed to submit answer")
      }
    } catch (error) {
      console.error("Error submitting answer:", error)
    }
  }

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    submitAnswer(answer)
  }

  const handleNextQuestion = () => {
    fetchQuestion()
  }

  // Register user when they want to challenge friends
  const handleRegisterUser = async (newUsername: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUsername,
          attempted: score.attempted,
          correct: score.correct,
        }),
      })

      if (response.ok) {
        setUsername(newUsername)
        return true
      }
      return false
    } catch (error) {
      console.error("Error registering user:", error)
      return false
    }
  }

  // Fetch first question on component mount
  useEffect(() => {
    fetchQuestion()
  }, []) // Removed username from dependencies

  if (isLoading && !question) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your destination...</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-purple-700">Where in the World?</h1>
        <p className="mt-1 text-gray-600 text-sm">Guess the destination from the clues!</p>
      </div>

      <ScoreTracker score={score} />

      {question && (
        <div className="space-y-6">
          <div className="bg-purple-100 p-4 rounded-lg">
            <h2 className="font-medium text-purple-800 mb-2">Destination Clue:</h2>
            <p className="italic text-gray-700">{question.clue}</p>
          </div>

          {!showFeedback ? (
            <AnswerOptions
              options={question.options}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
              disabled={!!selectedAnswer}
            />
          ) : (
            <FeedbackDisplay
              isCorrect={feedback?.correct || false}
              funFact={feedback?.funFact || ""}
              city={feedback?.city || ""}
              onNext={handleNextQuestion}
            />
          )}
        </div>
      )}

      <ChallengeButton score={score} username={username} onRegister={handleRegisterUser} />
    </div>
  )
}

export default QuizGame;
