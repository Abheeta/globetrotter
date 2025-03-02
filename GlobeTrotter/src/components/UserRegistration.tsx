import type React from "react"
import { useState } from "react"

interface UserRegistrationProps {
  onRegister: (username: string) => void
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegister }) => {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      setIsLoading(true)
      onRegister(username.trim())
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-purple-700">Travel Quiz Challenge</h1>
        <p className="mt-2 text-gray-600">Enter a username to start playing!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !username.trim()}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoading || !username.trim()
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          }`}
        >
          {isLoading ? "Loading..." : "Start Playing"}
        </button>
      </form>

      <div className="text-center text-sm text-gray-500">
        <p>Challenge your friends to see who knows more about world destinations!</p>
      </div>
    </div>
  )
}

export default UserRegistration;
