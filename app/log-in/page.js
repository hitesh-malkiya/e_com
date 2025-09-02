
'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"

export default function Component() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  
  const saveUserToDatabase = useCallback(async (user) => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          image: user.image
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log('User saved:', result.message)
        // Redirect after successful save
        router.push('/admin')
      } else {
        console.error('Failed to save user')
        setIsSaving(false)
      }
    } catch (error) {
      console.error('Error saving user:', error)
      setIsSaving(false)
    }
  }, [router])

  useEffect(() => {
    if (session) {
      // Save user data to database when they log in
      saveUserToDatabase(session.user)
    }
  }, [session, saveUserToDatabase])
  
  if(session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isSaving ? 'Saving User Data...' : 'Welcome Back!'}
            </h2>
            <p className="text-gray-600">
              {isSaving ? 'Please wait while we set up your account' : 'You are successfully signed in'}
            </p>
          </div>
          
          {isSaving && (
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Signed in as:</p>
            <p className="font-medium text-blue-800">{session.user.email}</p>
          </div>
          
          <button 
            onClick={() => signOut()}
            disabled={isSaving}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 disabled:transform-none"
          >
            {isSaving ? 'Please Wait...' : 'Sign Out'}
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>
        
        <button 
          onClick={() => signIn()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
          Sign In with Google
        </button>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          Secure authentication powered by NextAuth.js
        </p>
      </div>
    </div>
  )
}