"use client"
import { useRef, useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

function Adminregister() {
  const formData = useRef(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({})
  const router = useRouter();
  const { data: session } = useSession();

  // Client-side validation
  const validateForm = (data) => {
    const newErrors = {};

    // Full name validation
    if (!data.fullName || data.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters long";
    } else if (data.fullName.trim().length > 50) {
      newErrors.fullName = "Full name cannot exceed 50 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(data.fullName.trim())) {
      newErrors.fullName = "Full name can only contain letters and spaces";
    }

    // Username validation
    if (data.userName) {
      if (data.userName.trim().length < 2) {
        newErrors.userName = "Username must be at least 2 characters long";
      } else if (data.userName.trim().length > 30) {
        newErrors.userName = "Username cannot exceed 30 characters";
      } else if (!/^[a-zA-Z0-9_]+$/.test(data.userName.trim())) {
        newErrors.userName = "Username can only contain letters, numbers, and underscores";
      }
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!data.password || data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // Address validation
    if (data.address) {
      const { address, city, state, postalCode } = data.address;
      if (address && (!city || !state || !postalCode)) {
        newErrors.address = "Complete address information is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setErrors({})

    try {
      const formDataObj = formData.current;
      const data = {
        fullName: formDataObj.fullName.value.trim(),
        userName: formDataObj.userName.value.trim(),
        email: formDataObj.email.value.trim(),
        password: formDataObj.password.value,
        brand: formDataObj.brand.value.trim(),
        logoImg: formDataObj.logoImg.value.trim(),
        razorpayId: formDataObj.razorpayId.value.trim(),
        razorpaySecret: formDataObj.razorpaySecret.value.trim(),
        address: {
          address: formDataObj.address.value.trim(),
          city: formDataObj.city.value.trim(),
          state: formDataObj.state.value.trim(),
          postalCode: formDataObj.postalCode.value.trim()
        },
        isAdmin: true,
        isActive: true
      }

      // Client-side validation
      if (!validateForm(data)) {
        setLoading(false);
        return;
      }

      const response = await axios.post('/api/admin', data)
      
      if (response.data.message) {
        setMessage("Admin registered successfully!")
        formData.current.reset()
        setErrors({})
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed";
      setMessage(errorMessage);
      
      // Handle validation errors from server
      if (error.response?.data?.details) {
        setErrors({ server: error.response.data.details });
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(session?.user?.admin?.isAdmin) {
      router.push(`/admin/${session.user.admin.userName}`);
    }
  }, [session, router]);


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
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              required
              className={`w-full px-4 py-3 border rounded-lg focus:border-transparent transition duration-200 ${
                errors.fullName ? 'border-red-500' : 'border-[var(--accent-color)]'
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Username (Optional)
            </label>
            <input
              type="text"
              name="userName"
              placeholder="Enter username"
              className={`w-full px-4 py-3 border rounded-lg focus:border-transparent transition duration-200 ${
                errors.userName ? 'border-red-500' : 'border-[var(--accent-color)]'
              }`}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              className={`w-full px-4 py-3 border rounded-lg focus:border-transparent transition duration-200 ${
                errors.email ? 'border-red-500' : 'border-[var(--accent-color)]'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password (min 6 characters)"
              required
              minLength="6"
              className={`w-full px-4 py-3 border rounded-lg focus:border-transparent transition duration-200 ${
                errors.password ? 'border-red-500' : 'border-[var(--accent-color)]'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
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

          {/* Logo Image URL */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Logo Image URL (Optional)
            </label>
            <input
              type="url"
              name="logoImg"
              placeholder="Enter logo image URL"
              className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200"
            />
          </div>

          {/* Razorpay ID */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Razorpay ID (Optional)
            </label>
            <input
              type="text"
              name="razorpayId"
              placeholder="Enter Razorpay ID"
              className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200"
            />
          </div>

          {/* Razorpay Secret */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Razorpay Secret (Optional)
            </label>
            <input
              type="password"
              name="razorpaySecret"
              placeholder="Enter Razorpay Secret"
              className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-[var(--text-color)] mb-4">
            Address Information (Optional)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter street address"
                className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                placeholder="Enter state"
                className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                placeholder="Enter postal code"
                className="w-full px-4 py-3 border border-[var(--accent-color)] rounded-lg focus:border-transparent transition duration-200"
              />
            </div>
          </div>
          {errors.address && (
            <p className="text-red-500 text-sm mt-2">{errors.address}</p>
          )}
        </div>

        {/* Server Validation Errors */}
        {errors.server && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <h4 className="font-semibold mb-2">Validation Errors:</h4>
            <ul className="list-disc list-inside">
              {Array.isArray(errors.server) ? errors.server.map((error, index) => (
                <li key={index}>{error}</li>
              )) : (
                <li>{errors.server}</li>
              )}
            </ul>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes("successfully") 
              ? "bg-green-100 text-green-800 border border-green-400" 
              : "bg-red-100 text-red-800 border border-red-400"
          }`}>
            <div className="flex items-center">
              {message.includes("successfully") ? (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              {message}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--sec-accent-color)] hover:bg-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--bg-color)] font-semibold py-3 px-8 rounded-lg transition duration-200 flex items-center justify-center min-w-[200px]"
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
        </div>
      </form>
    </div>
  )
}

export default Adminregister