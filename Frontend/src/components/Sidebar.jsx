import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

const Sidebar = () => {
  const {getUsers,users,selectedUser,setSelectedUser,isUsersLoading}=useChatStore();
  const {onlineUsers} =useAuthStore();
  const [showOnlineOnly,setShowOnlineOnly] = useState(false);

  useEffect(()=>{
    getUsers()
  },[getUsers]);

  const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

  if(isUsersLoading) return <SidebarSkeleton/>
  return (
    <aside className='h-auto sm:h-full w-full sm:w-20 lg:w-72 border-b sm:border-b-0 sm:border-r border-base-300 flex sm:flex-col transition-all duration-200 bg-gradient-to-b from-base-100 to-base-100/95'>
        <div className='border-r sm:border-r-0 sm:border-b border-base-300 w-auto sm:w-full p-4 sm:p-5 bg-gradient-to-r from-base-100 to-base-100/50'>
            <div className='flex items-center gap-2'>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className='size-5 sm:size-6 text-primary'/>
                </div>
                <span className='font-bold hidden lg:block text-sm text-base-content'>Contacts</span>
            </div>
            {/* Todo: Online filter toggle */}
            <div className="mt-3 sm:mt-4 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm font-medium">Online only</span>
          </label>
          <span className="text-xs text-primary font-semibold badge badge-primary badge-outline">({onlineUsers.length - 1})</span>
        </div>

        </div>
        <div className="overflow-x-auto sm:overflow-y-auto w-full py-2 sm:py-3 flex sm:flex-col gap-2 sm:gap-1 px-2 sm:px-0">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              min-w-max sm:w-full p-2 sm:p-3 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3
              hover:bg-base-200/60 transition-all duration-300 rounded-xl sm:rounded-lg
              group relative
              ${selectedUser?._id === user._id ? "bg-gradient-to-r from-primary/20 to-primary/10 ring-1 ring-primary/30" : ""}
            `}
          >
            <div className="relative flex-shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-10 sm:size-12 object-cover rounded-full ring-2 ring-base-200 group-hover:ring-primary/30 transition-all duration-300"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 sm:size-3.5 bg-green-500 
                  rounded-full ring-2 ring-white"
                />
              )}
            </div>

            {/* User info - visible on all screens but styled differently */}
            <div className="hidden sm:block text-left min-w-0 flex-1">
              <div className="font-semibold truncate text-sm text-base-content">{user.fullName}</div>
              <div className={`text-xs font-medium transition-colors ${
                onlineUsers.includes(user._id) 
                  ? "text-green-500" 
                  : "text-base-content/50"
              }`}>
                {onlineUsers.includes(user._id) ? "🟢 Online" : "🔴 Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/40 py-8 text-sm w-full font-medium">No users to display</div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar