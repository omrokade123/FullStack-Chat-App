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
    <aside className='h-auto sm:h-full w-full sm:w-20 lg:w-72 border-b sm:border-b-0 sm:border-r border-base-300 flex sm:flex-col transition-all duration-200'>
        <div className='border-r sm:border-r-0 sm:border-b border-base-300 w-auto sm:w-full p-3 sm:p-5'>
            <div className='flex items-center gap-2'>
                <Users className='size-5 sm:size-6'/>
                <span className='font-medium hidden lg:block text-sm'>Contacts</span>
            </div>
            {/* Todo: Online filter toggle */}
            <div className="mt-2 sm:mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>

        </div>
        <div className="overflow-x-auto sm:overflow-y-auto w-full py-2 sm:py-3 flex sm:flex-col gap-2 sm:gap-0 px-2 sm:px-0">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              min-w-max sm:w-full p-2 sm:p-3 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3
              hover:bg-base-300 transition-colors rounded-lg sm:rounded-none
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative flex-shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-10 sm:size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-2.5 sm:size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - visible on all screens but styled differently */}
            <div className="hidden sm:block text-left min-w-0">
              <div className="font-medium truncate text-sm">{user.fullName}</div>
              <div className="text-xs text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4 text-sm w-full">No online users</div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar