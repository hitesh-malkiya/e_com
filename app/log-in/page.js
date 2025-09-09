
'use client';

import axios from 'axios';
import { useSession, signIn } from "next-auth/react"
import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import Loading from '../loading';

export default function Component() {


 const { data: session } = useSession()
const {status} = useSession()




  const router = useRouter()
  const [loginType, setLoginType] = useState('google')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef(null)


  const saveUserToDatabase = useCallback(async (user) => {
    try {
      const response = await axios.post('/api/user', {
        email: user.email,
        name: user.name,
        image: user.image
      });
console.log( 'log in respons' , response);

    } catch (error) {
      console.log('Error saving user:', error);
    }
  }, [router]);

  const handleCredentialLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
  
    const form = new FormData(formRef.current);
    const userName = form.get('userName');
    const password = form.get('password');
  
    const res = await signIn('credentials', {
      redirect: false,
      userName,
      password,
    });
  
    if (res?.ok && !res.error) {
      router.push(`/user`); // or wherever
    } else {
      setMessage('Invalid username or password');
    }
  
    setIsLoading(false);
  };
  

  useEffect(() => {
    console.log(session);
    
    if (session) {
      console.log(session);
      
      saveUserToDatabase(session.user)
      router.push('/log-in/setuser');
    }
  }, [session, saveUserToDatabase, router])

  // Show loading while checking session


  if(status=='loading' || session){
    return(
      <Loading/>
    )
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setLoginType('google')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition duration-200 ${loginType === 'google'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            Google
          </button>
          <button
            onClick={() => setLoginType('credentials')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition duration-200 ${loginType === 'credentials'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            Username/Password
          </button>
        </div>
       
        {message && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.includes('successful') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )} 

        {loginType === 'google' ? (
          <button
            onClick={() => signIn()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
            Sign In with Google
          </button>
        ) : (
          <form ref={formRef} onSubmit={handleCredentialLogin} className="space-y-4">
            <div>
              <input
                type="text"
                name="userName"
                placeholder="Username"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
             
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          {loginType === 'google'
            ? 'Secure authentication powered by NextAuth.js'
            : 'Sign in with your username and password'
          }
        </p>
      </div>
    </div>
  )
}