'use client'

import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from 'react'
import Loading from '@/app/loading'
function Page() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const formData = useRef(null);
    const [btnactiv, setBtnactiv] = useState(false)
    const [message, setMessage] = useState('')
    
  







useEffect(() => {
    if (session?.user?.userName) {
  router.push(`/user`);

    }
}, [session, router]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnactiv(true)
        setMessage('')
        
        try {
            const response = await axios.post('/api/user/setup', {
                email: session?.user?.email,
                userName: formData.current.userName.value,
                password: formData.current.password.value
            })
            formData.current.reset();
            router.push(`/user`);
            setBtnactiv(false)
            setMessage('Username and password set successfully!')
       

            
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred')
            setBtnactiv(false)
        }
    }


    if(session?.user?.userName){
        
        return(
          <Loading/>
        )
      }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Set Username & Password
                </h2>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <form ref={formData} onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder='Enter your username'
                            name='userName'
                            required
                            minLength={3}
                            maxLength={30}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type='password'
                            placeholder='Enter your password'
                            name='password'
                            required
                            minLength={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type='submit'
                            disabled={btnactiv}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 flex items-center"
                        >
                            {btnactiv ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Setting up...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Set Credentials
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page