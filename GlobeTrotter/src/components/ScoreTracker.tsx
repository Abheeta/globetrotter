import type React from "react"

interface ScoreTrackerProps {
  score: {
    attempted: number
    correct: number
  }
}

const ScoreTracker: React.FC<ScoreTrackerProps> = ({ score }) => {
  const percentage = score.attempted > 0 ? Math.round((score.correct / score.attempted) * 100) : 0

  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
      <div>
        <p className="text-sm text-gray-600">Score</p>
        <p className="font-bold text-purple-700">
          {score.correct} / {score.attempted}
        </p>
      </div>

      <div className="w-24 h-24 relative">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="3"
            strokeDasharray="100, 100"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#9333ea"
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
          />
          <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="#666">
            {percentage}%
          </text>
        </svg>
      </div>
    </div>
  )
}

export default ScoreTracker;
