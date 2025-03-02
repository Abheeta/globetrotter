import type React from "react"
import { useState, useEffect } from "react"
import QuizGame from "./components/QuizGame"
import { UserContext } from "./context/UserContext"
import "./index.css"

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null)
  const [score, setScore] = useState({ attempted: 0, correct: 0 })

  // Check if there's a username in URL params (for invited users)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const invitedBy = params.get("invitedBy")

    if (invitedBy) {
      // Fetch the inviter's score
      fetchUserScore(invitedBy)
    }
  }, [])

  const fetchUserScore = async (username: string) => {
    try {
      // This would be an API call to get the user's score
      // For now, we'll just simulate it
      console.log(`Fetching score for ${username}`)
      // In a real app, you would fetch this from your backend
    } catch (error) {
      console.error("Error fetching user score:", error)
    }
  }

  const updateScore = (attempted: number, correct: number) => {
    setScore({ attempted, correct })
  }

  const updateUsername = (newUsername: string) => {
    setUsername(newUsername)
  }

  return (
    <UserContext.Provider value={{ username, updateUsername, score, updateScore }}>
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
          <QuizGame />
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default App;
