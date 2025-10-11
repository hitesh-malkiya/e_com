"use client"
import { useRef, useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import FormInput from '../components/FormInput'
import { set } from "mongoose";


function Adminregister() {
  const formData = useRef(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({})
  const router = useRouter();
  const [isTOken, setIsToken] = useState(false);
  const [token, setToken] = useState("");
  const [tokenMessage, setTokenMessage] = useState("");
  const { data: session, status } = useSession();


const [contactId, setContactId] = useState("");
const [fundAccountId, setFundAccountId] = useState("");

  // Client-side validation
  const validateForm = (data) => {
    const newErrors = {};


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
      const formEl = formData.current;
      const fd = new FormData(formEl);
      const get = (key) => (fd.get(key) || "").toString().trim();
      const raw = (key) => (fd.get(key) || "").toString(); // for password maybe keep raw

      const data = {
        fullName: get('fullName'),
        userName: get('userName'),
        email: get('email'),
        password: raw('password'),
        brand: get('brand'),
        logoImg: get('logoImg'),
        shiprocketEmail: get('shiprocketEmail'),
        shiprocketPassword: get('shiprocketPassword'),
        shiprocketApiToken: token,
        contactId: contactId,
        fundAccountId: fundAccountId,
        address: {
          address: get('address'),
          city: get('city'),
          state: get('state'),
          postalCode: get('postalCode')
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


      if (response?.data?.message ) {
        setMessage("Admin registered successfully!")



        formEl.reset()

        if (response?.data.admin.userName) {
          router.push(`/admin/${response?.data.admin.userName}`);
        }
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || "Registration failed";
      setMessage(errorMessage);
      if (error.response?.data?.details) {
        setErrors({ server: error.response.data.details });
      }
    } finally {
      setLoading(false)
    }
  }


  const handlegetToken = async (e) => {
    try {
      const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
        email: formData.current.shiprocketEmail.value,
        password: formData.current.shiprocketPassword.value
      });

      setToken(await response.data.token);
      setIsToken(true);
      setTokenMessage("Token fetched successfully!");

    } catch (err) {
      setTokenMessage("Failed to fetch token.");
    }

  }
const handelRazorpay = async () => {
  try {
    const formEl = formData.current;
  const response = await axios.post("/api/admin/razoyrpay", {
      name: formEl.RfullName.value,
      email: formEl.Remail.value,
      contact: formEl.Rcontact.value, 
      reference_id: formEl.reference_id.value,
      ifsc: formEl.ifsc.value,
      account_number: formEl.account_number.value
    });
    
    if(response.data.error){
     alert( response.data.error);
    
    }

setFundAccountId(response.data.fund_account.id);
setContactId(response.data.fund_account.contact_id);
alert("Razorpay account created successfully.");

  }  catch (err) {

 alert( err.message);
  }
}



  useEffect(() => {
    const checkSession = async () => {

      if (status === "unauthenticated") {


        router.push('/log-in');
        return;
      }

      if (session?.user?.admin?.isAdmin) {
        router.push(`/admin/${session.user.admin.userName}`);
      }
    };

    checkSession();
  }, [session, router]);


  return (
    <div className="bg-[var(--bg-color)] rounded-2xl shadow-xl p-8 mb-12">
      <h3 className="text-2xl font-semibold text-[var(--text-color)] mb-6">
        Register New Admin
      </h3>





      <form ref={formData} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Full Name"
            name="fullName"
            placeholder="Enter full name"
            required
            error={errors.fullName}
          />

          <FormInput
            label="Username (Optional)"
            name="userName"
            placeholder="Enter username"
            error={errors.userName}
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email"
            required
            error={errors.email}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password (min 6 characters)"
            required
            error={errors.password}
          />

          <FormInput
            label="Brand Name (Optional)"
            name="brand"
            placeholder="Enter brand name"
          />

          <FormInput
            label="Logo Image URL (Optional)"
            name="logoImg"
            type="url"
            placeholder="Enter logo image URL"
          />
        
        </div>


        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-[var(--text-color)] mb-4">
            razorpay Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label=" Name as par your bank account"
              name="RfullName"
              placeholder="Enter full name"
              required
              error={errors.fullName}
            />

            <FormInput
              label="adhrar number"
              name="reference_id"
              placeholder="Enter adhar number"
              required
              type="number"
              error={errors.userName}
            />

            <FormInput
              label="permenet Email"
              name="Remail"
              type="email"
              placeholder="Enter email permenet "
              required
              error={errors.email}
            />
            <FormInput
              label={"contact number"}
              name={"Rcontact"}
              type={"number"}
              placeholder={"Enter contact number"}
              required />
            <FormInput
              label="IFSC Code"
              name="ifsc"
              placeholder="Enter IFSC code"
              required
              error={errors.password}
            />  
            <FormInput
              label="Account Number"
              name="account_number"   
              type="number"
              placeholder="Enter Account Number"
              required
              error={errors.password}
            />
     <button   type="button" onClick={handelRazorpay} className="px-2 py-1 bg-blue-500 text-white rounded text-xs mr-1" >
                    Create razorpay account
                  </button>
          </div>
        </div>





        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-[var(--text-color)] mb-4">
            Shiprocket Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          </div>
          <FormInput label="Shiprocket Email" name="shiprocketEmail" type="email" placeholder="Enter Shiprocket Email" />
          <FormInput label="Shiprocketp password" name={"shiprocketPassword"} type="text" placeholder="Enter Shiprocket password" />
          <p>{tokenMessage}</p>
        </div>
        <div onClick={handlegetToken} className="flex justify-end">
          <button type="button" disabled={loading} className="mt-4">
            {loading ? 'geting token...' : 'get token'}
          </button>
        </div>

        {/* Address Section */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-[var(--text-color)] mb-4">
            Address Information (Optional)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormInput
                label="Address"
                name="address"
                placeholder="Enter street address"
              />
            </div>

            <FormInput label="City" name="city" placeholder="Enter city" />
            <FormInput label="State" name="state" placeholder="Enter state" />
            <FormInput label="Postal Code" name="postalCode" placeholder="Enter postal code" />
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
          <div className={`p-4 rounded-lg ${message.includes("successfully")
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