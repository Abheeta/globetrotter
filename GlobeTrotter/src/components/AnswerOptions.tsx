import type React from "react"

interface AnswerOptionsProps {
  options: string[]
  selectedAnswer: string | null
  onSelectAnswer: (answer: string) => void
  disabled: boolean
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ options, selectedAnswer, onSelectAnswer, disabled }) => {
  return (
    <div className="space-y-3">
      <h2 className="font-medium text-gray-700">Select the destination:</h2>
      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => !disabled && onSelectAnswer(option)}
            disabled={disabled}
            className={`p-3 rounded-lg text-left transition-all ${
              selectedAnswer === option
                ? "bg-purple-600 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-50"
            } ${disabled && selectedAnswer !== option ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AnswerOptions;
