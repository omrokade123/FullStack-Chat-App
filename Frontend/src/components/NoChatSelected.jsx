import React from 'react'
import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
     <div className="w-full flex flex-1 flex-col items-center justify-center p-6 sm:p-16 bg-gradient-to-br from-base-100 via-base-100 to-base-200/30">
      <div className="max-w-md text-center space-y-8">
        {/* Icon Display */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
            <div
              className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center"
            >
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Welcome to Chatty!</h2>
          <p className="text-base-content/60 text-lg">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    </div>
  )
}

export default NoChatSelected