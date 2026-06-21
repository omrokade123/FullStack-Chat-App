import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2 sm:p-2.5 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-8 sm:size-10 rounded-full relative flex-shrink-0">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-sm sm:text-base truncate">{selectedUser.fullName}</h3>
            <p className="text-xs sm:text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)} className="btn btn-ghost btn-circle btn-sm ml-2 flex-shrink-0 hover:bg-base-300 transition">
          <X size={20} className="sm:size-6" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;