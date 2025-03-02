import type React from "react"
import { useContext, useState } from "react"
import html2canvas from "html2canvas"
import UserRegistrationModal from "./UserRegistrationModal"
import { UserContext } from "../context/UserContext"

interface ChallengeButtonProps {
  score: {
    attempted: number
    correct: number
  }
  username: string | null
  onRegister: (username: string) => Promise<boolean>
}

const ChallengeButton: React.FC<ChallengeButtonProps> = ({ score, username, onRegister }) => {
  const { updateUsername } = useContext(UserContext);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)

  const handleChallenge = () => {
    if (!username) {
      setShowRegistration(true)
    } else {
      setShowShareOptions(true)
    }
  }

  const handleRegistrationSuccess = async (newUsername: string) => {
    const success = await onRegister(newUsername)
    if (success) {
      setShowRegistration(false)
      setShowShareOptions(true)
      updateUsername(newUsername)
    }
  }

  const generateShareImage = async () => {
    if (!username) return

    setIsGeneratingImage(true)

    try {
      // Create a temporary element to capture
      const element = document.createElement("div")
      element.style.position = "absolute"
      element.style.left = "-9999px"
      element.style.top = "-9999px"
      element.style.width = "600px"
      element.style.height = "315px"
      element.style.padding = "20px"
      element.style.background = "linear-gradient(to right, #8a2387, #e94057, #f27121)"
      element.style.color = "white"
      element.style.fontFamily = "Arial, sans-serif"
      element.style.display = "flex"
      element.style.flexDirection = "column"
      element.style.justifyContent = "center"
      element.style.alignItems = "center"
      element.style.textAlign = "center"

      element.innerHTML = `
        <h1 style="font-size: 32px; margin-bottom: 10px;">Travel Quiz Challenge!</h1>
        <p style="font-size: 24px; margin-bottom: 20px;">I've scored ${score.correct} out of ${score.attempted} questions!</p>
        <p style="font-size: 20px;">Think you can beat me? Click the link to try!</p>
        <p style="font-size: 16px; margin-top: 20px;">- ${username}</p>
      `

      document.body.appendChild(element)

      const canvas = await html2canvas(element)
      document.body.removeChild(element)

      const imageUrl = canvas.toDataURL("image/png")

      // Create share link
      const shareUrl = `${window.location.origin}${window.location.pathname}?invitedBy=${encodeURIComponent(username)}`

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "shared-image.png", { type: "image/png" });

      // Check if Web Share API supports sharing files
      const shareObject = {
        title: "Check this out!",
        text: `Hey, check this out: ${shareUrl}`,
        url: shareUrl,
        files: [file]
      };
      if (navigator.canShare && navigator.canShare(shareObject)) {
        await navigator.share(shareObject);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Sharing is not supported on this device. Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error generating share image:", error)
      alert("Failed to generate share image. Please try again.")
    } finally {
      setIsGeneratingImage(false)
      setShowShareOptions(false)
    }
  }

  return (
    <>
      <button
        onClick={handleChallenge}
        className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
      >
        <span className="mr-2">🎮</span> Challenge a Friend
      </button>

      {showRegistration && (
        <UserRegistrationModal onClose={() => setShowRegistration(false)} onRegister={handleRegistrationSuccess} />
      )}

      {showShareOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Challenge a Friend</h3>
            <p className="mb-4">Share your score and challenge your friends to beat it!</p>

            <div className="space-y-3">
              <button
                onClick={generateShareImage}
                disabled={isGeneratingImage}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                {isGeneratingImage ? "Generating..." : "Share on WhatsApp"}
              </button>

              <button
                onClick={() => setShowShareOptions(false)}
                className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChallengeButton;
