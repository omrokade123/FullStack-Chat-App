import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 sm:p-4 border-b border-base-300 bg-gradient-to-r from-base-100 to-base-100/95 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 sm:size-12 rounded-full relative flex-shrink-0 ring-2 ring-primary/20">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
              {onlineUsers.includes(selectedUser._id) && (
                <span className="absolute bottom-0 right-0 size-3 sm:size-3.5 bg-green-500 rounded-full ring-2 ring-base-100"></span>
              )}
            </div>
          </div>

          {/* User info */}
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm sm:text-base truncate">{selectedUser.fullName}</h3>
            <p className={`text-xs sm:text-sm transition-colors ${
              onlineUsers.includes(selectedUser._id) 
                ? "text-green-500 font-medium" 
                : "text-base-content/60"
            }`}>
              {onlineUsers.includes(selectedUser._id) ? "🟢 Online" : "🔴 Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)} className="btn btn-ghost btn-circle btn-sm ml-2 flex-shrink-0 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300">
          <X size={20} className="sm:size-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;