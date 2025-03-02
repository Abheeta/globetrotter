import React from "react"

interface UserContextType {
  username: string | null
  score: {
    attempted: number
    correct: number
  }
  updateScore: (attempted: number, correct: number) => void
  updateUsername: (newUsername: string) => void
}

export const UserContext = React.createContext<UserContextType>({
  username: null,
  score: { attempted: 0, correct: 0 },
  updateScore: () => {},
  updateUsername: () => {},
});
