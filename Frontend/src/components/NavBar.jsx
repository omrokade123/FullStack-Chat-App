import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MessageSquare,Settings,User,LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const {logout,authUser} = useAuthStore();
  return (
    <header className='bg-base-100 border-b border-base-300/50 fixed w-full top-0 z-40 backdrop-blur-xl bg-gradient-to-r from-base-100 via-base-100 to-base-100/95 shadow-lg'>
        <div className='container mx-auto px-4 h-16'>
            <div className='flex items-center justify-between h-full'>
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-all duration-300 group">
                    <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                        <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Chatty</h1>
                    </Link>
               </div>
               
               <div className='flex items-center gap-2'>
                     <Link
                    to={"/settings"}
                    className={`
                    btn btn-sm btn-ghost gap-2 transition-all duration-300 hover:bg-base-200/50 hover:shadow-md
                    `}
                    >
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">Settings</span>
                    </Link>

                    {authUser && (
                    <>
                        <Link to={"/profile"} className={`btn btn-sm btn-ghost gap-2 transition-all duration-300 hover:bg-base-200/50 hover:shadow-md`}>
                        <User className="size-5" />
                        <span className="hidden sm:inline">Profile</span>
                        </Link>

                        <button className="btn btn-sm btn-ghost gap-2 transition-all duration-300 hover:bg-red-500/10 hover:text-red-500" onClick={logout}>
                        <LogOut className="size-5" />
                        <span className="hidden sm:inline">Logout</span>
                        </button>
                    </>
                    )}
               </div>
            </div>
        </div>
    </header>
  )
}

export default NavBar