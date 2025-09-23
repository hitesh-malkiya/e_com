"use client"
import { useRef, useState } from "react"
import axios from "axios"

function Adminregister() {
  const formData = useRef(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const data = {
        fullName: formData.current.fullName.value,
        userName: formData.current.userName.value,
        email: formData.current.email.value,
        password: formData.current.password.value,
        brand: formData.current.brand.value,
        image: formData.current.image.value || "",
        isAdmin: true,
        isActive: true
      }

      const response = await axios.post('/api/admin', data)
      
      if (response.data.message) {
        setMessage("Admin registered successfully!")
        formData.current.reset()
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[var(--bg-color)] rounded-2xl shadow-xl p-8 mb-12">
      <h3 className="text-2xl font-semibold text-[var(--text-color)] mb-6">
        Register New Admin
      </h3>
      
      <form ref={formData} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              required
              className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Username
            </label>
            <input
              type="text"
              name="userName"
              placeholder="Enter username"
              required
              className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength="6"
              className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Brand Name (Optional)
            </label>
            <input
              type="text"
              name="brand"
              placeholder="Enter brand name"
              className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Image URL (Optional)
            </label>
            <input
           type="text"
              name="image"
              placeholder="Enter image URL"
              className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200"
            />
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes("successfully") 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--sec-accent-color)] hover:bg-[var(--accent-color)] text-[var(--bg-color)] font-semibold py-3 px-8 rounded-lg transition duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[var(--bg-color)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registering...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Register Admin
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default Adminregister